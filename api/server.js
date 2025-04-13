import fastify from 'fastify';
import cors from '@fastify/cors';
import config from './config.js';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

export class Server {
    constructor() {
        this.server = fastify({ logger: true });
        this.server.register(cors);
    }

    async start() {
        try {
            await this.loadRoutes(path.resolve('./controller'));
            await this.server.listen({ port: config.DEV_PORT });
            console.log(`🚀 Server is running on port ${config.DEV_PORT}`);
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    }

    async loadRoutes(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                await this.loadRoutes(fullPath); // recursively load nested routes
            } else if (file.endsWith('.controller.js')) {
                const routeModule = await import(pathToFileURL(fullPath));
                this.server.register(routeModule.default);
                console.log(`✅ Loaded route: ${file}`);
            }
        }
    }
}