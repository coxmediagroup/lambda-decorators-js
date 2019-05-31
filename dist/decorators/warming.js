"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warming = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _utils = require("../utils");

var defaultPayloadCheck = function defaultPayloadCheck(_ref) {
  var _ref$source = _ref.source,
      source = _ref$source === void 0 ? '' : _ref$source;
  return source === 'serverless-plugin-warmup';
};

var warming = function warming(targetHandler) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$eventPayload = options.eventPayloadCheck,
      eventPayloadCheck = _options$eventPayload === void 0 ? defaultPayloadCheck : _options$eventPayload,
      _options$logger = options.logger,
      logger = _options$logger === void 0 ? _utils.nullLogger : _options$logger;

  var wrappedHandler =
  /*#__PURE__*/
  function () {
    var _ref2 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee() {
      var _len,
          args,
          _key,
          _args$,
          event,
          context,
          callback,
          _response,
          response,
          _args = arguments;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = _args[_key];
              }

              _args$ = args[0], event = _args$ === void 0 ? {} : _args$, context = args[1], callback = args[2];

              if (!eventPayloadCheck(event)) {
                _context.next = 8;
                break;
              }

              _response = {
                body: 'Accepted',
                statusCode: 202
              };
              logger.info('Warming event found. Exiting early.');

              if (!(typeof callback === 'function')) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", callback(null, _response));

            case 7:
              return _context.abrupt("return", _response);

            case 8:
              _context.next = 10;
              return targetHandler(event, context);

            case 10:
              response = _context.sent;

              if (!(typeof callback === 'function')) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return", callback(null, response));

            case 13:
              return _context.abrupt("return", response);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function wrappedHandler() {
      return _ref2.apply(this, arguments);
    };
  }();

  return wrappedHandler;
};

