import { Errors, LikeAPIGatewayProxyHandler } from '../types';
import { nullLogger } from '../utils';

export const errors: Errors = (target, options = {}) => {
  const { body = 'Internal Server Error', logger = nullLogger } = options;

  const wrappedHandler: LikeAPIGatewayProxyHandler = async (...args) => {
    const { 0: event, 1: context } = args;

    const response = { body, statusCode: 500 };
    try {
      return await target(event, context);
    } catch (errors) {
      logger.error(errors);
      return response;
    }
  };

  return wrappedHandler;
};
