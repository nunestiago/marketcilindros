import express from 'express';

import router from './routes/router';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

const port = process.env.PORT || 3001;

app.listen(port);
