# Lambda Decorators

Collection of useful decorators for wrapping Lambda functions with
reusable code.

## About

Wrapping Lambda handlers with decorators can reduce code duplication,
while leaving Lambda function code to be concise and easier to maintain.

## Quick Start

```ts
import { APIGatewayProxyHandler } from 'aws-lambda';
import { errors } from 'lambda-decorators';
import { getDataHandler } from './handlers';

// wrap `getDataHandler` with a catch-all errror handler
export getData: APIGatewayProxyHandler = errors(getDataHandler);
```

## Usage example

Assume there is an existing Lambda function that returns data generated from
expensive (time|money) computations.

```ts
import { APIGatewayProxyHandler } from 'aws-lambda';
import { getExpensiveData } from './expensive-data-sources';

export const getData: APIGatewayProxyHandler = async (event, context) => {
  const data = getExpensiveData({ extraExpensive: true }); // yikes

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
```

Also assume that a scheduled task was created to run every five minutes to
invoke the Lambda function thereby keeping the Lambda "warm". The task does
not use any results returned by the Lambda function.

To optimize performace and to save on resources, a new ticket is placed in the
backlog.

```Gherkin
Feature: Update Lambdas to handle warming tasks
Given: a Lambda computation is expensive
And there is 'warming task' that may invoke a Lambda function
When: a 'warming task' is detected
Then: the Lambda function MUST exit early
```

Knowing that this particular warming task sends an event payload identifying
itself as the caller:

```ts
event.source = 'serverless-plugin-warmup'
```

One may be tempted to simply update the handler to directly affect the logic.

```ts
import { APIGatewayProxyHandler } from 'aws-lambda';
import { getExpensiveData } from './expensive-data-sources';

export const getData: APIGatewayProxyHandler = async (event, context) => {
  // Warming tasks exit early
  if (event.source === 'serverless-plugin-warmup') {
    return { statusCode: 204, body: '' };
  }

  const data = getExpensiveData({ extraExpensive: true }); // yikes!

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
```

If there are many Lambdas to update in this fashion, this would become a
tedious chore to update and maintain.

Also, should additional external factors continued to be addressed in this
fashion then the handlers may become burdened with excess logic obscuring the
simplicity of the function itself.

Using decorators, one could more easily apply distinct blocks of logic (such as
detecting 'warming tasks') and minimize the impact on testable code.

Example code updated to use the `warming` decorator function.

```ts
import { APIGatewayProxyHandler } from 'aws-lambda';
import { warming } from 'lambda-decorators';
import { getExpensiveData } from './expensive-data-sources';

export const getDataHandler: APIGatewayProxyHandler = async (event, context) => {
  const data = getExpensiveData({ extraExpensive: true });

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

// Warming tasks exit early. Note the `warming` decorator function
export getData: APIGatewayProxyHandler = warming(getDataHandler);
```

## Available Decorators

### errors

```ts
import { APIGatewayProxyHandler } from 'aws-lambda';
import { errors } from 'lambda-decorators';
import { getSketchyData } from './sketchy-data-sources';

export const getDataHandler: APIGatewayProxyHandler = async (event, context) => {
  const data = getSketchyData(); // sometimes throws mystery errors

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

// Catch all uncaught exceptions
export getData: APIGatewayProxyHandler = errors(getDataHandler);
```

### httpErrors

```ts
import { APIGatewayProxyHandler } from 'aws-lambda';
import { httpErrors } from 'lambda-decorators';
import { searchForData } from './search-for-data';

export const searchDataHandler: APIGatewayProxyHandler = async (event, context) => {

  const data = searchForData();

  if (!data.length) {
    throw Error('[404] Did not find anything good!');
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

// Delegates http error responses to the decorator
export searchData: APIGatewayProxyHandler = httpErrors(searchDataHandler);
```

### warming

```ts
import { APIGatewayProxyHandler } from 'aws-lambda';
import { warming } from 'lambda-decorators';
import { getExpensiveData } from './expensive-data-sources';

export const getDataHandler: APIGatewayProxyHandler = async (event, context) => {
  const data = getExpensiveData({ extraExpensive: true });

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

// Warming tasks exit early. Note the `warming` decorator function
export getData: APIGatewayProxyHandler = warming(getDataHandler);
```

## Available Utilities

### combine

```ts
import { combine, errors, httpErrors, warming } from 'lambda-decorators';
import { getDataHandler } from './handlers';

// Combine all the decorators into a super handler.
export getData = combine(getDataHandler, [errors, httpErrors, warming]);
```
