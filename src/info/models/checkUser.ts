import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength, ValidateIf } from "class-validator";
import { UserInfoRequest } from "../interfaces";
import { AgeMatchesDate } from "../decorators/age-matches-date.decorator";

export class UpdateUserInfoRequest implements UserInfoRequest {

    //TO DO: aggiungere messaggi di errore non statici
    @IsNotEmpty({ message: "Il nome non può essere vuoto" })
    @MinLength(5, { message: "Il nome deve essere lungo almeno 5 caratteri" })
    @MaxLength(50, { message: "Il nome non può superare i 50 caratteri" })
    username: string;

    @Min(1, { message: "L'età minima è 1 anno" })
    @Max(150, { message: "L'età massima è 150 anni" })
    age: number

    @ValidateIf((o) => o.age >= 18)
    @IsNotEmpty({ message: "La selezione è obbligatoria per maggiorenni" })
    married: boolean;

    @IsNotEmpty({ message: "La data di nascita non può essere vuota" })
    @AgeMatchesDate({ message: "L'età non corrisponde alla data di nascita inserita" })
    dateOfBirth: string;
}