import { Callback } from 'aws-lambda';
import { Errors, LikeAPIGatewayProxyHandler } from '../types';
import { nullLogger } from '../utils';

export const errors: Errors = (target, options = {}) => {
  const { body = 'Internal Server Error', logger = nullLogger } = options;

  const wrappedHandler: LikeAPIGatewayProxyHandler = async (...args) => {
    const { 0: event, 1: context, 2: callback } = args;

    const response = { body, statusCode: 500 };

    const callbackproxy: Callback = (errors, result) => {
      if (errors) {
        logger.error(errors);
        callback(null, response);
      } else {
        callback(null, result);
      }
    };

    if (typeof callback === 'function') {
      try {
        await target(event, context, callbackproxy);
      } catch (errors) {
        callbackproxy(errors);
      }
    } else {
      try {
        return await target(event, context);
      } catch (errors) {
        logger.error(errors);
        return response;
      }
    }
  };

  return wrappedHandler;
};
