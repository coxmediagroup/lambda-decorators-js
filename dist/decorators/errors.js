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
          response,
          _args = arguments;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = _args[_key];
              }

              event = args[0], context = args[1];
              response = {
                body: body,
                statusCode: 500
              };
              _context.prev = 3;
              _context.next = 6;
              return target(event, context);

            case 6:
              return _context.abrupt("return", _context.sent);

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](3);
              logger.error(_context.t0);
              return _context.abrupt("return", response);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 9]]);
    }));

    return function wrappedHandler() {
      return _ref.apply(this, arguments);
    };
  }();

  return wrappedHandler;
};

exports.errors = errors;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL2Vycm9ycy50cyJdLCJuYW1lcyI6WyJlcnJvcnMiLCJ0YXJnZXQiLCJvcHRpb25zIiwiYm9keSIsImxvZ2dlciIsIm51bGxMb2dnZXIiLCJ3cmFwcGVkSGFuZGxlciIsImFyZ3MiLCJldmVudCIsImNvbnRleHQiLCJyZXNwb25zZSIsInN0YXR1c0NvZGUiLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBOztBQUVPLElBQU1BLE1BQWMsR0FBRyxTQUFqQkEsTUFBaUIsQ0FBQ0MsTUFBRCxFQUEwQjtBQUFBLE1BQWpCQyxPQUFpQix1RUFBUCxFQUFPO0FBQUEsc0JBQ1VBLE9BRFYsQ0FDOUNDLElBRDhDO0FBQUEsTUFDOUNBLElBRDhDLDhCQUN2Qyx1QkFEdUM7QUFBQSx3QkFDVUQsT0FEVixDQUNkRSxNQURjO0FBQUEsTUFDZEEsTUFEYyxnQ0FDTEMsaUJBREs7O0FBR3RELE1BQU1DLGNBQTBDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQ0FBRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQVVDLElBQVY7QUFBVUEsZ0JBQUFBLElBQVY7QUFBQTs7QUFDdENDLGNBQUFBLEtBRHNDLEdBQ2hCRCxJQURnQixDQUN6QyxDQUR5QyxHQUM1QkUsT0FENEIsR0FDaEJGLElBRGdCLENBQy9CLENBRCtCO0FBRzNDRyxjQUFBQSxRQUgyQyxHQUdoQztBQUFFUCxnQkFBQUEsSUFBSSxFQUFKQSxJQUFGO0FBQVFRLGdCQUFBQSxVQUFVLEVBQUU7QUFBcEIsZUFIZ0M7QUFBQTtBQUFBO0FBQUEscUJBS2xDVixNQUFNLENBQUNPLEtBQUQsRUFBUUMsT0FBUixDQUw0Qjs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQU8vQ0wsY0FBQUEsTUFBTSxDQUFDUSxLQUFQO0FBUCtDLCtDQVF4Q0YsUUFSd0M7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBSDs7QUFBQSxvQkFBMUNKLGNBQTBDO0FBQUE7QUFBQTtBQUFBLEtBQWhEOztBQVlBLFNBQU9BLGNBQVA7QUFDRCxDQWhCTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVycm9ycywgTGlrZUFQSUdhdGV3YXlQcm94eUhhbmRsZXIgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBudWxsTG9nZ2VyIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgY29uc3QgZXJyb3JzOiBFcnJvcnMgPSAodGFyZ2V0LCBvcHRpb25zID0ge30pID0+IHtcbiAgY29uc3QgeyBib2R5ID0gJ0ludGVybmFsIFNlcnZlciBFcnJvcicsIGxvZ2dlciA9IG51bGxMb2dnZXIgfSA9IG9wdGlvbnM7XG5cbiAgY29uc3Qgd3JhcHBlZEhhbmRsZXI6IExpa2VBUElHYXRld2F5UHJveHlIYW5kbGVyID0gYXN5bmMgKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCB7IDA6IGV2ZW50LCAxOiBjb250ZXh0IH0gPSBhcmdzO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSB7IGJvZHksIHN0YXR1c0NvZGU6IDUwMCB9O1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGFyZ2V0KGV2ZW50LCBjb250ZXh0KTtcbiAgICB9IGNhdGNoIChlcnJvcnMpIHtcbiAgICAgIGxvZ2dlci5lcnJvcihlcnJvcnMpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gd3JhcHBlZEhhbmRsZXI7XG59O1xuIl19