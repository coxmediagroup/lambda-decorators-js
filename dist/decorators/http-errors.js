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
          callback,
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

              event = args[0], context = args[1], callback = args[2];
              _context.prev = 2;
              _context.next = 5;
              return target(event, context);

            case 5:
              response = _context.sent;

              if (!(typeof callback === 'function')) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", callback(null, response));

            case 8:
              return _context.abrupt("return", response);

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](2);
              _err$message = _context.t0.message, message = _err$message === void 0 ? '' : _err$message;
              foundErrorCode = message.match(/^\[(\d{3})\]/); // e.g. "[404] Not Found" -> "404"

              if (foundErrorCode) {
                errorCode = foundErrorCode[1];
                statusCode = parseInt(errorCode, 10);
                statusMessage = availableStatusCodes[statusCode];
              }

              if (!statusMessage) {
                _context.next = 24;
                break;
              }

              customMessage = message.slice(5).trim(); // e.g. "[404] Not Found" -> "Not Found"

              body = customMessage || statusMessage;
              _response = {
                body: body,
                statusCode: statusCode
              };
              logger.info("httpError: [".concat(statusCode, "] \"").concat(statusMessage, "\" \"").concat(customMessage || '', "\""));

              if (!(typeof callback === 'function')) {
                _context.next = 23;
                break;
              }

              return _context.abrupt("return", callback(null, _response));

            case 23:
              return _context.abrupt("return", _response);

            case 24:
              throw _context.t0;

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 11]]);
    }));

    return function wrappedHandler() {
      return _ref.apply(this, arguments);
    };
  }();

  return wrappedHandler;
};

