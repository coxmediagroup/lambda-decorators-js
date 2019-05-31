import { combine } from './combine';

describe('Decorators: combine (util)', () => {
  const state: { [k: string]: any } = {};

  /**
   * Mock decorator pushes its own label to the outer 'state' then
   * calls the target function.
   */
  const stateDecorator = (
    target: Function,
    label = 'default',
    options: { labelOverride?: string } = {},
  ): Function => {
    let stateLabel = label;
    const { labelOverride } = options;

    if (labelOverride) {
      stateLabel = labelOverride;
    }

    state.appliedDecorators.push(stateLabel);

    return (...args: any[]) => target(...args);
  };

  // simple Lambda handler
  const mockHandler = async () => ({ body: 'Hello, World!', statusCode: 200 });

  beforeEach(() => {
    state.appliedDecorators = [];
  });

  it('should apply decorators so execution is left-right (or top-bottom)', async () => {
    const decoratorsToApply = [
      // bare function
      stateDecorator,

      // array of a single function
      [stateDecorator],

      // array of a single function, followed by any number of args
      [stateDecorator, 'positional arg'],
      [stateDecorator, 'positional arg', { labelOverride: 'positional args' }],
    ];

    const decorated = combine(mockHandler, decoratorsToApply);
    const results = await decorated();
    const expected = { body: 'Hello, World!', statusCode: 200 };

    expect(results).toMatchObject(expected);
    expect(state.appliedDecorators).toEqual([
      'positional args',
      'positional arg',
      'default',
      'default',
    ]);
  });
});
