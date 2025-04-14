CREATE TABLE IF NOT EXISTS account (
    "accountId" TEXT PRIMARY KEY DEFAULT uuid62(),
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT,
    "hashedPassword" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ,
    "deletedAt" TIMESTAMPTZ
);

-- Indexes (email already has a unique constraint above)
CREATE INDEX IF NOT EXISTS user_email_index ON account ("email");
CREATE UNIQUE INDEX IF NOT EXISTS user_userId_index ON account ("accountId");