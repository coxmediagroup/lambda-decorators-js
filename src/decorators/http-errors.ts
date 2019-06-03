import { HttpErrors, LikeAPIGatewayProxyHandler } from '../types';
import { nullLogger } from '../utils';

// Supporting the same status codes that Serverless Framework supports
// https://serverless.com/framework/docs/providers/aws/events/apigateway#available-status-codes
const availableStatusCodes = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  422: 'Unprocessable Entity',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  504: 'Gateway Timeout',
};

export const httpErrors: HttpErrors = (target, options) => {
  const { logger = nullLogger } = options;

  const wrappedHandler: LikeAPIGatewayProxyHandler = async (...args) => {
    const { 0: event, 1: context } = args;

    try {
      const response = await target(event, context);
      return response;
    } catch (err) {
      const { message = '' } = err;
      const foundErrorCode = message.match(/^\[(\d{3})\]/); // e.g. "[404] Not Found" -> "404"

      let statusCode: number;
      let statusMessage: string;

      if (foundErrorCode) {
        const { 1: errorCode } = foundErrorCode;
        statusCode = parseInt(errorCode, 10);
        statusMessage = availableStatusCodes[statusCode];
      }

      if (statusMessage) {
        const customMessage = message.slice(5).trim(); // e.g. "[404] Not Found" -> "Not Found"
        const body = customMessage || statusMessage;
        const response = { body, statusCode };

        logger.info(`httpError: [${statusCode}] "${statusMessage}" "${customMessage || ''}"`);
        return response;
      }

      throw err;
    }
  };

  return wrappedHandler;
};
