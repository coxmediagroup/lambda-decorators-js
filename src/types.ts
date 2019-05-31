import { APIGatewayProxyEvent, APIGatewayProxyResult, Callback, Context } from 'aws-lambda';

/**
 * Lambda decorators coerse APIGatewayProxyEvent (or unknown)
 * into a valid `APIGatewayProxyResult` result.
 */
export interface LikeAPIGatewayProxyHandler {
  (
    event?: APIGatewayProxyEvent | { [k: string]: any } | undefined,
    context?: Context,
    callback?: Callback<APIGatewayProxyResult>,
  ): void | Promise<APIGatewayProxyResult>;
}

export type DecoratorInput = Function | [Function, ...any[]];

export type DecoratorWithArgs = [Function, ...any[]];

export type DecoratableFn = LikeAPIGatewayProxyHandler | Function;

// Minimal expected interface for a "logging" object
export interface Logger {
  error(message: string | Error, ...args: any[]): void;
  info(message: string | Error, ...args: any[]): void;
  log(message: string | Error, ...args: any[]): void;
  warn(message: string | Error, ...args: any[]): void;
}

/*********************
 * Decorator: errors *
 *********************/

// Errors decorator options bag
type ErrorsOptions = {
  body?: string;
  logger?: Logger;
};

// Errors decorator
export interface Errors {
  (fn: DecoratableFn, options?: ErrorsOptions): LikeAPIGatewayProxyHandler;
}

/*************************
 * Decorator: FormatJSON *
 *************************/

type FormatJSONOptions = {
  enabled?: boolean;
  logger?: Logger;
  replacer?: (key: any, value: any) => any | string[];
  reviver?: (key: any, value: any) => any;
  spacing?: number | string;
};

export interface FormatJSON {
  (target: DecoratableFn, options: FormatJSONOptions): LikeAPIGatewayProxyHandler;
}

/***********************
 * Decorator: httpErrors *
 ***********************/

type HttpErrorsOptions = {
  logger?: Logger;
};

// httpErrors decorator
export interface HttpErrors {
  (fn: DecoratableFn, options?: HttpErrorsOptions): LikeAPIGatewayProxyHandler;
}

/**********************
 * Decorator: warming *
 **********************/

// The event payload can be anything deserialized from JSON.
type EventPayload = { source: 'serverless-plugin-warmup' } | { [k: string]: any } | {};

// Function to inspect an event payload to indentify a "warming" event
interface EventPayloadCheck {
  (event?: EventPayload): boolean;
}

// Warming decorator options bag
type WarmingOptions = {
  eventPayloadCheck?: EventPayloadCheck;
  logger?: Logger;
};

// Warming decorator
export interface Warming {
  (fn: DecoratableFn, options?: WarmingOptions): LikeAPIGatewayProxyHandler;
}
