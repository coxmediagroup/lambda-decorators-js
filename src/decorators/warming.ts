import { LikeAPIGatewayProxyHandler, Warming } from '../types';
import { nullLogger } from '../utils';

const defaultPayloadCheck = ({ source = '' }) => {
  return source === 'serverless-plugin-warmup';
};

export const warming: Warming = (targetHandler, options = {}) => {
  const { eventPayloadCheck = defaultPayloadCheck, logger = nullLogger } = options;

  const wrappedHandler: LikeAPIGatewayProxyHandler = async (...args) => {
    const { 0: event = {}, 1: context, 2: callback } = args;

    if (eventPayloadCheck(event)) {
      const response = { body: 'Accepted', statusCode: 202 };

      logger.info('Warming event found. Exiting early.');

      if (typeof callback === 'function') {
        return callback(null, response);
      }

      return response;
    }

    const response = await targetHandler(event, context);

    if (typeof callback === 'function') {
      return callback(null, response);
    }

    return response;
  };

  return wrappedHandler;
};
