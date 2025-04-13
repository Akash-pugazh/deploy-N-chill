import fs from 'fs/promises';
import path from 'path';
import config from "../config.js";
import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);

export class ProjectService {
    constructor() { }
    // get the folder path from the config file
    get projectFolderPath() {
        return config.PROJECT_FOLDER_PATH;
    }

    async getProjects() {
        try {
            const basePath = this.projectFolderPath;

            const entries = await fs.readdir(basePath, { withFileTypes: true });
            const foldersOnly = entries
                .filter(entry => entry.isDirectory())
                .map((folder, index) => {
                    const fullPath = path.join(basePath, folder.name);
                    return {
                        id: index + 1,
                        name: folder.name,
                        path: fullPath
                    };
                });
            return foldersOnly;
        } catch (err) {
            console.error("Error at ProjectService.getProjects: ", err);
            throw err;
        }
    }

    async getProjectByName(projectName) {
        try {
            const basePath = this.projectFolderPath;

            // Normalize input name
            const normalize = name => name.toLowerCase().replace(/[_\-.,]/g, '');

            const normalizedInput = normalize(projectName);

            // Read all entries
            const entries = await fs.readdir(basePath, { withFileTypes: true });

            // Find the matching folder
            const matched = entries.find(entry =>
                entry.isDirectory() && normalize(entry.name) === normalizedInput
            );

            if (!matched) {
                throw new Error(`Project folder "${projectName}" not found.`);
            }
            // Read the contents of the project folder
            const projectPath = path.join(basePath, matched.name);
            const files = await fs.readdir(projectPath);
            return files;
        } catch (err) {
            console.error("Error at ProjectService.getProjectByName: ", err);
            throw err;
        }
    }

    async runCommand(command, cwd = this.projectFolderPath) {
        try {
            const { stdout, stderr } = await execAsync(command, { cwd });
            return {
                success: true,
                output: stdout.trim(),
                errorOutput: stderr.trim(),
                rawData: { stdout, stderr }
            };
        } catch (error) {
            console.error("Error executing command:", error);
            return { success: false, error: error.message };
        }
    }
}