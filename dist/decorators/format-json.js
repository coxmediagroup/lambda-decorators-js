"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatJSON = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _utils = require("../utils");

var formatJSON = function formatJSON(target) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$enabled = options.enabled,
      enabled = _options$enabled === void 0 ? true : _options$enabled,
      _options$logger = options.logger,
      logger = _options$logger === void 0 ? _utils.nullLogger : _options$logger,
      _options$replacer = options.replacer,
      replacer = _options$replacer === void 0 ? null : _options$replacer,
      _options$reviver = options.reviver,
      reviver = _options$reviver === void 0 ? null : _options$reviver,
      _options$spacing = options.spacing,
      spacing = _options$spacing === void 0 ? 0 : _options$spacing;

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
          parsed,
          _args = arguments;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = _args[_key];
              }

              event = args[0], context = args[1], callback = args[2];
              _context.next = 4;
              return target(event, context);

            case 4:
              response = _context.sent;

              if (enabled && typeof response.body === 'string') {
                try {
                  parsed = JSON.parse(response.body, reviver);
                  response.body = JSON.stringify(parsed, replacer, spacing);
                } catch (err) {
                  logger.warn(err);
                }
              }

              if (!(typeof callback === 'function')) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", callback(null, response));

            case 8:
              return _context.abrupt("return", response);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function wrappedHandler() {
      return _ref.apply(this, arguments);
    };
  }();

  return wrappedHandler;
};

