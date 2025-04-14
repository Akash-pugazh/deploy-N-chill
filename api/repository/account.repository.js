import db from '../database/db.js';
export class AccountRepository {
    constructor() {
        this.db = db;
    }

    static async createUser(userData, activityData) {
        try {
            const result = await this.db.one(
                ` WITH user_insert AS (
                    INSERT INTO users (
                        "firstName", 
                        "lastName",
                        "email", 
                        "password",
                        "hashedPassword"
                    ) VALUES (
                        $1,
                        $2,
                        $3, 
                        $4
                    ) RETURNING *
                )
                INSERT INTO user_activity (
                    "userId",
                    "ipAddress",
                    "userAgent",
                    "device",
                    "browser",
                    "os"
                ) VALUES (
                    (SELECT id FROM user_insert),
                    $5,
                    $6,
                    $7,
                    $8,
                    $9
                ) RETURNING *`,
                [
                    userData.firstName,
                    userData.lastName,
                    userData.email,
                    userData.password,
                    userData.hashedPassword,
                    activityData.ipAddress,
                    activityData.userAgent,
                    activityData.device,
                    activityData.browser,
                    activityData.os
                ]
            );
            return result;
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }

    static async getUserById(userId) {
        try {
            const result = await this.db.one('SELECT * FROM users WHERE id = $1', [userId]);
            return result;
        } catch (error) {
            throw new Error('Error fetching user: ' + error.message);
        }
    }

    async getAllUsers() {
        try {
            const result = await this.db.any('SELECT * FROM users');
            return result;
        } catch (error) {
            throw new Error('Error fetching users: ' + error.message);
        }
    }
}