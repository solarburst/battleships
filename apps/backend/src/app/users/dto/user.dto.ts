import { IsNotEmpty, Length } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    @Length(10)
    code: string;
}