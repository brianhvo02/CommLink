import * as express from 'express';
import * as cors from 'cors';
import * as fs from 'fs/promises';
import * as https from 'https';
import * as WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { serialize, deserialize } from 'bson';

const PORT = 8443;

type Client = {
    id: string
}
type WSClient = WebSocket & Client;

const app = express();
app.use(cors())
app.get('/', (req, res) => res.send(true));

const sendObj = (ws: WebSocket, obj: any) => { ws.send(serialize(obj)); };

(async () => {
    const key = await fs.readFile('./keys/localhost.key');
    const cert = await fs.readFile('./keys/localhost.crt');

    const server = https.createServer({ key, cert }, app);

    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws: WSClient) => {
        ws.on('message', message => {
            
        });

        ws.on('close', () => {
            
        });

        ws.id = uuidv4();

        sendObj(ws, {
            key: 'test',
            id: ws.id
        });
    });
    
    server.listen(PORT, () => {
        console.log(`Server is running at https://localhost:${PORT}`);
    });
})();