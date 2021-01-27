import * as express from 'express';
import * as fs from 'fs/promises';
import * as https from 'https';

const PORT = 8443;

const app = express();
app.get('/', (req, res) => res.send('Server up!'));

app.listen();

Promise.all([ fs.readFile('./keys/localhost.key'), fs.readFile('./keys/localhost.crt') ]).then(([key, cert]) => {
    const server = https.createServer({ key, cert }, app);
    server.listen(PORT, () => {
        console.log(`Server is running at https://localhost:${PORT}`);
    });
});