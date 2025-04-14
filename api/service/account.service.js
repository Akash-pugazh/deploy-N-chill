import { AccountRepository } from '../repository/account.repository.js';
import { UAParser } from 'ua-parser-js';
import crypto from 'crypto';
export class AccountService {
    constructor(){}

    static async createUser(request) {
        const userData = request.body;
        
        // Extract user-agent details
        const parser = new UAParser();
        parser.setUA(request.headers['user-agent']);
        const userAgentData = parser.getResult();

        const activityData = {
            ipAddress: request.ip,
            userAgent: request.headers['user-agent'],
            device: userAgentData.device.model || "Unknown",
            browser: userAgentData.browser.name || "Unknown",
            os: userAgentData.os.name || "Unknown"
        };

        const createdUser = await AccountRepository.createUser(userData, activityData);

        return createdUser; // Return only the created user data
    }

    static async hashPassword(password) {
        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
        return hashedPassword;
    }
}