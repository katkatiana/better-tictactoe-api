import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ async: false })
export class AgeMatcher implements ValidatorConstraintInterface {

    validate(dateOfBirth: string, validationArguments?: ValidationArguments): Promise<boolean> | boolean {

        const obj = validationArguments.object;

        const today = new Date();
        const birthDate = new Date(dateOfBirth);

        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            calculatedAge--;
        }

        return calculatedAge === obj['age'];

    }
    defaultMessage(): string {
        return 'Age does not match the provided date of birth'
    }

}

export function AgeMatchesDate(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            constraints: [],
            options: validationOptions,
            validator: AgeMatcher,
        });
    };
}