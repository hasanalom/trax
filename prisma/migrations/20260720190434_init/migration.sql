-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "license" TEXT,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Aircraft" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "registration" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "msn" TEXT NOT NULL,
    "engine" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,
    "yearBuilt" INTEGER NOT NULL,
    "baseCode" TEXT NOT NULL,
    "baseCity" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "airworthiness" TEXT NOT NULL,
    "flightHours" INTEGER NOT NULL,
    "flightCycles" INTEGER NOT NULL,
    "lastCheckType" TEXT NOT NULL,
    "lastCheckDate" DATETIME NOT NULL,
    "nextCheckType" TEXT NOT NULL,
    "nextCheckDate" DATETIME NOT NULL,
    "engineerId" TEXT NOT NULL,
    CONSTRAINT "Aircraft_engineerId_fkey" FOREIGN KEY ("engineerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TechnicalRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "ataChapter" TEXT NOT NULL,
    "aircraftText" TEXT NOT NULL,
    "revision" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "updated" TEXT NOT NULL,
    "updatedDate" DATETIME NOT NULL,
    "aircraftId" TEXT,
    "authorId" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "signoff" JSONB NOT NULL,
    "attachments" JSONB NOT NULL,
    "history" JSONB NOT NULL,
    "notes" JSONB NOT NULL,
    CONSTRAINT "TechnicalRecord_aircraftId_fkey" FOREIGN KEY ("aircraftId") REFERENCES "Aircraft" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TechnicalRecord_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TechnicalRecord_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AirworthinessDirective" (
    "ref" TEXT NOT NULL PRIMARY KEY,
    "subject" TEXT NOT NULL,
    "ataChapter" TEXT NOT NULL,
    "applicability" TEXT NOT NULL,
    "effectiveDate" DATETIME NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "priority" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "recordId" TEXT
);

-- CreateTable
CREATE TABLE "ServiceBulletin" (
    "ref" TEXT NOT NULL PRIMARY KEY,
    "subject" TEXT NOT NULL,
    "ataChapter" TEXT NOT NULL,
    "applicability" TEXT NOT NULL,
    "issueDate" DATETIME NOT NULL,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "recordId" TEXT
);

-- CreateTable
CREATE TABLE "ComplianceFinding" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "aircraft" TEXT NOT NULL,
    "ataChapter" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "raisedDate" DATETIME NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "ComplianceFinding_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MaintenanceEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "aircraft" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "durationDays" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "hangar" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Aircraft_registration_key" ON "Aircraft"("registration");
