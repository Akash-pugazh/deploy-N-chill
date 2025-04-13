import pg from 'pg-promise';
import db from '../database/db.js';
export class userRepository {
    constructor() {
        this.db = db;
    }

    async createUser(userData) {
        try {
            const result = await this.db.one(
                'INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${password}) RETURNING *',
                userData
            );
            return result;
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }

    async getUserById(userId) {
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