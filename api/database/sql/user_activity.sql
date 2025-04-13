CREATE TABLE IF NOT EXISTS user_activity (
    "id" TEXT PRIMARY KEY DEFAULT uuid62(),
    "userId" TEXT REFERENCES user,
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

CREATE INDEX IF NOT EXISTS user_activity_userid_index ON user_activity ("userId");