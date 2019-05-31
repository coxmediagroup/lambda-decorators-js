import { httpErrors } from './http-errors';
import { nullLogger as logger } from '../utils';

describe('httpErrors decorator', () => {
  const state: { [k: string]: any } = {
    event: {},
  };

  // simple Lambda handler that can throw errors based on the test state
  const mockHandler = async () => {
    const { customMessage, throwThis, unexpectedError } = state;

    if (unexpectedError) {
      throw Error('Unexpected error');
    }

    if (throwThis) {
      if (customMessage) {
        throw Error(`[${throwThis}] ${customMessage}`);
      }

      throw Error(`[${throwThis}]`);
    }

    return { body: 'Hello, World!', statusCode: 200 };
  };

  // logging function for these tests to spy on
  const loggerSpy = jest.spyOn(logger, 'info');

  // The decoratored handler using options from state
  const getHandler = () => httpErrors(mockHandler, { logger });

  beforeEach(() => {
    state.event = {};
  });

  afterEach(() => {
    loggerSpy.mockClear();
  });

  it('calls target function if not httpError', async () => {
    const handler = getHandler();
    const results = await handler(state.event);
    const expected = { body: 'Hello, World!', statusCode: 200 };
    expect(results).toMatchObject(expected);
    expect(loggerSpy).toHaveBeenCalledTimes(0);
  });

  it('returns httpError response', async () => {
    state.throwThis = 404;
    const handler = getHandler();
    const results = await handler(state.event);
    const expected = { body: 'Not Found', statusCode: 404 };
    expect(results).toMatchObject(expected);
    expect(loggerSpy).toHaveBeenCalledTimes(1);
  });

  it('supports custom messages', async () => {
    state.throwThis = 404;
    state.customMessage = 'That was nowhere to be found!';
    const handler = getHandler();
    const results = await handler(state.event);
    const expected = { body: 'That was nowhere to be found!', statusCode: 404 };
    expect(results).toMatchObject(expected);
    expect(loggerSpy).toHaveBeenCalledTimes(1);
  });

  it('re-throws errors if error is not httpError', async () => {
    state.unexpectedError = true;
    const handler = getHandler();
    await expect(handler(state.event)).rejects.toThrow();
    expect(loggerSpy).toHaveBeenCalledTimes(0);
  });
});
