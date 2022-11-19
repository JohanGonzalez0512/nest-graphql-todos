import { Injectable, NotFoundException } from '@nestjs/common';
import { StatusArgs } from './dto/args/status.args';
import { UpdateTodoInput, CreateTodoInput } from './dto/inputs';
import { Todo } from './entity/todo.entity';

@Injectable()
export class TodoService {

    private todos: Todo[] = [
        {
            id: 1,
            description: 'Learn GraphQL',
            done: false
        },
        {
            id: 2,
            description: 'Learn Nest',
            done: false

        },
        {
            id: 3,
            description: 'Learn React',
            done: false
        }
    ]

    get totalTodos() {
        return this.todos.length;
    }

    get completedTodos() {
        return this.todos.filter(todo => todo.done).length;
    }

    get pendingTodos() {
        return this.todos.filter(todo => !todo.done).length;
    }

    findAll({ status }: StatusArgs): Todo[] {
        if (status === undefined) return this.todos;

        return this.todos.filter(todo => todo.done === status);
    }

    findOne(id: number): Todo {
        const todo = this.todos.find(todo => todo.id === id);

        if (!todo) throw new NotFoundException(`Todo #${id} not found`);

        return todo;
    }

    create(createTodoInput: CreateTodoInput): Todo {
        const todo = new Todo();
        todo.description = createTodoInput.description;
        todo.id = this.todos.length + 1;

        this.todos.push(todo);

        return todo;
    }

    update({ id, description, done }: UpdateTodoInput) {

        const todoToUpdate = this.findOne(id);

        if (description) todoToUpdate.description = description;
        if (done !== undefined) todoToUpdate.done = done;

        this.todos = this.todos.map(todo => todo.id === id ? todoToUpdate : todo);

        return todoToUpdate;



    }

    remove(id: number) {
        this.findOne(id);

        this.todos = this.todos.filter(todo => todo.id !== id);

        return true;
    }


}
