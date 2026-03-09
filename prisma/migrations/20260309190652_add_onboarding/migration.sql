-- AlterTable
ALTER TABLE "User" ADD COLUMN     "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "ClientProfile" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyCIF" TEXT,
    "companyRegCom" TEXT,
    "companyAddress" TEXT,
    "companyCity" TEXT,
    "companyCounty" TEXT,
    "companyFoundedYear" INTEGER,
    "industryDomain" TEXT NOT NULL,
    "companySize" TEXT NOT NULL,
    "companyDescription" TEXT,
    "hasWebsite" BOOLEAN NOT NULL DEFAULT false,
    "currentWebsiteUrl" TEXT,
    "websitePlatform" TEXT,
    "websiteSatisfaction" TEXT,
    "hasSocialMedia" BOOLEAN NOT NULL DEFAULT false,
    "socialFacebook" TEXT,
    "socialInstagram" TEXT,
    "socialTikTok" TEXT,
    "socialLinkedIn" TEXT,
    "socialOther" TEXT,
    "usesTools" TEXT[],
    "currentPainPoints" TEXT,
    "mainGoals" TEXT[],
    "goalsDescription" TEXT,
    "targetAudience" TEXT,
    "targetAgeRange" TEXT[],
    "targetLocation" TEXT,
    "competitorUrls" TEXT,
    "inspirationUrls" TEXT,
    "budgetRange" TEXT,
    "timeline" TEXT,
    "preferredPayment" TEXT,
    "monthlyBudgetHosting" TEXT,
    "additionalNotes" TEXT,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ClientProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClientProfile_userId_key" ON "ClientProfile"("userId");

-- AddForeignKey
ALTER TABLE "ClientProfile" ADD CONSTRAINT "ClientProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
