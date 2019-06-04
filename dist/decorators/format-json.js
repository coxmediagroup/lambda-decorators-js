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

              event = args[0], context = args[1];
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

              return _context.abrupt("return", response);

            case 7:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL2Zvcm1hdC1qc29uLnRzIl0sIm5hbWVzIjpbImZvcm1hdEpTT04iLCJ0YXJnZXQiLCJvcHRpb25zIiwiZW5hYmxlZCIsImxvZ2dlciIsIm51bGxMb2dnZXIiLCJyZXBsYWNlciIsInJldml2ZXIiLCJzcGFjaW5nIiwid3JhcHBlZEhhbmRsZXIiLCJhcmdzIiwiZXZlbnQiLCJjb250ZXh0IiwicmVzcG9uc2UiLCJib2R5IiwicGFyc2VkIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwiZXJyIiwid2FybiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBOztBQUVPLElBQU1BLFVBQXNCLEdBQUcsU0FBekJBLFVBQXlCLENBQUNDLE1BQUQsRUFBMEI7QUFBQSxNQUFqQkMsT0FBaUIsdUVBQVAsRUFBTztBQUFBLHlCQU8xREEsT0FQMEQsQ0FFNURDLE9BRjREO0FBQUEsTUFFNURBLE9BRjRELGlDQUVsRCxJQUZrRDtBQUFBLHdCQU8xREQsT0FQMEQsQ0FHNURFLE1BSDREO0FBQUEsTUFHNURBLE1BSDRELGdDQUduREMsaUJBSG1EO0FBQUEsMEJBTzFESCxPQVAwRCxDQUk1REksUUFKNEQ7QUFBQSxNQUk1REEsUUFKNEQsa0NBSWpELElBSmlEO0FBQUEseUJBTzFESixPQVAwRCxDQUs1REssT0FMNEQ7QUFBQSxNQUs1REEsT0FMNEQsaUNBS2xELElBTGtEO0FBQUEseUJBTzFETCxPQVAwRCxDQU01RE0sT0FONEQ7QUFBQSxNQU01REEsT0FONEQsaUNBTWxELENBTmtEOztBQVE5RCxNQUFNQyxjQUEwQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUNBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQVVDLElBQVY7QUFBVUEsZ0JBQUFBLElBQVY7QUFBQTs7QUFDdENDLGNBQUFBLEtBRHNDLEdBQ2hCRCxJQURnQixDQUN6QyxDQUR5QyxHQUM1QkUsT0FENEIsR0FDaEJGLElBRGdCLENBQy9CLENBRCtCO0FBQUE7QUFBQSxxQkFHMUJULE1BQU0sQ0FBQ1UsS0FBRCxFQUFRQyxPQUFSLENBSG9COztBQUFBO0FBRzNDQyxjQUFBQSxRQUgyQzs7QUFLakQsa0JBQUlWLE9BQU8sSUFBSSxPQUFPVSxRQUFRLENBQUNDLElBQWhCLEtBQXlCLFFBQXhDLEVBQWtEO0FBQ2hELG9CQUFJO0FBQ0lDLGtCQUFBQSxNQURKLEdBQ2FDLElBQUksQ0FBQ0MsS0FBTCxDQUFXSixRQUFRLENBQUNDLElBQXBCLEVBQTBCUCxPQUExQixDQURiO0FBRUZNLGtCQUFBQSxRQUFRLENBQUNDLElBQVQsR0FBZ0JFLElBQUksQ0FBQ0UsU0FBTCxDQUFlSCxNQUFmLEVBQXVCVCxRQUF2QixFQUFpQ0UsT0FBakMsQ0FBaEI7QUFDRCxpQkFIRCxDQUdFLE9BQU9XLEdBQVAsRUFBWTtBQUNaZixrQkFBQUEsTUFBTSxDQUFDZ0IsSUFBUCxDQUFZRCxHQUFaO0FBQ0Q7QUFDRjs7QUFaZ0QsK0NBYTFDTixRQWIwQzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFIOztBQUFBLG9CQUExQ0osY0FBMEM7QUFBQTtBQUFBO0FBQUEsS0FBaEQ7O0FBZ0JBLFNBQU9BLGNBQVA7QUFDRCxDQXpCTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1hdEpTT04sIExpa2VBUElHYXRld2F5UHJveHlIYW5kbGVyIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgbnVsbExvZ2dlciB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGNvbnN0IGZvcm1hdEpTT046IEZvcm1hdEpTT04gPSAodGFyZ2V0LCBvcHRpb25zID0ge30pID0+IHtcbiAgY29uc3Qge1xuICAgIGVuYWJsZWQgPSB0cnVlLFxuICAgIGxvZ2dlciA9IG51bGxMb2dnZXIsXG4gICAgcmVwbGFjZXIgPSBudWxsLFxuICAgIHJldml2ZXIgPSBudWxsLFxuICAgIHNwYWNpbmcgPSAwLFxuICB9ID0gb3B0aW9ucztcbiAgY29uc3Qgd3JhcHBlZEhhbmRsZXI6IExpa2VBUElHYXRld2F5UHJveHlIYW5kbGVyID0gYXN5bmMgKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCB7IDA6IGV2ZW50LCAxOiBjb250ZXh0IH0gPSBhcmdzO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0YXJnZXQoZXZlbnQsIGNvbnRleHQpO1xuXG4gICAgaWYgKGVuYWJsZWQgJiYgdHlwZW9mIHJlc3BvbnNlLmJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmJvZHksIHJldml2ZXIpO1xuICAgICAgICByZXNwb25zZS5ib2R5ID0gSlNPTi5zdHJpbmdpZnkocGFyc2VkLCByZXBsYWNlciwgc3BhY2luZyk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLndhcm4oZXJyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9O1xuXG4gIHJldHVybiB3cmFwcGVkSGFuZGxlcjtcbn07XG4iXX0=