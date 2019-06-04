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

              _args$ = args[0], event = _args$ === void 0 ? {} : _args$, context = args[1];

              if (!eventPayloadCheck(event)) {
                _context.next = 6;
                break;
              }

              _response = {
                body: 'Accepted',
                statusCode: 202
              };
              logger.info('Warming event found. Exiting early.');
              return _context.abrupt("return", _response);

            case 6:
              _context.next = 8;
              return targetHandler(event, context);

            case 8:
              response = _context.sent;
              return _context.abrupt("return", response);

            case 10:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL3dhcm1pbmcudHMiXSwibmFtZXMiOlsiZGVmYXVsdFBheWxvYWRDaGVjayIsInNvdXJjZSIsIndhcm1pbmciLCJ0YXJnZXRIYW5kbGVyIiwib3B0aW9ucyIsImV2ZW50UGF5bG9hZENoZWNrIiwibG9nZ2VyIiwibnVsbExvZ2dlciIsIndyYXBwZWRIYW5kbGVyIiwiYXJncyIsImV2ZW50IiwiY29udGV4dCIsInJlc3BvbnNlIiwiYm9keSIsInN0YXR1c0NvZGUiLCJpbmZvIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBRUEsSUFBTUEsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFzQixPQUFxQjtBQUFBLHlCQUFsQkMsTUFBa0I7QUFBQSxNQUFsQkEsTUFBa0IsNEJBQVQsRUFBUztBQUMvQyxTQUFPQSxNQUFNLEtBQUssMEJBQWxCO0FBQ0QsQ0FGRDs7QUFJTyxJQUFNQyxPQUFnQixHQUFHLFNBQW5CQSxPQUFtQixDQUFDQyxhQUFELEVBQStCO0FBQUEsTUFBZkMsT0FBZSx1RUFBUCxFQUFPO0FBQUEsOEJBQ1lBLE9BRFosQ0FDckRDLGlCQURxRDtBQUFBLE1BQ3JEQSxpQkFEcUQsc0NBQ2pDTCxtQkFEaUM7QUFBQSx3QkFDWUksT0FEWixDQUNaRSxNQURZO0FBQUEsTUFDWkEsTUFEWSxnQ0FDSEMsaUJBREc7O0FBRzdELE1BQU1DLGNBQTBDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQ0FBRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUFVQyxJQUFWO0FBQVVBLGdCQUFBQSxJQUFWO0FBQUE7O0FBQUEsdUJBQ1hBLElBRFcsQ0FDekMsQ0FEeUMsR0FDdENDLEtBRHNDLHVCQUM5QixFQUQ4QixXQUN2QkMsT0FEdUIsR0FDWEYsSUFEVyxDQUMxQixDQUQwQjs7QUFBQSxtQkFHN0NKLGlCQUFpQixDQUFDSyxLQUFELENBSDRCO0FBQUE7QUFBQTtBQUFBOztBQUl6Q0UsY0FBQUEsU0FKeUMsR0FJOUI7QUFBRUMsZ0JBQUFBLElBQUksRUFBRSxVQUFSO0FBQW9CQyxnQkFBQUEsVUFBVSxFQUFFO0FBQWhDLGVBSjhCO0FBSy9DUixjQUFBQSxNQUFNLENBQUNTLElBQVAsQ0FBWSxxQ0FBWjtBQUwrQywrQ0FNeENILFNBTndDOztBQUFBO0FBQUE7QUFBQSxxQkFTMUJULGFBQWEsQ0FBQ08sS0FBRCxFQUFRQyxPQUFSLENBVGE7O0FBQUE7QUFTM0NDLGNBQUFBLFFBVDJDO0FBQUEsK0NBVTFDQSxRQVYwQzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFIOztBQUFBLG9CQUExQ0osY0FBMEM7QUFBQTtBQUFBO0FBQUEsS0FBaEQ7O0FBYUEsU0FBT0EsY0FBUDtBQUNELENBakJNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGlrZUFQSUdhdGV3YXlQcm94eUhhbmRsZXIsIFdhcm1pbmcgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBudWxsTG9nZ2VyIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5jb25zdCBkZWZhdWx0UGF5bG9hZENoZWNrID0gKHsgc291cmNlID0gJycgfSkgPT4ge1xuICByZXR1cm4gc291cmNlID09PSAnc2VydmVybGVzcy1wbHVnaW4td2FybXVwJztcbn07XG5cbmV4cG9ydCBjb25zdCB3YXJtaW5nOiBXYXJtaW5nID0gKHRhcmdldEhhbmRsZXIsIG9wdGlvbnM9e30pID0+IHtcbiAgY29uc3QgeyBldmVudFBheWxvYWRDaGVjayA9IGRlZmF1bHRQYXlsb2FkQ2hlY2ssIGxvZ2dlciA9IG51bGxMb2dnZXIgfSA9IG9wdGlvbnM7XG5cbiAgY29uc3Qgd3JhcHBlZEhhbmRsZXI6IExpa2VBUElHYXRld2F5UHJveHlIYW5kbGVyID0gYXN5bmMgKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCB7IDA6IGV2ZW50ID0ge30sIDE6IGNvbnRleHQgfSA9IGFyZ3M7XG5cbiAgICBpZiAoZXZlbnRQYXlsb2FkQ2hlY2soZXZlbnQpKSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IHsgYm9keTogJ0FjY2VwdGVkJywgc3RhdHVzQ29kZTogMjAyIH07XG4gICAgICBsb2dnZXIuaW5mbygnV2FybWluZyBldmVudCBmb3VuZC4gRXhpdGluZyBlYXJseS4nKTtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRhcmdldEhhbmRsZXIoZXZlbnQsIGNvbnRleHQpO1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfTtcblxuICByZXR1cm4gd3JhcHBlZEhhbmRsZXI7XG59O1xuIl19