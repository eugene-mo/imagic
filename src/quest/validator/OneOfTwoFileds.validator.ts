import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function OneOfTwoFields(property: string, relatedProperty: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'OneOfTwoFields',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property, relatedProperty],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return (value && !relatedValue) || (!value && relatedValue);
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return `Either ${args.property} or ${relatedPropertyName} must be provided, but not both or none.`;
        },
      },
    });
  };
}