CREATE TABLE IF NOT EXISTS account_activity (
    "id" TEXT PRIMARY KEY DEFAULT uuid62(),
    "accountId" TEXT REFERENCES account,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "location" TEXT,
    "device" TEXT,
    "browser" TEXT,
    "os" TEXT,
    "createdAt" TEXT,
    "updatedAt" TEXT,
    "deletedAt" TEXT
);

CREATE INDEX IF NOT EXISTS user_activity_userid_index ON account_activity ("accountId");