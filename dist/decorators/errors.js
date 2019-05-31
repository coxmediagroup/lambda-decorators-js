"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errors = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _utils = require("../utils");

var errors = function errors(target) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$body = options.body,
      body = _options$body === void 0 ? 'Internal Server Error' : _options$body,
      _options$logger = options.logger,
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
          callbackproxy,
          _args = arguments;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = _args[_key];
              }

              event = args[0], context = args[1], callback = args[2];
              response = {
                body: body,
                statusCode: 500
              };

              callbackproxy = function callbackproxy(errors, result) {
                if (errors) {
                  logger.error(errors);
                  callback(null, response);
                } else {
                  callback(null, result);
                }
              };

              if (!(typeof callback === 'function')) {
                _context.next = 15;
                break;
              }

              _context.prev = 5;
              _context.next = 8;
              return target(event, context, callbackproxy);

            case 8:
              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](5);
              callbackproxy(_context.t0);

            case 13:
              _context.next = 25;
              break;

            case 15:
              _context.prev = 15;
              _context.next = 18;
              return target(event, context);

            case 18:
              return _context.abrupt("return", _context.sent);

            case 21:
              _context.prev = 21;
              _context.t1 = _context["catch"](15);
              logger.error(_context.t1);
              return _context.abrupt("return", response);

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[5, 10], [15, 21]]);
    }));

    return function wrappedHandler() {
      return _ref.apply(this, arguments);
    };
  }();

  return wrappedHandler;
};

exports.errors = errors;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL2Vycm9ycy50cyJdLCJuYW1lcyI6WyJlcnJvcnMiLCJ0YXJnZXQiLCJvcHRpb25zIiwiYm9keSIsImxvZ2dlciIsIm51bGxMb2dnZXIiLCJ3cmFwcGVkSGFuZGxlciIsImFyZ3MiLCJldmVudCIsImNvbnRleHQiLCJjYWxsYmFjayIsInJlc3BvbnNlIiwic3RhdHVzQ29kZSIsImNhbGxiYWNrcHJveHkiLCJyZXN1bHQiLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUVBOztBQUVPLElBQU1BLE1BQWMsR0FBRyxTQUFqQkEsTUFBaUIsQ0FBQ0MsTUFBRCxFQUEwQjtBQUFBLE1BQWpCQyxPQUFpQix1RUFBUCxFQUFPO0FBQUEsc0JBQ1VBLE9BRFYsQ0FDOUNDLElBRDhDO0FBQUEsTUFDOUNBLElBRDhDLDhCQUN2Qyx1QkFEdUM7QUFBQSx3QkFDVUQsT0FEVixDQUNkRSxNQURjO0FBQUEsTUFDZEEsTUFEYyxnQ0FDTEMsaUJBREs7O0FBR3RELE1BQU1DLGNBQTBDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQ0FBRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUFVQyxJQUFWO0FBQVVBLGdCQUFBQSxJQUFWO0FBQUE7O0FBQ3RDQyxjQUFBQSxLQURzQyxHQUNIRCxJQURHLENBQ3pDLENBRHlDLEdBQzVCRSxPQUQ0QixHQUNIRixJQURHLENBQy9CLENBRCtCLEdBQ2hCRyxRQURnQixHQUNISCxJQURHLENBQ25CLENBRG1CO0FBRzNDSSxjQUFBQSxRQUgyQyxHQUdoQztBQUFFUixnQkFBQUEsSUFBSSxFQUFKQSxJQUFGO0FBQVFTLGdCQUFBQSxVQUFVLEVBQUU7QUFBcEIsZUFIZ0M7O0FBSzNDQyxjQUFBQSxhQUwyQyxHQUtqQixTQUExQkEsYUFBMEIsQ0FBQ2IsTUFBRCxFQUFTYyxNQUFULEVBQW9CO0FBQ2xELG9CQUFJZCxNQUFKLEVBQVk7QUFDVkksa0JBQUFBLE1BQU0sQ0FBQ1csS0FBUCxDQUFhZixNQUFiO0FBQ0FVLGtCQUFBQSxRQUFRLENBQUMsSUFBRCxFQUFPQyxRQUFQLENBQVI7QUFDRCxpQkFIRCxNQUdPO0FBQ0xELGtCQUFBQSxRQUFRLENBQUMsSUFBRCxFQUFPSSxNQUFQLENBQVI7QUFDRDtBQUNGLGVBWmdEOztBQUFBLG9CQWM3QyxPQUFPSixRQUFQLEtBQW9CLFVBZHlCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxxQkFnQnZDVCxNQUFNLENBQUNPLEtBQUQsRUFBUUMsT0FBUixFQUFpQkksYUFBakIsQ0FoQmlDOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFrQjdDQSxjQUFBQSxhQUFhLGFBQWI7O0FBbEI2QztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBc0JoQ1osTUFBTSxDQUFDTyxLQUFELEVBQVFDLE9BQVIsQ0F0QjBCOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBd0I3Q0wsY0FBQUEsTUFBTSxDQUFDVyxLQUFQO0FBeEI2QywrQ0F5QnRDSixRQXpCc0M7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBSDs7QUFBQSxvQkFBMUNMLGNBQTBDO0FBQUE7QUFBQTtBQUFBLEtBQWhEOztBQThCQSxTQUFPQSxjQUFQO0FBQ0QsQ0FsQ00iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYWxsYmFjayB9IGZyb20gJ2F3cy1sYW1iZGEnO1xuaW1wb3J0IHsgRXJyb3JzLCBMaWtlQVBJR2F0ZXdheVByb3h5SGFuZGxlciB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IG51bGxMb2dnZXIgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBjb25zdCBlcnJvcnM6IEVycm9ycyA9ICh0YXJnZXQsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBjb25zdCB7IGJvZHkgPSAnSW50ZXJuYWwgU2VydmVyIEVycm9yJywgbG9nZ2VyID0gbnVsbExvZ2dlciB9ID0gb3B0aW9ucztcblxuICBjb25zdCB3cmFwcGVkSGFuZGxlcjogTGlrZUFQSUdhdGV3YXlQcm94eUhhbmRsZXIgPSBhc3luYyAoLi4uYXJncykgPT4ge1xuICAgIGNvbnN0IHsgMDogZXZlbnQsIDE6IGNvbnRleHQsIDI6IGNhbGxiYWNrIH0gPSBhcmdzO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSB7IGJvZHksIHN0YXR1c0NvZGU6IDUwMCB9O1xuXG4gICAgY29uc3QgY2FsbGJhY2twcm94eTogQ2FsbGJhY2sgPSAoZXJyb3JzLCByZXN1bHQpID0+IHtcbiAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKGVycm9ycyk7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3VsdCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHRhcmdldChldmVudCwgY29udGV4dCwgY2FsbGJhY2twcm94eSk7XG4gICAgICB9IGNhdGNoIChlcnJvcnMpIHtcbiAgICAgICAgY2FsbGJhY2twcm94eShlcnJvcnMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGFyZ2V0KGV2ZW50LCBjb250ZXh0KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9ycykge1xuICAgICAgICBsb2dnZXIuZXJyb3IoZXJyb3JzKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gd3JhcHBlZEhhbmRsZXI7XG59O1xuIl19