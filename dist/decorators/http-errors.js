"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.httpErrors = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _utils = require("../utils");

// Supporting the same status codes that Serverless Framework supports
// https://serverless.com/framework/docs/providers/aws/events/apigateway#available-status-codes
var availableStatusCodes = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  422: 'Unprocessable Entity',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  504: 'Gateway Timeout'
};

var httpErrors = function httpErrors(target, options) {
  var _options$logger = options.logger,
      logger = _options$logger === void 0 ? _utils.nullLogger : _options$logger;

  var wrappedHandler =
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee() {
      var _len,
          args,
          _key,
          event,
          context,
          response,
          _err$message,
          message,
          foundErrorCode,
          statusCode,
          statusMessage,
          errorCode,
          customMessage,
          body,
          _response,
          _args = arguments;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = _args[_key];
              }

              event = args[0], context = args[1];
              _context.prev = 2;
              _context.next = 5;
              return target(event, context);

            case 5:
              response = _context.sent;
              return _context.abrupt("return", response);

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](2);
              _err$message = _context.t0.message, message = _err$message === void 0 ? '' : _err$message;
              foundErrorCode = message.match(/^\[(\d{3})\]/); // e.g. "[404] Not Found" -> "404"

              if (foundErrorCode) {
                errorCode = foundErrorCode[1];
                statusCode = parseInt(errorCode, 10);
                statusMessage = availableStatusCodes[statusCode];
              }

              if (!statusMessage) {
                _context.next = 20;
                break;
              }

              customMessage = message.slice(5).trim(); // e.g. "[404] Not Found" -> "Not Found"

              body = customMessage || statusMessage;
              _response = {
                body: body,
                statusCode: statusCode
              };
              logger.info("httpError: [".concat(statusCode, "] \"").concat(statusMessage, "\" \"").concat(customMessage || '', "\""));
              return _context.abrupt("return", _response);

            case 20:
              throw _context.t0;

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 9]]);
    }));

    return function wrappedHandler() {
      return _ref.apply(this, arguments);
    };
  }();

  return wrappedHandler;
};

