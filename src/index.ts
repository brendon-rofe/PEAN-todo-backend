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

app.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const todo = await prisma.todo.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(todo);
});

app.put('/update-description/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedTodo = await prisma.todo.update({
    where: {
      id: Number(id),
    },
    data: {
      description: req.body.description,
    },
  });
  res.json(updatedTodo);
});

app.put('/update-status/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedTodo = await prisma.todo.update({
    where: {
      id: Number(id),
    },
    data: {
      done: true,
    },
  });
  res.json(updatedTodo);
});

app.delete('/delete/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedTodo = await prisma.todo.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(deletedTodo);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
