import express from 'express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.json('Hello world'));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Escutando na ${port}`);
  console.log(`http://localhost:${port}`);
});
