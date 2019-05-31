"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpErrors = require("./http-errors");

var _utils = require("../utils");

describe('httpErrors decorator', function () {
  var state = {
    event: {}
  }; // simple Lambda handler that can throw errors based on the test state

  var mockHandler =
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee() {
      var customMessage, throwThis, unexpectedError;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              customMessage = state.customMessage, throwThis = state.throwThis, unexpectedError = state.unexpectedError;

              if (!unexpectedError) {
                _context.next = 3;
                break;
              }

              throw Error('Unexpected error');

            case 3:
              if (!throwThis) {
                _context.next = 7;
                break;
              }

              if (!customMessage) {
                _context.next = 6;
                break;
              }

              throw Error("[".concat(throwThis, "] ").concat(customMessage));

            case 6:
              throw Error("[".concat(throwThis, "]"));

            case 7:
              return _context.abrupt("return", {
                body: 'Hello, World!',
                statusCode: 200
              });

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function mockHandler() {
      return _ref.apply(this, arguments);
    };
  }(); // logging function for these tests to spy on


  var loggerSpy = jest.spyOn(_utils.nullLogger, 'info'); // The decoratored handler using options from state

  var getHandler = function getHandler() {
    return (0, _httpErrors.httpErrors)(mockHandler, {
      logger: _utils.nullLogger
    });
  };

  beforeEach(function () {
    state.event = {};
  });
  afterEach(function () {
    loggerSpy.mockClear();
  });
  it('calls target function if not httpError',
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
  it('returns httpError response',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    var handler, results, expected;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            state.throwThis = 404;
            handler = getHandler();
            _context3.next = 4;
            return handler(state.event);

          case 4:
            results = _context3.sent;
            expected = {
              body: 'Not Found',
              statusCode: 404
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
  it('supports custom messages',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4() {
    var handler, results, expected;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            state.throwThis = 404;
            state.customMessage = 'That was nowhere to be found!';
            handler = getHandler();
            _context4.next = 5;
            return handler(state.event);

          case 5:
            results = _context4.sent;
            expected = {
              body: 'That was nowhere to be found!',
              statusCode: 404
            };
            expect(results).toMatchObject(expected);
            expect(loggerSpy).toHaveBeenCalledTimes(1);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it('re-throws errors if error is not httpError',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5() {
    var handler;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            state.unexpectedError = true;
            handler = getHandler();
            _context5.next = 4;
            return expect(handler(state.event)).rejects.toThrow();

          case 4:
            expect(loggerSpy).toHaveBeenCalledTimes(0);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL2h0dHAtZXJyb3JzLnRlc3QudHMiXSwibmFtZXMiOlsiZGVzY3JpYmUiLCJzdGF0ZSIsImV2ZW50IiwibW9ja0hhbmRsZXIiLCJjdXN0b21NZXNzYWdlIiwidGhyb3dUaGlzIiwidW5leHBlY3RlZEVycm9yIiwiRXJyb3IiLCJib2R5Iiwic3RhdHVzQ29kZSIsImxvZ2dlclNweSIsImplc3QiLCJzcHlPbiIsImxvZ2dlciIsImdldEhhbmRsZXIiLCJiZWZvcmVFYWNoIiwiYWZ0ZXJFYWNoIiwibW9ja0NsZWFyIiwiaXQiLCJoYW5kbGVyIiwicmVzdWx0cyIsImV4cGVjdGVkIiwiZXhwZWN0IiwidG9NYXRjaE9iamVjdCIsInRvSGF2ZUJlZW5DYWxsZWRUaW1lcyIsInJlamVjdHMiLCJ0b1Rocm93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOztBQUVBQSxRQUFRLENBQUMsc0JBQUQsRUFBeUIsWUFBTTtBQUNyQyxNQUFNQyxLQUEyQixHQUFHO0FBQ2xDQyxJQUFBQSxLQUFLLEVBQUU7QUFEMkIsR0FBcEMsQ0FEcUMsQ0FLckM7O0FBQ0EsTUFBTUMsV0FBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUNBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1ZDLGNBQUFBLGFBRFUsR0FDb0NILEtBRHBDLENBQ1ZHLGFBRFUsRUFDS0MsU0FETCxHQUNvQ0osS0FEcEMsQ0FDS0ksU0FETCxFQUNnQkMsZUFEaEIsR0FDb0NMLEtBRHBDLENBQ2dCSyxlQURoQjs7QUFBQSxtQkFHZEEsZUFIYztBQUFBO0FBQUE7QUFBQTs7QUFBQSxvQkFJVkMsS0FBSyxDQUFDLGtCQUFELENBSks7O0FBQUE7QUFBQSxtQkFPZEYsU0FQYztBQUFBO0FBQUE7QUFBQTs7QUFBQSxtQkFRWkQsYUFSWTtBQUFBO0FBQUE7QUFBQTs7QUFBQSxvQkFTUkcsS0FBSyxZQUFLRixTQUFMLGVBQW1CRCxhQUFuQixFQVRHOztBQUFBO0FB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LCtCQUFSO0FBQXlDQyxjQUFBQSxVQUFVLEVBQUU7QUFBckQsYUFMWTtBQU03QmEsWUFBQUEsTUFBTSxDQUFDRixPQUFELENBQU4sQ0FBZ0JHLGFBQWhCLENBQThCRixRQUE5QjtBQUNBQyxZQUFBQSxNQUFNLENBQUNaLFNBQUQsQ0FBTixDQUFrQmMscUJBQWxCLENBQXdDLENBQXhDOztBQVA2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUE3QixHQUFGO0FBVUFOLEVBQUFBLEVBQUUsQ0FBQyw0Q0FBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLCtCQUErQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDL0NqQixZQUFBQSxLQUFLLENBQUNLLGVBQU4sR0FBd0IsSUFBeEI7QUFDTWEsWUFBQUEsT0FGeUMsR0FFL0JMLFVBQVUsRUFGcUI7QUFBQTtBQUFBLG1CQUd6Q1EsTUFBTSxDQUFDSCxPQUFPLENBQUNsQixLQUFLLENBQUNDLEtBQVAsQ0FBUixDQUFOLENBQTZCdUIsT0FBN0IsQ0FBcUNDLE9BQXJDLEVBSHlDOztBQUFBO0FBSS9DSixZQUFBQSxNQUFNLENBQUNaLFNBQUQsQ0FBTixDQUFrQmMscUJBQWxCLENBQXdDLENBQXhDOztBQUorQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUEvQyxHQUFGO0FBTUQsQ0F2RU8sQ0FBUiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGh0dHBFcnJvcnMgfSBmcm9tICcuL2h0dHAtZXJyb3JzJztcbmltcG9ydCB7IG51bGxMb2dnZXIgYXMgbG9nZ2VyIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5kZXNjcmliZSgnaHR0cEVycm9ycyBkZWNvcmF0b3InLCAoKSA9PiB7XG4gIGNvbnN0IHN0YXRlOiB7IFtrOiBzdHJpbmddOiBhbnkgfSA9IHtcbiAgICBldmVudDoge30sXG4gIH07XG5cbiAgLy8gc2ltcGxlIExhbWJkYSBoYW5kbGVyIHRoYXQgY2FuIHRocm93IGVycm9ycyBiYXNlZCBvbiB0aGUgdGVzdCBzdGF0ZVxuICBjb25zdCBtb2NrSGFuZGxlciA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCB7IGN1c3RvbU1lc3NhZ2UsIHRocm93VGhpcywgdW5leHBlY3RlZEVycm9yIH0gPSBzdGF0ZTtcblxuICAgIGlmICh1bmV4cGVjdGVkRXJyb3IpIHtcbiAgICAgIHRocm93IEVycm9yKCdVbmV4cGVjdGVkIGVycm9yJyk7XG4gICAgfVxuXG4gICAgaWYgKHRocm93VGhpcykge1xuICAgICAgaWYgKGN1c3RvbU1lc3NhZ2UpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoYFske3Rocm93VGhpc31dICR7Y3VzdG9tTWVzc2FnZX1gKTtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgRXJyb3IoYFske3Rocm93VGhpc31dYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgYm9keTogJ0hlbGxvLCBXb3JsZCEnLCBzdGF0dXNDb2RlOiAyMDAgfTtcbiAgfTtcblxuICAvLyBsb2dnaW5nIGZ1bmN0aW9uIGZvciB0aGVzZSB0ZXN0cyB0byBzcHkgb25cbiAgY29uc3QgbG9nZ2VyU3B5ID0gamVzdC5zcHlPbihsb2dnZXIsICdpbmZvJyk7XG5cbiAgLy8gVGhlIGRlY29yYXRvcmVkIGhhbmRsZXIgdXNpbmcgb3B0aW9ucyBmcm9tIHN0YXRlXG4gIGNvbnN0IGdldEhhbmRsZXIgPSAoKSA9PiBodHRwRXJyb3JzKG1vY2tIYW5kbGVyLCB7IGxvZ2dlciB9KTtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBzdGF0ZS5ldmVudCA9IHt9O1xuICB9KTtcblxuICBhZnRlckVhY2goKCkgPT4ge1xuICAgIGxvZ2dlclNweS5tb2NrQ2xlYXIoKTtcbiAgfSk7XG5cbiAgaXQoJ2NhbGxzIHRhcmdldCBmdW5jdGlvbiBpZiBub3QgaHR0cEVycm9yJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZXIgPSBnZXRIYW5kbGVyKCk7XG4gICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IGhhbmRsZXIoc3RhdGUuZXZlbnQpO1xuICAgIGNvbnN0IGV4cGVjdGVkID0geyBib2R5OiAnSGVsbG8sIFdvcmxkIScsIHN0YXR1c0NvZGU6IDIwMCB9O1xuICAgIGV4cGVjdChyZXN1bHRzKS50b01hdGNoT2JqZWN0KGV4cGVjdGVkKTtcbiAgICBleHBlY3QobG9nZ2VyU3B5KS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMCk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIGh0dHBFcnJvciByZXNwb25zZScsIGFzeW5jICgpID0+IHtcbiAgICBzdGF0ZS50aHJvd1RoaXMgPSA0MDQ7XG4gICAgY29uc3QgaGFuZGxlciA9IGdldEhhbmRsZXIoKTtcbiAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgaGFuZGxlcihzdGF0ZS5ldmVudCk7XG4gICAgY29uc3QgZXhwZWN0ZWQgPSB7IGJvZHk6ICdOb3QgRm91bmQnLCBzdGF0dXNDb2RlOiA0MDQgfTtcbiAgICBleHBlY3QocmVzdWx0cykudG9NYXRjaE9iamVjdChleHBlY3RlZCk7XG4gICAgZXhwZWN0KGxvZ2dlclNweSkudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuICB9KTtcblxuICBpdCgnc3VwcG9ydHMgY3VzdG9tIG1lc3NhZ2VzJywgYXN5bmMgKCkgPT4ge1xuICAgIHN0YXRlLnRocm93VGhpcyA9IDQwNDtcbiAgICBzdGF0ZS5jdXN0b21NZXNzYWdlID0gJ1RoYXQgd2FzIG5vd2hlcmUgdG8gYmUgZm91bmQhJztcbiAgICBjb25zdCBoYW5kbGVyID0gZ2V0SGFuZGxlcigpO1xuICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBoYW5kbGVyKHN0YXRlLmV2ZW50KTtcbiAgICBjb25zdCBleHBlY3RlZCA9IHsgYm9keTogJ1RoYXQgd2FzIG5vd2hlcmUgdG8gYmUgZm91bmQhJywgc3RhdHVzQ29kZTogNDA0IH07XG4gICAgZXhwZWN0KHJlc3VsdHMpLnRvTWF0Y2hPYmplY3QoZXhwZWN0ZWQpO1xuICAgIGV4cGVjdChsb2dnZXJTcHkpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcbiAgfSk7XG5cbiAgaXQoJ3JlLXRocm93cyBlcnJvcnMgaWYgZXJyb3IgaXMgbm90IGh0dHBFcnJvcicsIGFzeW5jICgpID0+IHtcbiAgICBzdGF0ZS51bmV4cGVjdGVkRXJyb3IgPSB0cnVlO1xuICAgIGNvbnN0IGhhbmRsZXIgPSBnZXRIYW5kbGVyKCk7XG4gICAgYXdhaXQgZXhwZWN0KGhhbmRsZXIoc3RhdGUuZXZlbnQpKS5yZWplY3RzLnRvVGhyb3coKTtcbiAgICBleHBlY3QobG9nZ2VyU3B5KS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMCk7XG4gIH0pO1xufSk7XG4iXX0=