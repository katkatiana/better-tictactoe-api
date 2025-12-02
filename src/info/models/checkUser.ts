import { IsNotEmpty, Max, MaxLength, Min, MinLength, ValidateIf } from "class-validator";
import { UserInfoRequest } from "../interfaces";
import { AgeMatchesDate } from "../decorators/age-matches-date.decorator";

enum ErrorMsg {
    EMPTY_NAME = "Il nome non puo' essere vuoto.",
    MIN_LENGTH_NAME = "Il nome deve essere lungo almeno XXX caratteri.",
    MAX_LENGTH_NAME = "Il nome non puo' superare i XXX caratteri.",
    MIN_AGE = "L'eta' non puo' essere inferiore a XXX.",
    MAX_AGE = "L'eta' non puo' superare XXX.",
    MARRIED_MANDATORY = "La selezione e' obbligatoria per maggiorenni.",
    EMPTY_DATE = "La data di nascita non puo' essere vuota.",
    AGE_MATCHES_DATE = "L'eta' non corrisponde alla data di nascita inserita."
}

export class UpdateUserInfoRequest implements UserInfoRequest {

    static readonly USERNAME_MIN_LENGTH = 5;
    static readonly USERNAME_MAX_LENGTH = 50;
    static readonly AGE_MIN_VALUE = 1;
    static readonly AGE_MAX_VALUE = 150;
    static readonly AGE_THRESHOLD = 18;

    @IsNotEmpty({ message: UpdateUserInfoRequest.buildErrorMessage(ErrorMsg.EMPTY_NAME) })
    @MinLength(UpdateUserInfoRequest.USERNAME_MIN_LENGTH, { message: UpdateUserInfoRequest.buildErrorMessage(ErrorMsg.MIN_LENGTH_NAME, UpdateUserInfoRequest.USERNAME_MIN_LENGTH) })
    @MaxLength(UpdateUserInfoRequest.USERNAME_MAX_LENGTH, { message: UpdateUserInfoRequest.buildErrorMessage(ErrorMsg.MAX_LENGTH_NAME, UpdateUserInfoRequest.USERNAME_MAX_LENGTH) })
    username: string;

    @Min(UpdateUserInfoRequest.AGE_MIN_VALUE, { message: UpdateUserInfoRequest.buildErrorMessage(ErrorMsg.MIN_AGE, UpdateUserInfoRequest.AGE_MIN_VALUE) })
    @Max(UpdateUserInfoRequest.AGE_MAX_VALUE, { message: UpdateUserInfoRequest.buildErrorMessage(ErrorMsg.MAX_AGE, UpdateUserInfoRequest.AGE_MAX_VALUE) })
    age: number

    @ValidateIf((o) => o.age >= UpdateUserInfoRequest.AGE_THRESHOLD)
    @IsNotEmpty({ message: UpdateUserInfoRequest.buildErrorMessage(ErrorMsg.MARRIED_MANDATORY) })
    married: boolean;

    @IsNotEmpty({ message: UpdateUserInfoRequest.buildErrorMessage(ErrorMsg.EMPTY_DATE) })
    @AgeMatchesDate({ message: UpdateUserInfoRequest.buildErrorMessage(ErrorMsg.AGE_MATCHES_DATE) })
    dateOfBirth: string;

    static buildErrorMessage(msg: string, replacementValue?: number): string {
        return replacementValue ? msg.replace("XXX", replacementValue.toString()) : msg;
    }
}