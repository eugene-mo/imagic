import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsJpgFile(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        
        registerDecorator({
            name: 'isJpgFile',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (!value) {
                        return false;
                    }
                    const mimetype = value.mimetype;
                    return mimetype === 'image/jpeg' || mimetype === 'image/jpg';
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a JPG file`;
                },
            },
        });
    };
}
