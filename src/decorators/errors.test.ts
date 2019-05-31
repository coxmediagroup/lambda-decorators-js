import { errors } from './errors';
import { nullLogger as logger } from '../utils';

describe('errors decorator', () => {
  const state: { [k: string]: any } = {};

  // simple Lambda handler that can throw errors based on the test state
  const mockHandler = async () => {
    if (state.unexpectedError) {
      throw Error('Something really bad happened');
    }
    return { body: 'Hello, World!', statusCode: 200 };
  };

  const loggerSpy = jest.spyOn(logger, 'error');

  // The decoratored handler using options from state
  const getHandler = () => {
    const { body } = state;
    return errors(mockHandler, { body, logger });
  };

  beforeAll(() => {
    state.event = {};
    state.body = undefined;
  });

  afterEach(() => {
    loggerSpy.mockClear();
  });

  it('returns results from decorated function if no errors', async () => {
    const handler = getHandler();
    const results = await handler(state.event);
    const expected = { body: 'Hello, World!', statusCode: 200 };
    expect(results).toMatchObject(expected);
    expect(loggerSpy).toHaveBeenCalledTimes(0);
  });

  it('logs error and returns an error response if errors', async () => {
    state.unexpectedError = true;
    const handler = getHandler();
    const results = await handler(state.event);
    const expected = { body: 'Internal Server Error', statusCode: 500 };
    expect(results).toMatchObject(expected);
    expect(loggerSpy).toHaveBeenCalledTimes(1);
  });
});
