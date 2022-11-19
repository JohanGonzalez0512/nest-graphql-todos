import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StatusArgs } from './dto/args/status.args';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { AggregationsType } from './types/aggregations.type';

@Resolver(() => Todo)
export class TodoResolver {

    constructor(
        private readonly todoService: TodoService

    ) { }

    @Query(() => [Todo], { name: 'todos' })
    findAll(
        @Args() statusArgs: StatusArgs
    ): Todo[] {
        return this.todoService.findAll(statusArgs);
    }

    @Query(() => Todo, { name: 'todo' })
    findOne(
        @Args('id', { type: () => Int }) id: number
    ): Todo {
        return this.todoService.findOne(id);
    }

    @Mutation(() => Todo, { name: 'createTodo' })
    create(
        @Args('createTodoInput') createTodoInput: CreateTodoInput
    ) {
        return this.todoService.create(createTodoInput);
    }


    @Mutation(() => Todo, { name: 'updateTodo' })
    update(
        @Args('updateTodoInput') updateTodoInput: UpdateTodoInput
    ) {
        return this.todoService.update(updateTodoInput);
    }

    @Mutation(() => Boolean, { name: 'removeTodo' })
    remove(
        @Args('id', { type: () => Int }) id: number
    ) {
        return this.todoService.remove(id);
    }

    // Aggregations
    @Query(() => Int, { name: 'totalTodos' })
    totalTodos() {
        return this.todoService.totalTodos;
    }

    @Query(() => Int, { name: 'completedTodos' })
    completedTodos() {
        return this.todoService.completedTodos;
    }

    @Query(() => Int, { name: 'pendingTodos' })
    pendingTodos() {
        return this.todoService.pendingTodos;
    }

    @Query(() => AggregationsType, { name: 'aggregations' })
    aggregations() : AggregationsType {
        return {
            total: this.todoService.totalTodos,
            completed: this.todoService.completedTodos,
            pending: this.todoService.pendingTodos
        }
    }


}
