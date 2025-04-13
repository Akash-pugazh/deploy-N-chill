import { BaseController } from "../base/base.controller.js";
import { ProjectService } from "../service/project.service.js";

export class ProjectController extends BaseController {
    constructor() {
        super();
        this.projectService = new ProjectService();
    }

    async getProjects(request, reply) {
        try {
            const projects = await this.projectService.getProjects();
            return reply.send({ projects });
        } catch (err) {
            console.log("Error at ProjectController.getProjects: ", err);
            return reply.status(500).send({ error: "Failed to get projects" });
        }
    }

    async getProjectByName(request, reply) {
        const { name } = request.params;
        try {
            const projectFiles = await this.projectService.getProjectByName(name);
            return reply.send({ projectFiles });
        } catch (err) {
            console.log("Error at ProjectController.getProjectByName: ", err);
            return reply.status(500).send({ error: "Failed to get project" });
        }
    }
    async runCommand(request, reply) {
        const { command } = request.body;
        try {
            // Simulate running a command (replace with real logic)
            if (!command) {
                return reply.status(400).send({ error: "Command is required" });
            }
            const response = await this.projectService.runCommand(command);
            console.log("Command response: ", response);
            console.log(`Running command: ${command}`);
            return reply.send({ message: `Command "${command}" executed successfully`, data: response });
        } catch (err) {
            console.log("Error at ProjectController.runCommand: ", err);
            return reply.status(500).send({ error: "Failed to run command" });
        }
    }
}

const controller = new ProjectController();

export default async function (fastify, opts) {
    fastify.get('/projects', controller.getProjects.bind(controller));
    fastify.get('/projects/:name', controller.getProjectByName.bind(controller));
    fastify.post('/projects/command', controller.runCommand.bind(controller));
}
