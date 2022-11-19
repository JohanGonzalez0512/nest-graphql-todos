import { Field, InputType, Int } from "@nestjs/graphql";
import { IsString, IsNotEmpty, MaxLength, IsInt, Min, IsOptional, IsBoolean } from "class-validator";

@InputType()
export class UpdateTodoInput {


    @Field(() => Int)
    @IsInt()
    @Min(1)
    id: number;

    @Field( () => String, { description: 'Description of the todo', nullable: true })
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    @IsOptional()
    description?: string;

    @Field( () => Boolean, { description: 'Is the todo done?', nullable: true })
    @IsOptional()
    @IsBoolean()
    done?: boolean;

}