exports.httpErrors = httpErrors;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL2h0dHAtZXJyb3JzLnRzIl0sIm5hbWVzIjpbImF2YWlsYWJsZVN0YXR1c0NvZGVzIiwiaHR0cEVycm9ycyIsInRhcmdldCIsIm9wdGlvbnMiLCJsb2dnZXIiLCJudWxsTG9nZ2VyIiwid3JhcHBlZEhhbmRsZXIiLCJhcmdzIiwiZXZlbnQiLCJjb250ZXh0IiwiY2FsbGJhY2siLCJyZXNwb25zZSIsIm1lc3NhZ2UiLCJmb3VuZEVycm9yQ29kZSIsIm1hdGNoIiwiZXJyb3JDb2RlIiwic3RhdHVzQ29kZSIsInBhcnNlSW50Iiwic3RhdHVzTWVzc2FnZSIsImN1c3RvbU1lc3NhZ2UiLCJzbGljZSIsInRyaW0iLCJib2R5IiwiaW5mbyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFNQSxvQkFBb0IsR0FBRztBQUMzQixPQUFLLGFBRHNCO0FBRTNCLE9BQUssY0FGc0I7QUFHM0IsT0FBSyxXQUhzQjtBQUkzQixPQUFLLFdBSnNCO0FBSzNCLE9BQUssc0JBTHNCO0FBTTNCLE9BQUssdUJBTnNCO0FBTzNCLE9BQUssYUFQc0I7QUFRM0IsT0FBSztBQVJzQixDQUE3Qjs7QUFXTyxJQUFNQyxVQUFzQixHQUFHLFNBQXpCQSxVQUF5QixDQUFDQyxNQUFELEVBQVNDLE9BQVQsRUFBcUI7QUFBQSx3QkFDekJBLE9BRHlCLENBQ2pEQyxNQURpRDtBQUFBLE1BQ2pEQSxNQURpRCxnQ0FDeENDLGlCQUR3Qzs7QUFHekQsTUFBTUMsY0FBMEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlDQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUFVQyxJQUFWO0FBQVVBLGdCQUFBQSxJQUFWO0FBQUE7O0FBQ3RDQyxjQUFBQSxLQURzQyxHQUNIRCxJQURHLENBQ3pDLENBRHlDLEdBQzVCRSxPQUQ0QixHQUNIRixJQURHLENBQy9CLENBRCtCLEdBQ2hCRyxRQURnQixHQUNISCxJQURHLENBQ25CLENBRG1CO0FBQUE7QUFBQTtBQUFBLHFCQUl4QkwsTUFBTSxDQUFDTSxLQUFELEVBQVFDLE9BQVIsQ0FKa0I7O0FBQUE7QUFJekNFLGNBQUFBLFFBSnlDOztBQUFBLG9CQU0zQyxPQUFPRCxRQUFQLEtBQW9CLFVBTnVCO0FBQUE7QUFBQTtBQUFBOztBQUFBLCtDQU90Q0EsUUFBUSxDQUFDLElBQUQsRUFBT0MsUUFBUCxDQVA4Qjs7QUFBQTtBQUFBLCtDQVV4Q0EsUUFWd0M7O0FBQUE7QUFBQTtBQUFBO0FBQUEseUNBWXZDQyxPQVp1QyxFQVl2Q0EsT0FadUMsNkJBWTdCLEVBWjZCO0FBYXpDQyxjQUFBQSxjQWJ5QyxHQWF4QkQsT0FBTyxDQUFDRSxLQUFSLENBQWMsY0FBZCxDQWJ3QixFQWFPOztBQUt0RCxrQkFBSUQsY0FBSixFQUFvQjtBQUNQRSxnQkFBQUEsU0FETyxHQUNPRixjQURQLENBQ1YsQ0FEVTtBQUVsQkcsZ0JBQUFBLFVBQVUsR0FBR0MsUUFBUSxDQUFDRixTQUFELEVBQVksRUFBWixDQUFyQjtBQUNBRyxnQkFBQUEsYUFBYSxHQUFHbEIsb0JBQW9CLENBQUNnQixVQUFELENBQXBDO0FBQ0Q7O0FBdEI4QyxtQkF3QjNDRSxhQXhCMkM7QUFBQTtBQUFBO0FBQUE7O0FBeUJ2Q0MsY0FBQUEsYUF6QnVDLEdBeUJ2QlAsT0FBTyxDQUFDUSxLQUFSLENBQWMsQ0FBZCxFQUFpQkMsSUFBakIsRUF6QnVCLEVBeUJFOztBQUN6Q0MsY0FBQUEsSUExQnVDLEdBMEJoQ0gsYUFBYSxJQUFJRCxhQTFCZTtBQTJCdkNQLGNBQUFBLFNBM0J1QyxHQTJCNUI7QUFBRVcsZ0JBQUFBLElBQUksRUFBSkEsSUFBRjtBQUFRTixnQkFBQUEsVUFBVSxFQUFWQTtBQUFSLGVBM0I0QjtBQTZCN0NaLGNBQUFBLE1BQU0sQ0FBQ21CLElBQVAsdUJBQTJCUCxVQUEzQixpQkFBMkNFLGFBQTNDLGtCQUE4REMsYUFBYSxJQUFJLEVBQS9FOztBQTdCNkMsb0JBK0J6QyxPQUFPVCxRQUFQLEtBQW9CLFVBL0JxQjtBQUFBO0FBQUE7QUFBQTs7QUFBQSwrQ0FnQ3BDQSxRQUFRLENBQUMsSUFBRCxFQUFPQyxTQUFQLENBaEM0Qjs7QUFBQTtBQUFBLCtDQW1DdENBLFNBbkNzQzs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUg7O0FBQUEsb0JBQTFDTCxjQUEwQztBQUFBO0FBQUE7QUFBQSxLQUFoRDs7QUEwQ0EsU0FBT0EsY0FBUDtBQUNELENBOUNNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cEVycm9ycywgTGlrZUFQSUdhdGV3YXlQcm94eUhhbmRsZXIgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBudWxsTG9nZ2VyIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG4vLyBTdXBwb3J0aW5nIHRoZSBzYW1lIHN0YXR1cyBjb2RlcyB0aGF0IFNlcnZlcmxlc3MgRnJhbWV3b3JrIHN1cHBvcnRzXG4vLyBodHRwczovL3NlcnZlcmxlc3MuY29tL2ZyYW1ld29yay9kb2NzL3Byb3ZpZGVycy9hd3MvZXZlbnRzL2FwaWdhdGV3YXkjYXZhaWxhYmxlLXN0YXR1cy1jb2Rlc1xuY29uc3QgYXZhaWxhYmxlU3RhdHVzQ29kZXMgPSB7XG4gIDQwMDogJ0JhZCBSZXF1ZXN0JyxcbiAgNDAxOiAnVW5hdXRob3JpemVkJyxcbiAgNDAzOiAnRm9yYmlkZGVuJyxcbiAgNDA0OiAnTm90IEZvdW5kJyxcbiAgNDIyOiAnVW5wcm9jZXNzYWJsZSBFbnRpdHknLFxuICA1MDA6ICdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InLFxuICA1MDI6ICdCYWQgR2F0ZXdheScsXG4gIDUwNDogJ0dhdGV3YXkgVGltZW91dCcsXG59O1xuXG5leHBvcnQgY29uc3QgaHR0cEVycm9yczogSHR0cEVycm9ycyA9ICh0YXJnZXQsIG9wdGlvbnMpID0+IHtcbiAgY29uc3QgeyBsb2dnZXIgPSBudWxsTG9nZ2VyIH0gPSBvcHRpb25zO1xuXG4gIGNvbnN0IHdyYXBwZWRIYW5kbGVyOiBMaWtlQVBJR2F0ZXdheVByb3h5SGFuZGxlciA9IGFzeW5jICguLi5hcmdzKSA9PiB7XG4gICAgY29uc3QgeyAwOiBldmVudCwgMTogY29udGV4dCwgMjogY2FsbGJhY2sgfSA9IGFyZ3M7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0YXJnZXQoZXZlbnQsIGNvbnRleHQpO1xuXG4gICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnN0IHsgbWVzc2FnZSA9ICcnIH0gPSBlcnI7XG4gICAgICBjb25zdCBmb3VuZEVycm9yQ29kZSA9IG1lc3NhZ2UubWF0Y2goL15cXFsoXFxkezN9KVxcXS8pOyAvLyBlLmcuIFwiWzQwNF0gTm90IEZvdW5kXCIgLT4gXCI0MDRcIlxuXG4gICAgICBsZXQgc3RhdHVzQ29kZTogbnVtYmVyO1xuICAgICAgbGV0IHN0YXR1c01lc3NhZ2U6IHN0cmluZztcblxuICAgICAgaWYgKGZvdW5kRXJyb3JDb2RlKSB7XG4gICAgICAgIGNvbnN0IHsgMTogZXJyb3JDb2RlIH0gPSBmb3VuZEVycm9yQ29kZTtcbiAgICAgICAgc3RhdHVzQ29kZSA9IHBhcnNlSW50KGVycm9yQ29kZSwgMTApO1xuICAgICAgICBzdGF0dXNNZXNzYWdlID0gYXZhaWxhYmxlU3RhdHVzQ29kZXNbc3RhdHVzQ29kZV07XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0dXNNZXNzYWdlKSB7XG4gICAgICAgIGNvbnN0IGN1c3RvbU1lc3NhZ2UgPSBtZXNzYWdlLnNsaWNlKDUpLnRyaW0oKTsgLy8gZS5nLiBcIls0MDRdIE5vdCBGb3VuZFwiIC0+IFwiTm90IEZvdW5kXCJcbiAgICAgICAgY29uc3QgYm9keSA9IGN1c3RvbU1lc3NhZ2UgfHwgc3RhdHVzTWVzc2FnZTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB7IGJvZHksIHN0YXR1c0NvZGUgfTtcblxuICAgICAgICBsb2dnZXIuaW5mbyhgaHR0cEVycm9yOiBbJHtzdGF0dXNDb2RlfV0gXCIke3N0YXR1c01lc3NhZ2V9XCIgXCIke2N1c3RvbU1lc3NhZ2UgfHwgJyd9XCJgKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gd3JhcHBlZEhhbmRsZXI7XG59O1xuIl19