import { Response, Request } from "express";
import { ITodo } from "../../types/todo";
import Todo from '../../models/todo';

// Get all todos
const getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos: ITodo[] = await Todo.find();
        res.status(200).json({ todos })
    } catch (error) {
        throw error
    }
}

// Add todo

const addTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<ITodo, "name" | "description" | "status">
        const todo: ITodo = new Todo({
            name: body.name,
            description: body.description,
            status: body.status
        });
    const newTodo = await todo.save();
    res.status(201).json({ message: 'Todo added', todo: newTodo });
    } catch (error) {
        throw error;
    }
}

export { getTodos, addTodo }