exports.formatJSON = formatJSON;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL2Zvcm1hdC1qc29uLnRzIl0sIm5hbWVzIjpbImZvcm1hdEpTT04iLCJ0YXJnZXQiLCJvcHRpb25zIiwiZW5hYmxlZCIsImxvZ2dlciIsIm51bGxMb2dnZXIiLCJyZXBsYWNlciIsInJldml2ZXIiLCJzcGFjaW5nIiwid3JhcHBlZEhhbmRsZXIiLCJhcmdzIiwiZXZlbnQiLCJjb250ZXh0IiwiY2FsbGJhY2siLCJyZXNwb25zZSIsImJvZHkiLCJwYXJzZWQiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJlcnIiLCJ3YXJuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBRU8sSUFBTUEsVUFBc0IsR0FBRyxTQUF6QkEsVUFBeUIsQ0FBQ0MsTUFBRCxFQUEwQjtBQUFBLE1BQWpCQyxPQUFpQix1RUFBUCxFQUFPO0FBQUEseUJBTzFEQSxPQVAwRCxDQUU1REMsT0FGNEQ7QUFBQSxNQUU1REEsT0FGNEQsaUNBRWxELElBRmtEO0FBQUEsd0JBTzFERCxPQVAwRCxDQUc1REUsTUFINEQ7QUFBQSxNQUc1REEsTUFINEQsZ0NBR25EQyxpQkFIbUQ7QUFBQSwwQkFPMURILE9BUDBELENBSTVESSxRQUo0RDtBQUFBLE1BSTVEQSxRQUo0RCxrQ0FJakQsSUFKaUQ7QUFBQSx5QkFPMURKLE9BUDBELENBSzVESyxPQUw0RDtBQUFBLE1BSzVEQSxPQUw0RCxpQ0FLbEQsSUFMa0Q7QUFBQSx5QkFPMURMLE9BUDBELENBTTVETSxPQU40RDtBQUFBLE1BTTVEQSxPQU40RCxpQ0FNbEQsQ0FOa0Q7O0FBUTlELE1BQU1DLGNBQTBDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQ0FBRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUFVQyxJQUFWO0FBQVVBLGdCQUFBQSxJQUFWO0FBQUE7O0FBQ3RDQyxjQUFBQSxLQURzQyxHQUNIRCxJQURHLENBQ3pDLENBRHlDLEdBQzVCRSxPQUQ0QixHQUNIRixJQURHLENBQy9CLENBRCtCLEdBQ2hCRyxRQURnQixHQUNISCxJQURHLENBQ25CLENBRG1CO0FBQUE7QUFBQSxxQkFHMUJULE1BQU0sQ0FBQ1UsS0FBRCxFQUFRQyxPQUFSLENBSG9COztBQUFBO0FBRzNDRSxjQUFBQSxRQUgyQzs7QUFLakQsa0JBQUlYLE9BQU8sSUFBSSxPQUFPVyxRQUFRLENBQUNDLElBQWhCLEtBQXlCLFFBQXhDLEVBQWtEO0FBQ2hELG9CQUFJO0FBQ0lDLGtCQUFBQSxNQURKLEdBQ2FDLElBQUksQ0FBQ0MsS0FBTCxDQUFXSixRQUFRLENBQUNDLElBQXBCLEVBQTBCUixPQUExQixDQURiO0FBRUZPLGtCQUFBQSxRQUFRLENBQUNDLElBQVQsR0FBZ0JFLElBQUksQ0FBQ0UsU0FBTCxDQUFlSCxNQUFmLEVBQXVCVixRQUF2QixFQUFpQ0UsT0FBakMsQ0FBaEI7QUFDRCxpQkFIRCxDQUdFLE9BQU9ZLEdBQVAsRUFBWTtBQUNaaEIsa0JBQUFBLE1BQU0sQ0FBQ2lCLElBQVAsQ0FBWUQsR0FBWjtBQUNEO0FBQ0Y7O0FBWmdELG9CQWM3QyxPQUFPUCxRQUFQLEtBQW9CLFVBZHlCO0FBQUE7QUFBQTtBQUFBOztBQUFBLCtDQWV4Q0EsUUFBUSxDQUFDLElBQUQsRUFBT0MsUUFBUCxDQWZnQzs7QUFBQTtBQUFBLCtDQWtCMUNBLFFBbEIwQzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFIOztBQUFBLG9CQUExQ0wsY0FBMEM7QUFBQTtBQUFBO0FBQUEsS0FBaEQ7O0FBcUJBLFNBQU9BLGNBQVA7QUFDRCxDQTlCTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1hdEpTT04sIExpa2VBUElHYXRld2F5UHJveHlIYW5kbGVyIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgbnVsbExvZ2dlciB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGNvbnN0IGZvcm1hdEpTT046IEZvcm1hdEpTT04gPSAodGFyZ2V0LCBvcHRpb25zID0ge30pID0+IHtcbiAgY29uc3Qge1xuICAgIGVuYWJsZWQgPSB0cnVlLFxuICAgIGxvZ2dlciA9IG51bGxMb2dnZXIsXG4gICAgcmVwbGFjZXIgPSBudWxsLFxuICAgIHJldml2ZXIgPSBudWxsLFxuICAgIHNwYWNpbmcgPSAwLFxuICB9ID0gb3B0aW9ucztcbiAgY29uc3Qgd3JhcHBlZEhhbmRsZXI6IExpa2VBUElHYXRld2F5UHJveHlIYW5kbGVyID0gYXN5bmMgKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCB7IDA6IGV2ZW50LCAxOiBjb250ZXh0LCAyOiBjYWxsYmFjayB9ID0gYXJncztcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGFyZ2V0KGV2ZW50LCBjb250ZXh0KTtcblxuICAgIGlmIChlbmFibGVkICYmIHR5cGVvZiByZXNwb25zZS5ib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGFyc2VkID0gSlNPTi5wYXJzZShyZXNwb25zZS5ib2R5LCByZXZpdmVyKTtcbiAgICAgICAgcmVzcG9uc2UuYm9keSA9IEpTT04uc3RyaW5naWZ5KHBhcnNlZCwgcmVwbGFjZXIsIHNwYWNpbmcpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci53YXJuKGVycik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH07XG5cbiAgcmV0dXJuIHdyYXBwZWRIYW5kbGVyO1xufTtcbiJdfQ==