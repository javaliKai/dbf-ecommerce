import Express from 'express';
const app = Express();

app.get('/', (req, res, next) => {
  res.send('<h1>Hello World! Server is running.</h1>');
});

const PORT = 8080 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
