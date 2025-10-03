import express, { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/create', async (req: Request, res: Response) => {
  const newTodo = req.body;
  const createdTodo = await prisma.todo.create({
    data: {
      description: newTodo.description,
      done: false
    },
  });
  res.json(createdTodo);
});

app.get('/all', async (req: Request, res: Response) => {
  const allTodos = await prisma.todo.findMany();
  res.json(allTodos);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
