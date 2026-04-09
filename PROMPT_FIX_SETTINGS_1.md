# CLAUDE CODE PROMPT — Fix & Verify Settings Page (Portal)

## CONTEXT

The client portal at `/portal/settings` has a Settings page ("Setări cont") with two forms:
1. **Profile form** — fields: Nume complet, Email, Firmă, Telefon + "Salvează modificările" button
2. **Change password form** — fields: Parola actuală, Parola nouă (min. 8 caractere), Confirmă parola nouă + "Schimbă parola" button

The UI exists and looks correct, but it's unclear whether the forms are actually connected to the backend. **Your job is to audit the entire flow end-to-end and fix anything that's broken or missing.**

---

## AUDIT CHECKLIST — Go through each item. If it works, leave it. If it's missing or broken, implement it.

### Profile Form

1. **Form state management**: The form inputs must be controlled components (`useState`) pre-filled with the current user's data from the session or a server fetch.

2. **Submit handler**: Clicking "Salvează modificările" must trigger a `PATCH` or `PUT` request to an API route (e.g., `/api/portal/settings/profile`).

3. **API route exists and works**:
   - Route: `/api/portal/settings/profile` (or similar)
   - Method: PATCH
   - Auth: Verify the user is authenticated via NextAuth session
   - Validation: Use zod to validate input (name required, email required + valid format, phone optional, company optional)
   - DB update: `prisma.user.update({ where: { id: session.user.id }, data: { name, email, company, phone } })`
   - Return: updated user object or success message
   - Error handling: try/catch, return proper error responses (400 for validation, 500 for server errors)

4. **Email uniqueness**: If the user changes their email, check that the new email doesn't already exist in the database (excluding their own record). Return a clear error if it does: "Această adresă de email este deja folosită."

5. **Loading state**: The "Salvează modificările" button must show a loading state while the request is in progress (spinner or "Se salvează..." text, button disabled).

6. **Success feedback**: After successful save, show a toast notification or inline success message: "Modificările au fost salvate cu succes." (green, auto-dismiss after 3 seconds).

7. **Error feedback**: If the save fails, show an error message: "A apărut o eroare. Te rugăm să încerci din nou." (red).

8. **Session update**: After saving profile changes, the NextAuth session must be updated so that the user's name (and any other session fields) reflect the new values immediately — in the sidebar, in the top bar, everywhere. Use `update()` from `useSession()` to refresh the session client-side without requiring a page reload.

9. **Sidebar sync**: The user's name displayed in the sidebar (bottom area, "Vlad Gheorghe") must update in real-time after a successful profile save without a full page refresh.

### Change Password Form

1. **Form state management**: Three controlled inputs — currentPassword, newPassword, confirmPassword. All cleared after successful change.

2. **Client-side validation before submit**:
   - All 3 fields required
   - New password minimum 8 characters
   - New password and confirm password must match
   - Show inline errors immediately: "Parolele nu se potrivesc", "Parola trebuie să aibă minim 8 caractere"

3. **Submit handler**: Clicking "Schimbă parola" must trigger a `POST` request to `/api/portal/settings/password`.

4. **API route exists and works**:
   - Route: `/api/portal/settings/password`
   - Method: POST
   - Auth: Verify authenticated session
   - Step 1: Fetch current user's hashed password from DB
   - Step 2: `bcrypt.compare(currentPassword, user.password)` — if false, return 400 with error "Parola actuală este incorectă"
   - Step 3: `bcrypt.hash(newPassword, 12)` — hash the new password
   - Step 4: `prisma.user.update({ where: { id }, data: { password: hashedPassword } })`
   - Return: success message

5. **Loading state**: Button shows loading while request is in progress.

6. **Success feedback**: Toast or inline message: "Parola a fost schimbată cu succes." (green). Clear all 3 password fields.

7. **Error feedback**: Show specific errors:
   - "Parola actuală este incorectă" (from API)
   - "Parolele nu se potrivesc" (client-side)
   - "Parola trebuie să aibă minim 8 caractere" (client-side)
   - "A apărut o eroare. Te rugăm să încerci din nou." (generic server error)

8. **Security**: Never log or return the actual password in any response. Never send the current hashed password to the client.

### General UI Polish

1. **Disable submit buttons** when form is clean (no changes detected) — for profile form only. Password form button is always enabled.

2. **Unsaved changes warning**: If the user modifies profile fields and tries to navigate away without saving, show a browser confirmation dialog: "Ai modificări nesalvate. Sigur vrei să părăsești pagina?"

3. **Form field styling on focus**: Gold border/ring (--color-gold) on focus, matching the site's design system.

4. **Responsive**: Both forms must stack properly on mobile — all fields full width on small screens.

---

## IMPLEMENTATION APPROACH

1. First, check if the API routes already exist at `/api/portal/settings/` — read the code
2. Check if the form components have submit handlers — read the Settings page component
3. For anything missing, implement it following the specifications above
4. Test the complete flow: change a field → save → refresh page → verify data persists
5. Test password change: enter current + new → save → logout → login with new password

## FILES TO CHECK/CREATE

- `app/portal/settings/page.tsx` — the settings page component
- `app/api/portal/settings/profile/route.ts` — profile update API
- `app/api/portal/settings/password/route.ts` — password change API
- `components/portal/SettingsForm.tsx` — if the form is extracted as a component
- `lib/auth.ts` — NextAuth config (for session update callback)
