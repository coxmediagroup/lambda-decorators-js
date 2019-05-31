import { formatJSON } from './format-json';
import { nullLogger as logger } from '../utils';

describe('formatJSON decorator', () => {
  const state: { [k: string]: any } = {};

  // simple Lambda handler
  const mockHandler = async () => {
    const { body } = state;
    return { body, statusCode: 200 };
  };

  // logging function for these tests to spy on
  const loggerSpy = jest.spyOn(logger, 'warn');

  // The decoratored handler using options from state
  const getHandler = () => {
    const { enabled, replacer, reviver, spacing } = state;
    return formatJSON(mockHandler, { enabled, logger, replacer, reviver, spacing });
  };

  beforeEach(() => {
    state.body = '{ "data": "Hello, World!" }';
    state.enabled = undefined;
    state.event = {};
    state.replacer = undefined;
    state.reviver = undefined;
    state.spacing = undefined;
  });

  afterEach(() => {
    loggerSpy.mockClear();
  });

  it('Has reasonable defaults', async () => {
    const handler = getHandler();
    const results = await handler(state.event);
    const expected = { body: '{"data":"Hello, World!"}', statusCode: 200 };
    expect(results).toMatchObject(expected);
    expect(loggerSpy).toHaveBeenCalledTimes(0);
  });

  it('Handles unparsable input', async () => {
    state.body = 'This is Not JSON';
    const handler = getHandler();
    const results = await handler(state.event);
    const expected = { body: 'This is Not JSON', statusCode: 200 };
    expect(results).toMatchObject(expected);
    expect(loggerSpy).toHaveBeenCalledTimes(1);
  });

  it('Honors the enabled flag', async () => {
    state.enabled = false;
    state.body = '{\n\n\n"data":\t\t\t"Hello, World!"\n\n\n}';
    const handler = getHandler();
    const results = await handler(state.event);
    const expected = { body: '{\n\n\n"data":\t\t\t"Hello, World!"\n\n\n}', statusCode: 200 };
    expect(results).toMatchObject(expected);
    expect(loggerSpy).toHaveBeenCalledTimes(0);
  });

  describe('JSON.stringify args', () => {
    it('Accepts a function for replacer argument', async () => {
      state.replacer = (k: string, v: any) => (k === 'data' ? 'Hello, Replacer!' : v);
      const handler = getHandler();
      const results = await handler(state.event);
      const expected = { body: '{"data":"Hello, Replacer!"}', statusCode: 200 };
      expect(results).toMatchObject(expected);
      expect(loggerSpy).toHaveBeenCalledTimes(0);
    });

    it('Accepts an array for replacer argument', async () => {
      state.body = '{ "data": "Hello, World!", "extra": "stuff" }';
      state.replacer = ['data'];
      const handler = getHandler();
      const results = await handler(state.event);
      const expected = { body: '{"data":"Hello, World!"}', statusCode: 200 };
      expect(results).toMatchObject(expected);
      expect(loggerSpy).toHaveBeenCalledTimes(0);
    });

    it('Accepts a number for spacing argument', async () => {
      state.spacing = 2;
      const handler = getHandler();
      const results = await handler(state.event);
      const expected = { body: '{\n  "data": "Hello, World!"\n}', statusCode: 200 };
      expect(results).toMatchObject(expected);
      expect(loggerSpy).toHaveBeenCalledTimes(0);
    });

    it('Accepts a string for spacing argument', async () => {
      state.spacing = '\t';
      const handler = getHandler();
      const results = await handler(state.event);
      const expected = { body: '{\n\t"data": "Hello, World!"\n}', statusCode: 200 };
      expect(results).toMatchObject(expected);
      expect(loggerSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('JSON.parse args', () => {
    it('Accepts a function for reviver argument', async () => {
      state.body = '{ "data": "Hello, World!", "extra": "stuff" }';
      state.reviver = (k: string, v: any) => (k === 'extra' ? null : v);
      const handler = getHandler();
      const results = await handler(state.event);
      const expected = { body: '{"data":"Hello, World!","extra":null}', statusCode: 200 };
      expect(results).toMatchObject(expected);
      expect(loggerSpy).toHaveBeenCalledTimes(0);
    });
  });
});
