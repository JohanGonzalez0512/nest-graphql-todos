import { Resolver, Query, Float, Int, Args } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
    @Query(() => String, { description: 'Hello World! es lo que devuelve', name: 'hello' })
    helloWorld(): string {
        return 'Hello World!';
    }

    @Query(() => Float, { name: 'randomNumber' })
    getRandomNumber(): number {
        return Math.random() * 100;
    }

    @Query(() => Int, { name: 'randomFromZeroTo', description: 'Devuelve un número aleatorio entre 0 y el número que se le pasa como parámetro' })
    getRandomFromZeroTo(
        @Args('to', { nullable: true, type: () => Int }) to: number = 6
    ): number {
        return Math.round(Math.random() * to);
    }
}
