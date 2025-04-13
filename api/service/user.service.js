import userRepository from '../repository/user.repository.js';
export class UserService {
    constructor(){}

    async createUser(userData) {
        // Logic to create a user
        return { message: 'User created successfully', user: userData };
    }
}