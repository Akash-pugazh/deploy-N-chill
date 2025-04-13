import config from '../config.js';
import Terminal from './terminal.js';

export default class Projects {
    static PATH = null;
    static async setPath(path) {
        this.PATH = path;
        console.log(`sudo find ~ -type d -name "${this.PATH}"`);
        const data = await Terminal.run(`sudo find $HOME -type d -name "${this.PATH}"`);
        console.log('Data:', data);
    }

    static async find() {
        try {
            const path = this.PATH || '~/Developer';
            // Use the full path directly without expansion
            const folders = await Terminal.run(`ls -d ${path}/*/ | xargs -I {} basename {}`);
            const projects = folders.split('\n').filter(folder => folder !== '');
            const projectsWithDetails = await Promise.all(
                projects.map(async (project, index) => {
                    const projectPath = `${path}/${project}`;
                    return { name: project, path: projectPath, id: index + 1 };
                })
            );
            return projectsWithDetails;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to fetch projects');
        }
    }
}
