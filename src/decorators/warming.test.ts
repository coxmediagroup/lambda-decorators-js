import { warming } from './warming';
import { nullLogger as logger } from '../utils';

describe('warming decorator', () => {
  const state: { [k: string]: any } = {};

  // simple Lambda handler
  const mockHandler = async () => ({ body: 'Hello, World!', statusCode: 200 });

  // logging function for these tests to spy on
  const loggerSpy = jest.spyOn(logger, 'info');

  // The decoratored handler using options from state
  const getHandler = () => {
    const { eventPayloadCheck } = state;
    return warming(mockHandler, { eventPayloadCheck, logger });
  };

  beforeAll(() => {
    state.event = {};
    state.eventPayloadCheck = undefined;
  });

  afterEach(() => {
    loggerSpy.mockClear();
  });

  it('calls target function if the default "warming" payload is not detected', async () => {
    const handler = getHandler();
    const results = await handler(state.event);
    const expected = { body: 'Hello, World!', statusCode: 200 };
    expect(results).toMatchObject(expected);
    expect(loggerSpy).toHaveBeenCalledTimes(0);
  });

  it('exits early if the default "warming" payload is detected', async () => {
    state.event = { source: 'serverless-plugin-warmup' };
    const handler = getHandler();
    const results = await handler(state.event);
    const expected = { statusCode: 202 };
    expect(results).toMatchObject(expected);
    expect(loggerSpy).toHaveBeenCalledTimes(1);
  });

  it('calls target function if a customized "warming" payload is not detected', async () => {
    state.event = { source: 'something-else' };
    const handler = getHandler();
    const results = await handler(state.event);
    const expected = { body: 'Hello, World!', statusCode: 200 };
    expect(results).toMatchObject(expected);
    expect(loggerSpy).toHaveBeenCalledTimes(0);
  });

  it('exits early if a customized "warming" payload is detected by eventPayloadCheck', async () => {
    state.event = { source: 'something-else' };
    state.eventPayloadCheck = ({ source = '' } = {}) => source === 'something-else';
    const handler = getHandler();
    const results = await handler(state.event);
    const expected = { statusCode: 202 };
    expect(results).toMatchObject(expected);
    expect(loggerSpy).toHaveBeenCalledTimes(1);
  });
});
