import { APIGatewayProxyEvent, APIGatewayProxyResult, Callback, Context } from 'aws-lambda';
export interface LikeAPIGatewayProxyHandler {
    (event?: APIGatewayProxyEvent | {
        [k: string]: any;
    } | undefined, context?: Context, callback?: Callback<APIGatewayProxyResult>): void | Promise<APIGatewayProxyResult>;
}
export declare type DecoratorInput = Function | [Function, ...any[]];
export declare type DecoratorWithArgs = [Function, ...any[]];
export declare type DecoratableFn = LikeAPIGatewayProxyHandler | Function;
export interface Logger {
    error(message: string | Error, ...args: any[]): void;
    info(message: string | Error, ...args: any[]): void;
    log(message: string | Error, ...args: any[]): void;
    warn(message: string | Error, ...args: any[]): void;
}
declare type ErrorsOptions = {
    body?: string;
    logger?: Logger;
};
export interface Errors {
    (fn: DecoratableFn, options?: ErrorsOptions): LikeAPIGatewayProxyHandler;
}
declare type FormatJSONOptions = {
    enabled?: boolean;
    logger?: Logger;
    replacer?: (key: any, value: any) => any | string[];
    reviver?: (key: any, value: any) => any;
    spacing?: number | string;
};
export interface FormatJSON {
    (target: DecoratableFn, options: FormatJSONOptions): LikeAPIGatewayProxyHandler;
}
declare type HttpErrorsOptions = {
    logger?: Logger;
};
export interface HttpErrors {
    (fn: DecoratableFn, options?: HttpErrorsOptions): LikeAPIGatewayProxyHandler;
}
declare type EventPayload = {
    source: 'serverless-plugin-warmup';
} | {
    [k: string]: any;
} | {};
interface EventPayloadCheck {
    (event?: EventPayload): boolean;
}
declare type WarmingOptions = {
    eventPayloadCheck?: EventPayloadCheck;
    logger?: Logger;
};
export interface Warming {
    (fn: DecoratableFn, options?: WarmingOptions): LikeAPIGatewayProxyHandler;
}
export {};
