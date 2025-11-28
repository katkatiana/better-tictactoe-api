import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString, Max, Min, ValidateIf } from "class-validator";
import { UserInfoRequest } from "../interfaces";
import { AgeMatchesDate } from "../decorators/age-matches-date.decorator";

export class UpdateUserInfoRequest implements UserInfoRequest {

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNumber()
    @Min(1)
    @Max(150)
    age: number

    @ValidateIf((o) => o.age >= 18)
    @IsBoolean()
    @IsNotEmpty()
    married: boolean;

    @IsDateString()
    @AgeMatchesDate()
    dateOfBirth: string;
}