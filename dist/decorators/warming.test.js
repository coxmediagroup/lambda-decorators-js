"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _warming = require("./warming");

var _utils = require("../utils");

describe('warming decorator', function () {
  var state = {}; // simple Lambda handler

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
              return _context.abrupt("return", {
                body: 'Hello, World!',
                statusCode: 200
              });

            case 1:
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
    var eventPayloadCheck = state.eventPayloadCheck;
    return (0, _warming.warming)(mockHandler, {
      eventPayloadCheck: eventPayloadCheck,
      logger: _utils.nullLogger
    });
  };

  beforeAll(function () {
    state.event = {};
    state.eventPayloadCheck = undefined;
  });
  afterEach(function () {
    loggerSpy.mockClear();
  });
  it('calls target function if the default "warming" payload is not detected',
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
  it('exits early if the default "warming" payload is detected',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    var handler, results, expected;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            state.event = {
              source: 'serverless-plugin-warmup'
            };
            handler = getHandler();
            _context3.next = 4;
            return handler(state.event);

          case 4:
            results = _context3.sent;
            expected = {
              statusCode: 202
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
  it('calls target function if a customized "warming" payload is not detected',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4() {
    var handler, results, expected;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            state.event = {
              source: 'something-else'
            };
            handler = getHandler();
            _context4.next = 4;
            return handler(state.event);

          case 4:
            results = _context4.sent;
            expected = {
              body: 'Hello, World!',
              statusCode: 200
            };
            expect(results).toMatchObject(expected);
            expect(loggerSpy).toHaveBeenCalledTimes(0);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it('exits early if a customized "warming" payload is detected by eventPayloadCheck',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5() {
    var handler, results, expected;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            state.event = {
              source: 'something-else'
            };

            state.eventPayloadCheck = function () {
              var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                  _ref6$source = _ref6.source,
                  source = _ref6$source === void 0 ? '' : _ref6$source;

              return source === 'something-else';
            };

            handler = getHandler();
            _context5.next = 5;
            return handler(state.event);

          case 5:
            results = _context5.sent;
            expected = {
              statusCode: 202
            };
            expect(results).toMatchObject(expected);
            expect(loggerSpy).toHaveBeenCalledTimes(1);

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL3dhcm1pbmcudGVzdC50cyJdLCJuYW1lcyI6WyJkZXNjcmliZSIsInN0YXRlIiwibW9ja0hhbmRsZXIiLCJib2R5Iiwic3RhdHVzQ29kZSIsImxvZ2dlclNweSIsImplc3QiLCJzcHlPbiIsImxvZ2dlciIsImdldEhhbmRsZXIiLCJldmVudFBheWxvYWRDaGVjayIsImJlZm9yZUFsbCIsImV2ZW50IiwidW5kZWZpbmVkIiwiYWZ0ZXJFYWNoIiwibW9ja0NsZWFyIiwiaXQiLCJoYW5kbGVyIiwicmVzdWx0cyIsImV4cGVjdGVkIiwiZXhwZWN0IiwidG9NYXRjaE9iamVjdCIsInRvSGF2ZUJlZW5DYWxsZWRUaW1lcyIsInNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQUEsUUFBUSxDQUFDLG1CQUFELEVBQXNCLFlBQU07QUFDbEMsTUFBTUMsS0FBMkIsR0FBRyxFQUFwQyxDQURrQyxDQUdsQzs7QUFDQSxNQUFNQyxXQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQ0FBRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsK0NBQWE7QUFBRUMsZ0JBQUFBLElBQUksRUFBRSxlQUFSO0FBQXlCQyxnQkFBQUEsVUFBVSxFQUFFO0FBQXJDLGVBQWI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBSDs7QUFBQSxvQkFBWEYsV0FBVztBQUFBO0FBQUE7QUFBQSxLQUFqQixDQUprQyxDQU1sQzs7O0FBQ0EsTUFBTUcsU0FBUyxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0MsaUJBQVgsRUFBbUIsTUFBbkIsQ0FBbEIsQ0FQa0MsQ0FTbEM7O0FBQ0EsTUFBTUMsVUFBVSxHQUFHLFNBQWJBLFVBQWEsR0FBTTtBQUFBLFFBQ2ZDLGlCQURlLEdBQ09ULEtBRFAsQ0FDZlMsaUJBRGU7QUFFdkIsV0FBTyxzQkFBUVIsV0FBUixFQUFxQjtBQUFFUSxNQUFBQSxpQkFBaUIsRUFBakJB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SyxDQUFDVyxLQUFOLEdBQWM7QUFBRVcsY0FBQUEsTUFBTSxFQUFFO0FBQVYsYUFBZDs7QUFDQXRCLFlBQUFBLEtBQUssQ0FBQ1MsaUJBQU4sR0FBMEI7QUFBQSw4RkFBbUIsRUFBbkI7QUFBQSx1Q0FBR2EsTUFBSDtBQUFBLGtCQUFHQSxNQUFILDZCQUFZLEVBQVo7O0FBQUEscUJBQTBCQSxNQUFNLEtBQUssZ0JBQXJDO0FBQUEsYUFBMUI7O0FBQ01OLFlBQUFBLE9BSDZFLEdBR25FUixVQUFVLEVBSHlEO0FBQUE7QUFBQSxtQkFJN0RRLE9BQU8sQ0FBQ2hCLEtBQUssQ0FBQ1csS0FBUCxDQUpzRDs7QUFBQTtBQUk3RU0sWUFBQUEsT0FKNkU7QUFLN0VDLFlBQUFBLFFBTDZFLEdBS2xFO0FBQUVmLGNBQUFBLFVBQVUsRUFBRTtBQUFkLGFBTGtFO0FBTW5GZ0IsWUFBQUEsTUFBTSxDQUFDRixPQUFELENBQU4sQ0FBZ0JHLGFBQWhCLENBQThCRixRQUE5QjtBQUNBQyxZQUFBQSxNQUFNLENBQUNmLFNBQUQsQ0FBTixDQUFrQmlCLHFCQUFsQixDQUF3QyxDQUF4Qzs7QUFQbUY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBbkYsR0FBRjtBQVNELENBM0RPLENBQVIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB3YXJtaW5nIH0gZnJvbSAnLi93YXJtaW5nJztcbmltcG9ydCB7IG51bGxMb2dnZXIgYXMgbG9nZ2VyIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5kZXNjcmliZSgnd2FybWluZyBkZWNvcmF0b3InLCAoKSA9PiB7XG4gIGNvbnN0IHN0YXRlOiB7IFtrOiBzdHJpbmddOiBhbnkgfSA9IHt9O1xuXG4gIC8vIHNpbXBsZSBMYW1iZGEgaGFuZGxlclxuICBjb25zdCBtb2NrSGFuZGxlciA9IGFzeW5jICgpID0+ICh7IGJvZHk6ICdIZWxsbywgV29ybGQhJywgc3RhdHVzQ29kZTogMjAwIH0pO1xuXG4gIC8vIGxvZ2dpbmcgZnVuY3Rpb24gZm9yIHRoZXNlIHRlc3RzIHRvIHNweSBvblxuICBjb25zdCBsb2dnZXJTcHkgPSBqZXN0LnNweU9uKGxvZ2dlciwgJ2luZm8nKTtcblxuICAvLyBUaGUgZGVjb3JhdG9yZWQgaGFuZGxlciB1c2luZyBvcHRpb25zIGZyb20gc3RhdGVcbiAgY29uc3QgZ2V0SGFuZGxlciA9ICgpID0+IHtcbiAgICBjb25zdCB7IGV2ZW50UGF5bG9hZENoZWNrIH0gPSBzdGF0ZTtcbiAgICByZXR1cm4gd2FybWluZyhtb2NrSGFuZGxlciwgeyBldmVudFBheWxvYWRDaGVjaywgbG9nZ2VyIH0pO1xuICB9O1xuXG4gIGJlZm9yZUFsbCgoKSA9PiB7XG4gICAgc3RhdGUuZXZlbnQgPSB7fTtcbiAgICBzdGF0ZS5ldmVudFBheWxvYWRDaGVjayA9IHVuZGVmaW5lZDtcbiAgfSk7XG5cbiAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICBsb2dnZXJTcHkubW9ja0NsZWFyKCk7XG4gIH0pO1xuXG4gIGl0KCdjYWxscyB0YXJnZXQgZnVuY3Rpb24gaWYgdGhlIGRlZmF1bHQgXCJ3YXJtaW5nXCIgcGF5bG9hZCBpcyBub3QgZGV0ZWN0ZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlciA9IGdldEhhbmRsZXIoKTtcbiAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgaGFuZGxlcihzdGF0ZS5ldmVudCk7XG4gICAgY29uc3QgZXhwZWN0ZWQgPSB7IGJvZHk6ICdIZWxsbywgV29ybGQhJywgc3RhdHVzQ29kZTogMjAwIH07XG4gICAgZXhwZWN0KHJlc3VsdHMpLnRvTWF0Y2hPYmplY3QoZXhwZWN0ZWQpO1xuICAgIGV4cGVjdChsb2dnZXJTcHkpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygwKTtcbiAgfSk7XG5cbiAgaXQoJ2V4aXRzIGVhcmx5IGlmIHRoZSBkZWZhdWx0IFwid2FybWluZ1wiIHBheWxvYWQgaXMgZGV0ZWN0ZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgc3RhdGUuZXZlbnQgPSB7IHNvdXJjZTogJ3NlcnZlcmxlc3MtcGx1Z2luLXdhcm11cCcgfTtcbiAgICBjb25zdCBoYW5kbGVyID0gZ2V0SGFuZGxlcigpO1xuICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBoYW5kbGVyKHN0YXRlLmV2ZW50KTtcbiAgICBjb25zdCBleHBlY3RlZCA9IHsgc3RhdHVzQ29kZTogMjAyIH07XG4gICAgZXhwZWN0KHJlc3VsdHMpLnRvTWF0Y2hPYmplY3QoZXhwZWN0ZWQpO1xuICAgIGV4cGVjdChsb2dnZXJTcHkpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcbiAgfSk7XG5cbiAgaXQoJ2NhbGxzIHRhcmdldCBmdW5jdGlvbiBpZiBhIGN1c3RvbWl6ZWQgXCJ3YXJtaW5nXCIgcGF5bG9hZCBpcyBub3QgZGV0ZWN0ZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgc3RhdGUuZXZlbnQgPSB7IHNvdXJjZTogJ3NvbWV0aGluZy1lbHNlJyB9O1xuICAgIGNvbnN0IGhhbmRsZXIgPSBnZXRIYW5kbGVyKCk7XG4gICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IGhhbmRsZXIoc3RhdGUuZXZlbnQpO1xuICAgIGNvbnN0IGV4cGVjdGVkID0geyBib2R5OiAnSGVsbG8sIFdvcmxkIScsIHN0YXR1c0NvZGU6IDIwMCB9O1xuICAgIGV4cGVjdChyZXN1bHRzKS50b01hdGNoT2JqZWN0KGV4cGVjdGVkKTtcbiAgICBleHBlY3QobG9nZ2VyU3B5KS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMCk7XG4gIH0pO1xuXG4gIGl0KCdleGl0cyBlYXJseSBpZiBhIGN1c3RvbWl6ZWQgXCJ3YXJtaW5nXCIgcGF5bG9hZCBpcyBkZXRlY3RlZCBieSBldmVudFBheWxvYWRDaGVjaycsIGFzeW5jICgpID0+IHtcbiAgICBzdGF0ZS5ldmVudCA9IHsgc291cmNlOiAnc29tZXRoaW5nLWVsc2UnIH07XG4gICAgc3RhdGUuZXZlbnRQYXlsb2FkQ2hlY2sgPSAoeyBzb3VyY2UgPSAnJyB9ID0ge30pID0+IHNvdXJjZSA9PT0gJ3NvbWV0aGluZy1lbHNlJztcbiAgICBjb25zdCBoYW5kbGVyID0gZ2V0SGFuZGxlcigpO1xuICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBoYW5kbGVyKHN0YXRlLmV2ZW50KTtcbiAgICBjb25zdCBleHBlY3RlZCA9IHsgc3RhdHVzQ29kZTogMjAyIH07XG4gICAgZXhwZWN0KHJlc3VsdHMpLnRvTWF0Y2hPYmplY3QoZXhwZWN0ZWQpO1xuICAgIGV4cGVjdChsb2dnZXJTcHkpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcbiAgfSk7XG59KTtcbiJdfQ==