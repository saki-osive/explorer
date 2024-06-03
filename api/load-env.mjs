import 'dotenv/config';
import { exec } from 'child_process';

exec('npx prisma migrate dev --name add_awakened_flag', (err, stdout, stderr) => {
    if (err) {
        console.error(`exec error: ${err}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});