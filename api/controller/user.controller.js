import { BaseController } from "../base/base.controller.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const users = {}; // Temporary storage (replace with a database)
const SECRET_KEY = "your_secret_key"; // Use an environment variable in production!

export class UserController extends BaseController {
    constructor() {
        super();
    }

    // 📝 User Registration
    async register(request, reply) {
        const { firstName, lastName, email, password } = request.body;
        try {
            if (users[email]) {
                return reply.status(409).send({ error: "User already exists" });
            }

            // Hash password securely
            const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
            users[email] = { firstName, lastName, email, password: hashedPassword };

            

            return reply.send({ message: "User registered successfully" });
        } catch (err) {
            console.error("Error at UserController.register: ", err);
            return reply.status(500).send({ error: "Failed to register user" });
        }
    }

    // 🔐 User Login
    async login(request, reply) {
        const { email, password } = request.body;
        try {
            const user = users[email];
            if (!user) {
                return reply.status(404).send({ error: "User not found" });
            }

            const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

            if (user.password !== hashedPassword) {
                return reply.status(401).send({ error: "Invalid credentials" });
            }

            // Generate JWT Token
            const token = jwt.sign({ email, firstName: user.firstName, lastName: user.lastName }, SECRET_KEY, { expiresIn: "1h" });

            return reply.send({ message: "Login successful", token });
        } catch (err) {
            console.error("Error at UserController.login: ", err);
            return reply.status(500).send({ error: "Failed to login" });
        }
    }

    // 🚪 User Logout
    async logout(request, reply) {
        try {
            return reply.send({ message: "Logout successful" });
        } catch (err) {
            console.error("Error at UserController.logout: ", err);
            return reply.status(500).send({ error: "Failed to logout" });
        }
    }
}

const controller = new UserController();

export default async function (fastify, opts) {
    fastify.post('/register', {
        schema: {
            body: {
                type: "object",
                required: ["firstName", "lastName", "email", "password"],
                properties: {
                    firstName: { type: "string", minLength: 2, maxLength: 50 },
                    lastName: { type: "string", minLength: 2, maxLength: 50 },
                    email: { type: "string", format: "email" },
                    password: { type: "string", minLength: 6 }
                }
            }
        },
        handler: controller.register.bind(controller)
    });

    fastify.post('/login', {
        schema: {
            body: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: { type: "string", format: "email" },
                    password: { type: "string", minLength: 6 }
                }
            }
        },
        handler: controller.login.bind(controller)
    });

    fastify.post('/logout', controller.logout.bind(controller));
}
