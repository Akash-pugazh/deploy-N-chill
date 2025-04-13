import { exec } from 'child_process';

export default class Terminal {
    static run(command) {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing command: ${error.message}`);
                    reject(error);
                    return;
                }
                if (stderr) {
                    console.error(`Error output: ${stderr}`);
                    reject(new Error(stderr));
                    return;
                }
                resolve(stdout);
            });
        });
    }
}
