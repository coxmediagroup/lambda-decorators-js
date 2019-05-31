"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _errors = require("./errors");

var _utils = require("../utils");

describe('errors decorator', function () {
  var state = {}; // simple Lambda handler that can throw errors based on the test state

  var mockHandler =
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!state.unexpectedError) {
                _context.next = 2;
                break;
              }

              throw Error('Something really bad happened');

            case 2:
              return _context.abrupt("return", {
                body: 'Hello, World!',
                statusCode: 200
              });

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function mockHandler() {
      return _ref.apply(this, arguments);
    };
  }();

  var loggerSpy = jest.spyOn(_utils.nullLogger, 'error'); // The decoratored handler using options from state

  var getHandler = function getHandler() {
    var body = state.body;
    return (0, _errors.errors)(mockHandler, {
      body: body,
      logger: _utils.nullLogger
    });
  };

  beforeAll(function () {
    state.event = {};
    state.body = undefined;
  });
  afterEach(function () {
    loggerSpy.mockClear();
  });
  it('returns results from decorated function if no errors',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var handler, results, expected;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            handler = getHandler();
            _context2.next = 3;
            return handler(state.event);

          case 3:
            results = _context2.sent;
            expected = {
              body: 'Hello, World!',
              statusCode: 200
            };
            expect(results).toMatchObject(expected);
            expect(loggerSpy).toHaveBeenCalledTimes(0);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('logs error and returns an error response if errors',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    var handler, results, expected;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            state.unexpectedError = true;
            handler = getHandler();
            _context3.next = 4;
            return handler(state.event);

          case 4:
            results = _context3.sent;
            expected = {
              body: 'Internal Server Error',
              statusCode: 500
            };
            expect(results).toMatchObject(expected);
            expect(loggerSpy).toHaveBeenCalledTimes(1);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL2Vycm9ycy50ZXN0LnRzIl0sIm5hbWVzIjpbImRlc2NyaWJlIiwic3RhdGUiLCJtb2NrSGFuZGxlciIsInVuZXhwZWN0ZWRFcnJvciIsIkVycm9yIiwiYm9keSIsInN0YXR1c0NvZGUiLCJsb2dnZXJTcHkiLCJqZXN0Iiwic3B5T24iLCJsb2dnZXIiLCJnZXRIYW5kbGVyIiwiYmVmb3JlQWxsIiwiZXZlbnQiLCJ1bmRlZmluZWQiLCJhZnRlckVhY2giLCJtb2NrQ2xlYXIiLCJpdCIsImhhbmRsZXIiLCJyZXN1bHRzIiwiZXhwZWN0ZWQiLCJleHBlY3QiLCJ0b01hdGNoT2JqZWN0IiwidG9IYXZlQmVlbkNhbGxlZFRpbWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOztBQUVBQSxRQUFRLENBQUMsa0JBQUQsRUFBcUIsWUFBTTtBQUNqQyxNQUFNQyxLQUEyQixHQUFHLEVBQXBDLENBRGlDLENBR2pDOztBQUNBLE1BQU1DLFdBQVc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlDQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDZEQsS0FBSyxDQUFDRSxlQURRO0FBQUE7QUFBQTtBQUFBOztBQUFBLG9CQUVWQyxLQUFLLENBQUMsK0JBQUQsQ0FGSzs7QUFBQTtBQUFBLCtDQUlYO0FBQUVDLGdCQUFBQSxJQUFJLEVBQUUsZUFBUjtBQUF5QkMsZ0JBQUFBLFVBQVUsRUFBRTtBQUFyQyxlQUpXOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUg7O0FBQUEsb0JBQVhKLFdBQVc7QUFBQTtBQUFBO0FBQUEsS0FBakI7O0FBT0EsTUFBTUssU0FBUyxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0MsaUJBQVgsRUFBbUIsT0FBbkIsQ0FBbEIsQ0FYaUMsQ0FhakM7O0FBQ0EsTUFBTUMsVUFBVSxHQUFHLFNBQWJBLFVBQWEsR0FBTTtBQUFBLFFBQ2ZOLElBRGUsR0FDTkosS0FETSxDQUNmSSxJQURlO0FBRXZCLFdBQU8sb0JBQU9ILFdBQVAsRUFBb0I7QUFBRUcsTUFBQUEsSUFBSSxFQUFKQSxJQUFGO0FBQVFLLE1BQUFBLE1BQU0sRUFBTkE7QUFBUixLQUFwQixDQUFQO0FBQ0QsR0FIRDs7QUFLQUUsRUFBQUEsU0FBUyxDQUFDLFlBQU07QUFDZFgsSUFBQUEsS0FBSyxDQUFDWSxLQUFOLEdBQWMsRUFBZDtBQUNBWixJQUFBQSxLQUFLLENBQUNJLElBQU4sR0FBYVMsU0FBYjtBQUNELEdBSFEsQ0FBVDtBQUtBQyxFQUFBQSxTQUFTLENBQUMsWUFBTTtBQUNkUixJQUFBQSxTQUFTLENBQUNTLFNBQVY7QUFDRCxHQUZRLENBQVQ7QUFJQUMsRUFBQUEsRUFBRSxDQUFDLHNEQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsK0JBQXlEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNuREMsWUFBQUEsT0FEbUQsR0FDekNQLFVBQVUsRUFEK0I7QUFBQTtBQUFBLG1CQUVuQ08sT0FBTyxDQUFDakIsS0FBSyxDQUFDWSxLQUFQLENBRjRCOztBQUFBO0FBRW5ETSxZQUFBQSxPQUZtRDtBQUduREMsWUFBQUEsUUFIbUQsR0FHeEM7QUFBRWYsY0FBQUEsSUFBSSxFQUFFLGVBQVI7QUFBeUJDLGNBQUFBLFVBQVUsRUFBRTtBQUFyQyxhQUh3QztBQUl6RGUsWUFBQUEsTUFBTSxDQUFDRixPQUFELENBQU4sQ0FBZ0JHLGFBQWhCLENBQThCRixRQUE5QjtBQUNBQyxZQUFBQSxNQUFNLENBQUNkLFNBQUQsQ0FBTixDQUFrQmdCLHFCQUFsQixDQUF3QyxDQUF4Qzs7QUFMeUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBekQsR0FBRjtBQVFBTixFQUFBQSxFQUFFLENBQUMsb0RBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSwrQkFBdUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ3ZEaEIsWUFBQUEsS0FBSyxDQUFDRSxlQUFOLEdBQXdCLElBQXhCO0FBQ01lLFlBQUFBLE9BRmlELEdBRXZDUCxVQUFVLEVBRjZCO0FBQUE7QUFBQSxtQkFHakNPLE9BQU8sQ0FBQ2pCLEtBQUssQ0FBQ1ksS0FBUCxDQUgwQjs7QUFBQTtBQUdqRE0sWUFBQUEsT0FIaUQ7QUFJakRDLFlBQUFBLFFBSmlELEdBSXRDO0FBQUVmLGNBQUFBLElBQUksRUFBRSx1QkFBUjtBQUFpQ0MsY0FBQUEsVUFBVSxFQUFFO0FBQTdDLGFBSnNDO0FBS3ZEZSxZQUFBQSxNQUFNLENBQUNGLE9BQUQsQ0FBTixDQUFnQkcsYUFBaEIsQ0FBOEJGLFFBQTlCO0FBQ0FDLFlBQUFBLE1BQU0sQ0FBQ2QsU0FBRCxDQUFOLENBQWtCZ0IscUJBQWxCLENBQXdDLENBQXhDOztBQU51RDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUF2RCxHQUFGO0FBUUQsQ0E1Q08sQ0FBUiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGVycm9ycyB9IGZyb20gJy4vZXJyb3JzJztcbmltcG9ydCB7IG51bGxMb2dnZXIgYXMgbG9nZ2VyIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5kZXNjcmliZSgnZXJyb3JzIGRlY29yYXRvcicsICgpID0+IHtcbiAgY29uc3Qgc3RhdGU6IHsgW2s6IHN0cmluZ106IGFueSB9ID0ge307XG5cbiAgLy8gc2ltcGxlIExhbWJkYSBoYW5kbGVyIHRoYXQgY2FuIHRocm93IGVycm9ycyBiYXNlZCBvbiB0aGUgdGVzdCBzdGF0ZVxuICBjb25zdCBtb2NrSGFuZGxlciA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoc3RhdGUudW5leHBlY3RlZEVycm9yKSB7XG4gICAgICB0aHJvdyBFcnJvcignU29tZXRoaW5nIHJlYWxseSBiYWQgaGFwcGVuZWQnKTtcbiAgICB9XG4gICAgcmV0dXJuIHsgYm9keTogJ0hlbGxvLCBXb3JsZCEnLCBzdGF0dXNDb2RlOiAyMDAgfTtcbiAgfTtcblxuICBjb25zdCBsb2dnZXJTcHkgPSBqZXN0LnNweU9uKGxvZ2dlciwgJ2Vycm9yJyk7XG5cbiAgLy8gVGhlIGRlY29yYXRvcmVkIGhhbmRsZXIgdXNpbmcgb3B0aW9ucyBmcm9tIHN0YXRlXG4gIGNvbnN0IGdldEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBib2R5IH0gPSBzdGF0ZTtcbiAgICByZXR1cm4gZXJyb3JzKG1vY2tIYW5kbGVyLCB7IGJvZHksIGxvZ2dlciB9KTtcbiAgfTtcblxuICBiZWZvcmVBbGwoKCkgPT4ge1xuICAgIHN0YXRlLmV2ZW50ID0ge307XG4gICAgc3RhdGUuYm9keSA9IHVuZGVmaW5lZDtcbiAgfSk7XG5cbiAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICBsb2dnZXJTcHkubW9ja0NsZWFyKCk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIHJlc3VsdHMgZnJvbSBkZWNvcmF0ZWQgZnVuY3Rpb24gaWYgbm8gZXJyb3JzJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZXIgPSBnZXRIYW5kbGVyKCk7XG4gICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IGhhbmRsZXIoc3RhdGUuZXZlbnQpO1xuICAgIGNvbnN0IGV4cGVjdGVkID0geyBib2R5OiAnSGVsbG8sIFdvcmxkIScsIHN0YXR1c0NvZGU6IDIwMCB9O1xuICAgIGV4cGVjdChyZXN1bHRzKS50b01hdGNoT2JqZWN0KGV4cGVjdGVkKTtcbiAgICBleHBlY3QobG9nZ2VyU3B5KS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMCk7XG4gIH0pO1xuXG4gIGl0KCdsb2dzIGVycm9yIGFuZCByZXR1cm5zIGFuIGVycm9yIHJlc3BvbnNlIGlmIGVycm9ycycsIGFzeW5jICgpID0+IHtcbiAgICBzdGF0ZS51bmV4cGVjdGVkRXJyb3IgPSB0cnVlO1xuICAgIGNvbnN0IGhhbmRsZXIgPSBnZXRIYW5kbGVyKCk7XG4gICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IGhhbmRsZXIoc3RhdGUuZXZlbnQpO1xuICAgIGNvbnN0IGV4cGVjdGVkID0geyBib2R5OiAnSW50ZXJuYWwgU2VydmVyIEVycm9yJywgc3RhdHVzQ29kZTogNTAwIH07XG4gICAgZXhwZWN0KHJlc3VsdHMpLnRvTWF0Y2hPYmplY3QoZXhwZWN0ZWQpO1xuICAgIGV4cGVjdChsb2dnZXJTcHkpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcbiAgfSk7XG59KTtcbiJdfQ==