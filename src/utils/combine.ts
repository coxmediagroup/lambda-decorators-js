import { DecoratorInput, DecoratorWithArgs } from '../types';

const normalizeDecoratorInput = (input: DecoratorInput): DecoratorWithArgs => {
  if (typeof input === 'function') {
    const decorator = input;
    return [decorator];
  }

  const [decorator, ...args] = input;

  if (typeof decorator === 'function') {
    return [decorator, ...args];
  }
};

const applyDecorators = (target: Function, current: DecoratorWithArgs): Function => {
  const [decorator, ...args] = current;
  return decorator(target, ...args);
};

/**
 * Apply an array of decorators to a function.
 *
 * Decorators exist in TypeScript but are applied to Classes and Methods; they
 * are not applied to functions.
 *
 * The array of decorators are applied from right-to-left to replicate the
 * same behavior of decorator stacking.
 *
 * ```ts
 * // Example of two decorators applied to a class method
 * class C {
 *   @f()
 *   @g()
 *   method() {}
 * }
 * // f(): f is evaluated first
 * // g(): g is evaluated second
 * // g(): g is called third
 * // f(): f is called fourth
 * ```
 */
export const combine = (target: Function, decorators: any[]): Function => {
  return decorators
    .map(normalizeDecoratorInput)
    .filter((x) => x)
    .reduceRight(applyDecorators, target);
};