exports.httpErrors = httpErrors;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL2h0dHAtZXJyb3JzLnRzIl0sIm5hbWVzIjpbImF2YWlsYWJsZVN0YXR1c0NvZGVzIiwiaHR0cEVycm9ycyIsInRhcmdldCIsIm9wdGlvbnMiLCJsb2dnZXIiLCJudWxsTG9nZ2VyIiwid3JhcHBlZEhhbmRsZXIiLCJhcmdzIiwiZXZlbnQiLCJjb250ZXh0IiwicmVzcG9uc2UiLCJtZXNzYWdlIiwiZm91bmRFcnJvckNvZGUiLCJtYXRjaCIsImVycm9yQ29kZSIsInN0YXR1c0NvZGUiLCJwYXJzZUludCIsInN0YXR1c01lc3NhZ2UiLCJjdXN0b21NZXNzYWdlIiwic2xpY2UiLCJ0cmltIiwiYm9keSIsImluZm8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBTUEsb0JBQW9CLEdBQUc7QUFDM0IsT0FBSyxhQURzQjtBQUUzQixPQUFLLGNBRnNCO0FBRzNCLE9BQUssV0FIc0I7QUFJM0IsT0FBSyxXQUpzQjtBQUszQixPQUFLLHNCQUxzQjtBQU0zQixPQUFLLHVCQU5zQjtBQU8zQixPQUFLLGFBUHNCO0FBUTNCLE9BQUs7QUFSc0IsQ0FBN0I7O0FBV08sSUFBTUMsVUFBc0IsR0FBRyxTQUF6QkEsVUFBeUIsQ0FBQ0MsTUFBRCxFQUFTQyxPQUFULEVBQXFCO0FBQUEsd0JBQ3pCQSxPQUR5QixDQUNqREMsTUFEaUQ7QUFBQSxNQUNqREEsTUFEaUQsZ0NBQ3hDQyxpQkFEd0M7O0FBR3pELE1BQU1DLGNBQTBDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQ0FBRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQVVDLElBQVY7QUFBVUEsZ0JBQUFBLElBQVY7QUFBQTs7QUFDdENDLGNBQUFBLEtBRHNDLEdBQ2hCRCxJQURnQixDQUN6QyxDQUR5QyxHQUM1QkUsT0FENEIsR0FDaEJGLElBRGdCLENBQy9CLENBRCtCO0FBQUE7QUFBQTtBQUFBLHFCQUl4QkwsTUFBTSxDQUFDTSxLQUFELEVBQVFDLE9BQVIsQ0FKa0I7O0FBQUE7QUFJekNDLGNBQUFBLFFBSnlDO0FBQUEsK0NBS3hDQSxRQUx3Qzs7QUFBQTtBQUFBO0FBQUE7QUFBQSx5Q0FPdkNDLE9BUHVDLEVBT3ZDQSxPQVB1Qyw2QkFPN0IsRUFQNkI7QUFRekNDLGNBQUFBLGNBUnlDLEdBUXhCRCxPQUFPLENBQUNFLEtBQVIsQ0FBYyxjQUFkLENBUndCLEVBUU87O0FBS3RELGtCQUFJRCxjQUFKLEVBQW9CO0FBQ1BFLGdCQUFBQSxTQURPLEdBQ09GLGNBRFAsQ0FDVixDQURVO0FBRWxCRyxnQkFBQUEsVUFBVSxHQUFHQyxRQUFRLENBQUNGLFNBQUQsRUFBWSxFQUFaLENBQXJCO0FBQ0FHLGdCQUFBQSxhQUFhLEdBQUdqQixvQkFBb0IsQ0FBQ2UsVUFBRCxDQUFwQztBQUNEOztBQWpCOEMsbUJBbUIzQ0UsYUFuQjJDO0FBQUE7QUFBQTtBQUFBOztBQW9CdkNDLGNBQUFBLGFBcEJ1QyxHQW9CdkJQLE9BQU8sQ0FBQ1EsS0FBUixDQUFjLENBQWQsRUFBaUJDLElBQWpCLEVBcEJ1QixFQW9CRTs7QUFDekNDLGNBQUFBLElBckJ1QyxHQXFCaENILGFBQWEsSUFBSUQsYUFyQmU7QUFzQnZDUCxjQUFBQSxTQXRCdUMsR0FzQjVCO0FBQUVXLGdCQUFBQSxJQUFJLEVBQUpBLElBQUY7QUFBUU4sZ0JBQUFBLFVBQVUsRUFBVkE7QUFBUixlQXRCNEI7QUF3QjdDWCxjQUFBQSxNQUFNLENBQUNrQixJQUFQLHVCQUEyQlAsVUFBM0IsaUJBQTJDRSxhQUEzQyxrQkFBOERDLGFBQWEsSUFBSSxFQUEvRTtBQXhCNkMsK0NBeUJ0Q1IsU0F6QnNDOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBSDs7QUFBQSxvQkFBMUNKLGNBQTBDO0FBQUE7QUFBQTtBQUFBLEtBQWhEOztBQWdDQSxTQUFPQSxjQUFQO0FBQ0QsQ0FwQ00iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwRXJyb3JzLCBMaWtlQVBJR2F0ZXdheVByb3h5SGFuZGxlciB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IG51bGxMb2dnZXIgfSBmcm9tICcuLi91dGlscyc7XG5cbi8vIFN1cHBvcnRpbmcgdGhlIHNhbWUgc3RhdHVzIGNvZGVzIHRoYXQgU2VydmVybGVzcyBGcmFtZXdvcmsgc3VwcG9ydHNcbi8vIGh0dHBzOi8vc2VydmVybGVzcy5jb20vZnJhbWV3b3JrL2RvY3MvcHJvdmlkZXJzL2F3cy9ldmVudHMvYXBpZ2F0ZXdheSNhdmFpbGFibGUtc3RhdHVzLWNvZGVzXG5jb25zdCBhdmFpbGFibGVTdGF0dXNDb2RlcyA9IHtcbiAgNDAwOiAnQmFkIFJlcXVlc3QnLFxuICA0MDE6ICdVbmF1dGhvcml6ZWQnLFxuICA0MDM6ICdGb3JiaWRkZW4nLFxuICA0MDQ6ICdOb3QgRm91bmQnLFxuICA0MjI6ICdVbnByb2Nlc3NhYmxlIEVudGl0eScsXG4gIDUwMDogJ0ludGVybmFsIFNlcnZlciBFcnJvcicsXG4gIDUwMjogJ0JhZCBHYXRld2F5JyxcbiAgNTA0OiAnR2F0ZXdheSBUaW1lb3V0Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBodHRwRXJyb3JzOiBIdHRwRXJyb3JzID0gKHRhcmdldCwgb3B0aW9ucykgPT4ge1xuICBjb25zdCB7IGxvZ2dlciA9IG51bGxMb2dnZXIgfSA9IG9wdGlvbnM7XG5cbiAgY29uc3Qgd3JhcHBlZEhhbmRsZXI6IExpa2VBUElHYXRld2F5UHJveHlIYW5kbGVyID0gYXN5bmMgKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCB7IDA6IGV2ZW50LCAxOiBjb250ZXh0IH0gPSBhcmdzO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGFyZ2V0KGV2ZW50LCBjb250ZXh0KTtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnN0IHsgbWVzc2FnZSA9ICcnIH0gPSBlcnI7XG4gICAgICBjb25zdCBmb3VuZEVycm9yQ29kZSA9IG1lc3NhZ2UubWF0Y2goL15cXFsoXFxkezN9KVxcXS8pOyAvLyBlLmcuIFwiWzQwNF0gTm90IEZvdW5kXCIgLT4gXCI0MDRcIlxuXG4gICAgICBsZXQgc3RhdHVzQ29kZTogbnVtYmVyO1xuICAgICAgbGV0IHN0YXR1c01lc3NhZ2U6IHN0cmluZztcblxuICAgICAgaWYgKGZvdW5kRXJyb3JDb2RlKSB7XG4gICAgICAgIGNvbnN0IHsgMTogZXJyb3JDb2RlIH0gPSBmb3VuZEVycm9yQ29kZTtcbiAgICAgICAgc3RhdHVzQ29kZSA9IHBhcnNlSW50KGVycm9yQ29kZSwgMTApO1xuICAgICAgICBzdGF0dXNNZXNzYWdlID0gYXZhaWxhYmxlU3RhdHVzQ29kZXNbc3RhdHVzQ29kZV07XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0dXNNZXNzYWdlKSB7XG4gICAgICAgIGNvbnN0IGN1c3RvbU1lc3NhZ2UgPSBtZXNzYWdlLnNsaWNlKDUpLnRyaW0oKTsgLy8gZS5nLiBcIls0MDRdIE5vdCBGb3VuZFwiIC0+IFwiTm90IEZvdW5kXCJcbiAgICAgICAgY29uc3QgYm9keSA9IGN1c3RvbU1lc3NhZ2UgfHwgc3RhdHVzTWVzc2FnZTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB7IGJvZHksIHN0YXR1c0NvZGUgfTtcblxuICAgICAgICBsb2dnZXIuaW5mbyhgaHR0cEVycm9yOiBbJHtzdGF0dXNDb2RlfV0gXCIke3N0YXR1c01lc3NhZ2V9XCIgXCIke2N1c3RvbU1lc3NhZ2UgfHwgJyd9XCJgKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfVxuXG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB3cmFwcGVkSGFuZGxlcjtcbn07XG4iXX0=