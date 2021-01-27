import * as express from 'express';

const PORT = 3000;

const app = express();
app.get('/', (req, res) => res.send('Express + TypeScript Server'));

app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
});