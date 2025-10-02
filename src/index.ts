import express from 'express'

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/all', (req, res) => {
  res.send();
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
})