exports.warming = warming;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL3dhcm1pbmcudHMiXSwibmFtZXMiOlsiZGVmYXVsdFBheWxvYWRDaGVjayIsInNvdXJjZSIsIndhcm1pbmciLCJ0YXJnZXRIYW5kbGVyIiwib3B0aW9ucyIsImV2ZW50UGF5bG9hZENoZWNrIiwibG9nZ2VyIiwibnVsbExvZ2dlciIsIndyYXBwZWRIYW5kbGVyIiwiYXJncyIsImV2ZW50IiwiY29udGV4dCIsImNhbGxiYWNrIiwicmVzcG9uc2UiLCJib2R5Iiwic3RhdHVzQ29kZSIsImluZm8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQTs7QUFFQSxJQUFNQSxtQkFBbUIsR0FBRyxTQUF0QkEsbUJBQXNCLE9BQXFCO0FBQUEseUJBQWxCQyxNQUFrQjtBQUFBLE1BQWxCQSxNQUFrQiw0QkFBVCxFQUFTO0FBQy9DLFNBQU9BLE1BQU0sS0FBSywwQkFBbEI7QUFDRCxDQUZEOztBQUlPLElBQU1DLE9BQWdCLEdBQUcsU0FBbkJBLE9BQW1CLENBQUNDLGFBQUQsRUFBaUM7QUFBQSxNQUFqQkMsT0FBaUIsdUVBQVAsRUFBTztBQUFBLDhCQUNVQSxPQURWLENBQ3ZEQyxpQkFEdUQ7QUFBQSxNQUN2REEsaUJBRHVELHNDQUNuQ0wsbUJBRG1DO0FBQUEsd0JBQ1VJLE9BRFYsQ0FDZEUsTUFEYztBQUFBLE1BQ2RBLE1BRGMsZ0NBQ0xDLGlCQURLOztBQUcvRCxNQUFNQyxjQUEwQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUNBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUFVQyxJQUFWO0FBQVVBLGdCQUFBQSxJQUFWO0FBQUE7O0FBQUEsdUJBQ0VBLElBREYsQ0FDekMsQ0FEeUMsR0FDdENDLEtBRHNDLHVCQUM5QixFQUQ4QixXQUN2QkMsT0FEdUIsR0FDRUYsSUFERixDQUMxQixDQUQwQixHQUNYRyxRQURXLEdBQ0VILElBREYsQ0FDZCxDQURjOztBQUFBLG1CQUc3Q0osaUJBQWlCLENBQUNLLEtBQUQsQ0FINEI7QUFBQTtBQUFBO0FBQUE7O0FBSXpDRyxjQUFBQSxTQUp5QyxHQUk5QjtBQUFFQyxnQkFBQUEsSUFBSSxFQUFFLFVBQVI7QUFBb0JDLGdCQUFBQSxVQUFVLEVBQUU7QUFBaEMsZUFKOEI7QUFNL0NULGNBQUFBLE1BQU0sQ0FBQ1UsSUFBUCxDQUFZLHFDQUFaOztBQU4rQyxvQkFRM0MsT0FBT0osUUFBUCxLQUFvQixVQVJ1QjtBQUFBO0FBQUE7QUFBQTs7QUFBQSwrQ0FTdENBLFFBQVEsQ0FBQyxJQUFELEVBQU9DLFNBQVAsQ0FUOEI7O0FBQUE7QUFBQSwrQ0FZeENBLFNBWndDOztBQUFBO0FBQUE7QUFBQSxxQkFlMUJWLGFBQWEsQ0FBQ08sS0FBRCxFQUFRQyxPQUFSLENBZmE7O0FBQUE7QUFlM0NFLGNBQUFBLFFBZjJDOztBQUFBLG9CQWlCN0MsT0FBT0QsUUFBUCxLQUFvQixVQWpCeUI7QUFBQTtBQUFBO0FBQUE7O0FBQUEsK0NBa0J4Q0EsUUFBUSxDQUFDLElBQUQsRUFBT0MsUUFBUCxDQWxCZ0M7O0FBQUE7QUFBQSwrQ0FxQjFDQSxRQXJCMEM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBSDs7QUFBQSxvQkFBMUNMLGNBQTBDO0FBQUE7QUFBQTtBQUFBLEtBQWhEOztBQXdCQSxTQUFPQSxjQUFQO0FBQ0QsQ0E1Qk0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaWtlQVBJR2F0ZXdheVByb3h5SGFuZGxlciwgV2FybWluZyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IG51bGxMb2dnZXIgfSBmcm9tICcuLi91dGlscyc7XG5cbmNvbnN0IGRlZmF1bHRQYXlsb2FkQ2hlY2sgPSAoeyBzb3VyY2UgPSAnJyB9KSA9PiB7XG4gIHJldHVybiBzb3VyY2UgPT09ICdzZXJ2ZXJsZXNzLXBsdWdpbi13YXJtdXAnO1xufTtcblxuZXhwb3J0IGNvbnN0IHdhcm1pbmc6IFdhcm1pbmcgPSAodGFyZ2V0SGFuZGxlciwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGNvbnN0IHsgZXZlbnRQYXlsb2FkQ2hlY2sgPSBkZWZhdWx0UGF5bG9hZENoZWNrLCBsb2dnZXIgPSBudWxsTG9nZ2VyIH0gPSBvcHRpb25zO1xuXG4gIGNvbnN0IHdyYXBwZWRIYW5kbGVyOiBMaWtlQVBJR2F0ZXdheVByb3h5SGFuZGxlciA9IGFzeW5jICguLi5hcmdzKSA9PiB7XG4gICAgY29uc3QgeyAwOiBldmVudCA9IHt9LCAxOiBjb250ZXh0LCAyOiBjYWxsYmFjayB9ID0gYXJncztcblxuICAgIGlmIChldmVudFBheWxvYWRDaGVjayhldmVudCkpIHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0geyBib2R5OiAnQWNjZXB0ZWQnLCBzdGF0dXNDb2RlOiAyMDIgfTtcblxuICAgICAgbG9nZ2VyLmluZm8oJ1dhcm1pbmcgZXZlbnQgZm91bmQuIEV4aXRpbmcgZWFybHkuJyk7XG5cbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGFyZ2V0SGFuZGxlcihldmVudCwgY29udGV4dCk7XG5cbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UpO1xuICAgIH1cblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfTtcblxuICByZXR1cm4gd3JhcHBlZEhhbmRsZXI7XG59O1xuIl19