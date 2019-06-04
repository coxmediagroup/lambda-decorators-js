import { LikeAPIGatewayProxyHandler, Warming } from '../types';
import { nullLogger } from '../utils';

const defaultPayloadCheck = ({ source = '' }) => {
  return source === 'serverless-plugin-warmup';
};

export const warming: Warming = (targetHandler, options={}) => {
  const { eventPayloadCheck = defaultPayloadCheck, logger = nullLogger } = options;

  const wrappedHandler: LikeAPIGatewayProxyHandler = async (...args) => {
    const { 0: event = {}, 1: context } = args;

    if (eventPayloadCheck(event)) {
      const response = { body: 'Accepted', statusCode: 202 };
      logger.info('Warming event found. Exiting early.');
      return response;
    }

    const response = await targetHandler(event, context);
    return response;
  };

  return wrappedHandler;
};
