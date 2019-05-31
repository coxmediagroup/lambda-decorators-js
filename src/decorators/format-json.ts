import { FormatJSON, LikeAPIGatewayProxyHandler } from '../types';
import { nullLogger } from '../utils';

export const formatJSON: FormatJSON = (target, options = {}) => {
  const {
    enabled = true,
    logger = nullLogger,
    replacer = null,
    reviver = null,
    spacing = 0,
  } = options;
  const wrappedHandler: LikeAPIGatewayProxyHandler = async (...args) => {
    const { 0: event, 1: context, 2: callback } = args;

    const response = await target(event, context);

    if (enabled && typeof response.body === 'string') {
      try {
        const parsed = JSON.parse(response.body, reviver);
        response.body = JSON.stringify(parsed, replacer, spacing);
      } catch (err) {
        logger.warn(err);
      }
    }

    if (typeof callback === 'function') {
      return callback(null, response);
    }

    return response;
  };

  return wrappedHandler;
};
