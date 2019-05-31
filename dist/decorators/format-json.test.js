"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _formatJson = require("./format-json");

var _utils = require("../utils");

describe('formatJSON decorator', function () {
  var state = {}; // simple Lambda handler

  var mockHandler =
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee() {
      var body;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              body = state.body;
              return _context.abrupt("return", {
                body: body,
                statusCode: 200
              });

            case 2:
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


  var loggerSpy = jest.spyOn(_utils.nullLogger, 'warn'); // The decoratored handler using options from state

  var getHandler = function getHandler() {
    var enabled = state.enabled,
        replacer = state.replacer,
        reviver = state.reviver,
        spacing = state.spacing;
    return (0, _formatJson.formatJSON)(mockHandler, {
      enabled: enabled,
      logger: _utils.nullLogger,
      replacer: replacer,
      reviver: reviver,
      spacing: spacing
    });
  };

  beforeEach(function () {
    state.body = '{ "data": "Hello, World!" }';
    state.enabled = undefined;
    state.event = {};
    state.replacer = undefined;
    state.reviver = undefined;
    state.spacing = undefined;
  });
  afterEach(function () {
    loggerSpy.mockClear();
  });
  it('Has reasonable defaults',
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
              body: '{"data":"Hello, World!"}',
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
  it('Handles unparsable input',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    var handler, results, expected;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            state.body = 'This is Not JSON';
            handler = getHandler();
            _context3.next = 4;
            return handler(state.event);

          case 4:
            results = _context3.sent;
            expected = {
              body: 'This is Not JSON',
              statusCode: 200
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
  it('Honors the enabled flag',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4() {
    var handler, results, expected;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            state.enabled = false;
            state.body = '{\n\n\n"data":\t\t\t"Hello, World!"\n\n\n}';
            handler = getHandler();
            _context4.next = 5;
            return handler(state.event);

          case 5:
            results = _context4.sent;
            expected = {
              body: '{\n\n\n"data":\t\t\t"Hello, World!"\n\n\n}',
              statusCode: 200
            };
            expect(results).toMatchObject(expected);
            expect(loggerSpy).toHaveBeenCalledTimes(0);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  describe('JSON.stringify args', function () {
    it('Accepts a function for replacer argument',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5() {
      var handler, results, expected;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              state.replacer = function (k, v) {
                return k === 'data' ? 'Hello, Replacer!' : v;
              };

              handler = getHandler();
              _context5.next = 4;
              return handler(state.event);

            case 4:
              results = _context5.sent;
              expected = {
                body: '{"data":"Hello, Replacer!"}',
                statusCode: 200
              };
              expect(results).toMatchObject(expected);
              expect(loggerSpy).toHaveBeenCalledTimes(0);

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it('Accepts an array for replacer argument',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee6() {
      var handler, results, expected;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              state.body = '{ "data": "Hello, World!", "extra": "stuff" }';
              state.replacer = ['data'];
              handler = getHandler();
              _context6.next = 5;
              return handler(state.event);

            case 5:
              results = _context6.sent;
              expected = {
                body: '{"data":"Hello, World!"}',
                statusCode: 200
              };
              expect(results).toMatchObject(expected);
              expect(loggerSpy).toHaveBeenCalledTimes(0);

            case 9:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
    it('Accepts a number for spacing argument',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee7() {
      var handler, results, expected;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              state.spacing = 2;
              handler = getHandler();
              _context7.next = 4;
              return handler(state.event);

            case 4:
              results = _context7.sent;
              expected = {
                body: '{\n  "data": "Hello, World!"\n}',
                statusCode: 200
              };
              expect(results).toMatchObject(expected);
              expect(loggerSpy).toHaveBeenCalledTimes(0);

            case 8:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
    it('Accepts a string for spacing argument',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee8() {
      var handler, results, expected;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              state.spacing = '\t';
              handler = getHandler();
              _context8.next = 4;
              return handler(state.event);

            case 4:
              results = _context8.sent;
              expected = {
                body: '{\n\t"data": "Hello, World!"\n}',
                statusCode: 200
              };
              expect(results).toMatchObject(expected);
              expect(loggerSpy).toHaveBeenCalledTimes(0);

            case 8:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
  });
  describe('JSON.parse args', function () {
    it('Accepts a function for reviver argument',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee9() {
      var handler, results, expected;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              state.body = '{ "data": "Hello, World!", "extra": "stuff" }';

              state.reviver = function (k, v) {
                return k === 'extra' ? null : v;
              };

              handler = getHandler();
              _context9.next = 5;
              return handler(state.event);

            case 5:
              results = _context9.sent;
              expected = {
                body: '{"data":"Hello, World!","extra":null}',
                statusCode: 200
              };
              expect(results).toMatchObject(expected);
              expect(loggerSpy).toHaveBeenCalledTimes(0);

            case 9:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL2Zvcm1hdC1qc29uLnRlc3QudHMiXSwibmFtZXMiOlsiZGVzY3JpYmUiLCJzdGF0ZSIsIm1vY2tIYW5kbGVyIiwiYm9keSIsInN0YXR1c0NvZGUiLCJsb2dnZXJTcHkiLCJqZXN0Iiwic3B5T24iLCJsb2dnZXIiLCJnZXRIYW5kbGVyIiwiZW5hYmxlZCIsInJlcGxhY2VyIiwicmV2aXZlciIsInNwYWNpbmciLCJiZWZvcmVFYWNoIiwidW5kZWZpbmVkIiwiZXZlbnQiLCJhZnRlckVhY2giLCJtb2NrQ2xlYXIiLCJpdCIsImhhbmRsZXIiLCJyZXN1bHRzIiwiZXhwZWN0ZWQiLCJleHBlY3QiLCJ0b01hdGNoT2JqZWN0IiwidG9IYXZlQmVlbkNhbGxlZFRpbWVzIiwiayIsInYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUFBLFFBQVEsQ0FBQyxzQkFBRCxFQUF5QixZQUFNO0FBQ3JDLE1BQU1DLEtBQTJCLEdBQUcsRUFBcEMsQ0FEcUMsQ0FHckM7O0FBQ0EsTUFBTUMsV0FBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUNBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1ZDLGNBQUFBLElBRFUsR0FDREYsS0FEQyxDQUNWRSxJQURVO0FBQUEsK0NBRVg7QUFBRUEsZ0JBQUFBLElBQUksRUFBSkEsSUFBRjtBQUFRQyxnQkFBQUEsVUFBVSxFQUFFO0FBQXBCLGVBRlc7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBSDs7QUFBQSxvQkFBWEYsV0FBVztBQUFBO0FBQUE7QUFBQSxLQUFqQixDQUpxQyxDQVNyQzs7O0FBQ0EsTUFBTUcsU0FBUyxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0MsaUJBQVgsRUFBbUIsTUFBbkIsQ0FBbEIsQ0FWcUMsQ0FZckM7O0FBQ0EsTUFBTUMsVUFBVSxHQUFHLFNBQWJBLFVBQWEsR0FBTTtBQUFBLFFBQ2ZDLE9BRGUsR0FDeUJULEtBRHpCLENBQ2ZTLE9BRGU7QUFBQSxRQUNOQyxRQURNLEdBQ3lCVixLQUR6QixDQUNOVSxRQURNO0FBQUEsUUFDSUMsT0FESixHQUN5QlgsS0FEekIsQ0FDSVcsT0FESjtBQUFBLFFBQ2FDLE9BRGIsR0FDeUJaLEtBRHpCLENBQ2FZLE9BRGI7QUFFdkIsV0FBTyw0QkFBV1gsV0FBWCxFQUF3QjtBQUFFUSxNQUFBQSxPQUFPLEVBQVBBLE9BQUY7QUFBV0YsTUFBQUEsTUFBTSxFQUFOQSxpQkFBWDtBQUFtQkcsTUFBQUEsUUFBUSxFQUFSQSxRQUFuQjtBQUE2QkMsTUFBQUEsT0FBTyxFQUFQQSxPQUE3QjtBQUFzQ0MsTUFBQUEsT0FBTyxFQUFQQTtBQUF0QyxLQUF4QixDQUFQO0FBQ0QsR0FIRDs7QUFLQUMsRUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZmIsSUFBQUEsS0FBSyxDQUFDRSxJQUFOLEdBQWEsNkJBQWI7QUFDQUYsSUFBQUEsS0FBSyxDQUFDUyxPQUFOLEdBQWdCSyxTQUFoQjtBQUNBZCxJQUFBQSxLQUFLLENBQUNlLEtBQU4sR0FBYyxFQUFkO0FBQ0FmLElBQUFBLEtBQUssQ0FBQ1UsUUFBTixHQUFpQkksU0FBakI7QUFDQWQsSUFBQUEsS0FBSyxDQUFDVyxPQUFOLEdBQWdCRyxTQUFoQjtBQUNBZCxJQUFBQSxLQUFLLENBQUNZLE9BQU4sR0FBZ0JFLFNBQWhCO0FBQ0QsR0FQUyxDQUFWO0FBU0FFLEVBQUFBLFNBQVMsQ0FBQyxZQUFNO0FBQ2RaLElBQUFBLFNBQVMsQ0FBQ2EsU0FBVjtBQUNELEdBRlEsQ0FBVDtBQUlBQyxFQUFBQSxFQUFFLENBQUMseUJBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSwrQkFBNEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ3RCQyxZQUFBQSxPQURzQixHQUNaWCxVQUFVLEVBREU7QUFBQTtBQUFBLG1CQUVOVyxPQUFPLENBQUNuQixLQUFLLENBQUNlLEtBQVAsQ0FGRDs7QUFBQTtBQUV0QkssWUFBQUEsT0FGc0I7QUFHdEJDLFlBQUFBLFFBSHNCLEdBR1g7QUFBRW5CLGNBQUFBLElBQUksRUFBRSwwQkFBUjtBQUFvQ0MsY0FBQUEsVUFBVSxFQUFFO0FBQWhELGFBSFc7QUFJNUJtQixZQUFBQSxNQUFNLENBQUNGLE9BQUQsQ0FBTixDQUFnQkcsYUFBaEIsQ0FBOEJGLFFBQTlCO0FBQ0FDLFlBQUFBLE1BQU0sQ0FBQ2xCLFNBQUQsQ0FBTixDQUFrQm9CLHFCQUFsQixDQUF3QyxDQUF4Qzs7QUFMNEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBNUIsR0FBRjtBQVFBTixFQUFBQSxFQUFFLENBQUMsMEJBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSwrQkFBNkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQzdCbEIsWUFBQUEsS0FBSyxDQUFDRSxJQUFOLEdBQWEsa0JBQWI7QUFDTWlCLFlBQUFBLE9BRnVCLEdBRWJYLFVBQVUsRUFGRztBQUFBO0FBQUEsbUJBR1BXLE9BQU8sQ0FBQ25CLEtBQUssQ0FBQ2UsS0FBUCxDQUhBOztBQUFBO0FBR3ZCSyxZQUFBQSxPQUh1QjtBQUl2QkMsWUFBQUEsUUFKdUIsR0FJWjtBQUFFbkIsY0FBQUEsSUFBSSxFQUFFLGtCQUFSO0FBQTRCQyxjQUFBQSxVQUFVLEVBQUU7QUFBeEMsYUFKWTtBQUs3Qm1CLFlBQUFBLE1BQU0sQ0FBQ0YsT0FBRCxDQUFOLENBQWdCRyxhQUFoQixDQUE4QkYsUUFBOUI7QUFDQUMsWUFBQUEsTUFBTSxDQUFDbEIsU0FBRCxDQUFOLENBQWtCb0IscUJBQWxCLENBQXdDLENBQXhDOztBQU42QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUE3QixHQUFGO0FBU0FOLEVBQUFBLEVBQUUsQ0FBQyx5QkFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLCtCQUE0QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDNUJsQixZQUFBQSxLQUFLLENBQUNTLE9BQU4sR0FBZ0IsS0FBaEI7QUFDQVQsWUFBQUEsS0FBSyxDQUFDRSxJQUFOLEdBQWEsNENBQWI7QUFDTWlCLFlBQUFBLE9BSHNCLEdBR1pYLFVBQVUsRUFIRTtBQUFBO0FBQUEsbUJBSU5XLE9BQU8sQ0FBQ25CLEtBQUssQ0FBQ2UsS0FBUCxDQUpEOztBQUFBO0FBSXRCSyxZQUFBQSxPQUpzQjtBQUt0QkMsWUFBQUEsUUFMc0IsR0FLWDtBQUFFbkIsY0FBQUEsSUFBSSxFQUFFLDRDQUFSO0FBQXNEQyxjQUFBQSxVQUFVLEVBQUU7QUFBbEUsYUFMVztBQU01Qm1CLFlBQUFBLE1BQU0sQ0FBQ0YsT0FBRCxDQUFOLENBQWdCRyxhQUFoQixDQUE4QkYsUUFBOUI7QUFDQUMsWUFBQUEsTUFBTSxDQUFDbEIsU0FBRCxDQUFOLENBQWtCb0IscUJBQWxCLENBQXdDLENBQXhDOztBQVA0QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUE1QixHQUFGO0FBVUF6QixFQUFBQSxRQUFRLENBQUMscUJBQUQsRUFBd0IsWUFBTTtBQUNwQ21CLElBQUFBLEVBQUUsQ0FBQywwQ0FBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlDQUE2QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDN0NsQixjQUFBQSxLQUFLLENBQUNVLFFBQU4sR0FBaUIsVUFBQ2UsQ0FBRCxFQUFZQyxDQUFaO0FBQUEsdUJBQXdCRCxDQUFDLEtBQUssTUFBTixHQUFlLGtCQUFmLEdBQW9DQyxDQUE1RDtBQUFBLGVBQWpCOztBQUNNUCxjQUFBQSxPQUZ1QyxHQUU3QlgsVUFBVSxFQUZtQjtBQUFBO0FBQUEscUJBR3ZCVyxPQUFPLENBQUNuQixLQUFLLENBQUNlLEtBQVAsQ0FIZ0I7O0FBQUE7QUFHdkNLLGNBQUFBLE9BSHVDO0FBSXZDQyxjQUFBQSxRQUp1QyxHQUk1QjtBQUFFbkIsZ0JBQUFBLElBQUksRUFBRSw2QkFBUjtBQUF1Q0MsZ0JBQUFBLFVBQVUsRUFBRTtBQUFuRCxlQUo0QjtBQUs3Q21CLGNBQUFBLE1BQU0sQ0FBQ0YsT0FBRCxDQUFOLENBQWdCRyxhQUFoQixDQUE4QkYsUUFBOUI7QUFDQUMsY0FBQUEsTUFBTSxDQUFDbEIsU0FBRCxDQUFOLENBQWtCb0IscUJBQWxCLENBQXdDLENBQXhDOztBQU42QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUE3QyxHQUFGO0FBU0FOLElBQUFBLEVBQUUsQ0FBQyx3Q0FBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlDQUEyQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDM0NsQixjQUFBQSxLQUFLLENBQUNFLElBQU4sR0FBYSwrQ0FBYjtBQUNBRixjQUFBQSxLQUFLLENBQUNVLFFBQU4sR0FBaUIsQ0FBQyxNQUFELENBQWpCO0FBQ01TLGNBQUFBLE9BSHFDLEdBRzNCWCxVQUFVLEVBSGlCO0FBQUE7QUFBQSxxQkFJckJXLE9BQU8sQ0FBQ25CLEtBQUssQ0FBQ2UsS0FBUCxDQUpjOztBQUFBO0FBSXJDSyxjQUFBQSxPQUpxQztBQUtyQ0MsY0FBQUEsUUFMcUMsR0FLMUI7QUFBRW5CLGdCQUFBQSxJQUFJLEVBQUUsMEJBQVI7QUFBb0NDLGdCQUFBQSxVQUFVLEVBQUU7QUFBaEQsZUFMMEI7QUFNM0NtQixjQUFBQSxNQUFNLENBQUNGLE9BQUQsQ0FBTixDQUFnQkcsYUFBaEIsQ0FBOEJGLFFBQTlCO0FBQ0FDLGNBQUFBLE1BQU0sQ0FBQ2xCLFNBQUQsQ0FBTixDQUFrQm9CLHFCQUFsQixDQUF3QyxDQUF4Qzs7QUFQMkM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBM0MsR0FBRjtBQVVBTixJQUFBQSxFQUFFLENBQUMsdUNBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQ0FBMEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQzFDbEIsY0FBQUEsS0FBSyxDQUFDWSxPQUFOLEdBQWdCLENBQWhCO0FBQ01PLGNBQUFBLE9BRm9DLEdBRTFCWCxVQUFVLEVBRmdCO0FBQUE7QUFBQSxxQkFHcEJXLE9BQU8sQ0FBQ25CLEtBQUssQ0FBQ2UsS0FBUCxDQUhhOztBQUFBO0FBR3BDSyxjQUFBQSxPQUhvQztBQUlwQ0MsY0FBQUEsUUFKb0MsR0FJekI7QUFBRW5CLGdCQUFBQSxJQUFJLEVBQUUsaUNBQVI7QUFBMkNDLGdCQUFBQSxVQUFVLEVBQUU7QUFBdkQsZUFKeUI7QUFLMUNtQixjQUFBQSxNQUFNLENBQUNGLE9BQUQsQ0FBTixDQUFnQkcsYUFBaEIsQ0FBOEJGLFFBQTlCO0FBQ0FDLGNBQUFBLE1BQU0sQ0FBQ2xCLFNBQUQsQ0FBTixDQUFrQm9CLHFCQUFsQixDQUF3QyxDQUF4Qzs7QUFOMEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBMUMsR0FBRjtBQVNBTixJQUFBQSxFQUFFLENBQUMsdUNBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQ0FBMEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQzFDbEIsY0FBQUEsS0FBSyxDQUFDWSxPQUFOLEdBQWdCLElBQWhCO0FBQ01PLGNBQUFBLE9BRm9DLEdBRTFCWCxVQUFVLEVBRmdCO0FBQUE7QUFBQSxxQkFHcEJXLE9BQU8sQ0FBQ25CLEtBQUssQ0FBQ2UsS0FBUCxDQUhhOztBQUFBO0FBR3BDSyxjQUFBQSxPQUhvQztBQUlwQ0MsY0FBQUEsUUFKb0MsR0FJekI7QUFBRW5CLGdCQUFBQSxJQUFJLEVBQUUsaUNBQVI7QUFBMkNDLGdCQUFBQSxVQUFVLEVBQUU7QUFBdkQsZUFKeUI7QUFLMUNtQixjQUFBQSxNQUFNLENBQUNGLE9BQUQsQ0FBTixDQUFnQkcsYUFBaEIsQ0FBOEJGLFFBQTlCO0FBQ0FDLGNBQUFBLE1BQU0sQ0FBQ2xCLFNBQUQsQ0FBTixDQUFrQm9CLHFCQUFsQixDQUF3QyxDQUF4Qzs7QUFOMEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBMUMsR0FBRjtBQVFELEdBckNPLENBQVI7QUF1Q0F6QixFQUFBQSxRQUFRLENBQUMsaUJBQUQsRUFBb0IsWUFBTTtBQUNoQ21CLElBQUFBLEVBQUUsQ0FBQyx5Q0FBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlDQUE0QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDNUNsQixjQUFBQSxLQUFLLENBQUNFLElBQU4sR0FBYSwrQ0FBYjs7QUFDQUYsY0FBQUEsS0FBSyxDQUFDVyxPQUFOLEdBQWdCLFVBQUNjLENBQUQsRUFBWUMsQ0FBWjtBQUFBLHVCQUF3QkQsQ0FBQyxLQUFLLE9BQU4sR0FBZ0IsSUFBaEIsR0FBdUJDLENBQS9DO0FBQUEsZUFBaEI7O0FBQ01QLGNBQUFBLE9BSHNDLEdBRzVCWCxVQUFVLEVBSGtCO0FBQUE7QUFBQSxxQkFJdEJXLE9BQU8sQ0FBQ25CLEtBQUssQ0FBQ2UsS0FBUCxDQUplOztBQUFBO0FBSXRDSyxjQUFBQSxPQUpzQztBQUt0Q0MsY0FBQUEsUUFMc0MsR0FLM0I7QUFBRW5CLGdCQUFBQSxJQUFJLEVBQUUsdUNBQVI7QUFBaURDLGdCQUFBQSxVQUFVLEVBQUU7QUFBN0QsZUFMMkI7QUFNNUNtQixjQUFBQSxNQUFNLENBQUNGLE9BQUQsQ0FBTixDQUFnQkcsYUFBaEIsQ0FBOEJGLFFBQTlCO0FBQ0FDLGNBQUFBLE1BQU0sQ0FBQ2xCLFNBQUQsQ0FBTixDQUFrQm9CLHFCQUFsQixDQUF3QyxDQUF4Qzs7QUFQNEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBNUMsR0FBRjtBQVNELEdBVk8sQ0FBUjtBQVdELENBNUdPLENBQVIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmb3JtYXRKU09OIH0gZnJvbSAnLi9mb3JtYXQtanNvbic7XG5pbXBvcnQgeyBudWxsTG9nZ2VyIGFzIGxvZ2dlciB9IGZyb20gJy4uL3V0aWxzJztcblxuZGVzY3JpYmUoJ2Zvcm1hdEpTT04gZGVjb3JhdG9yJywgKCkgPT4ge1xuICBjb25zdCBzdGF0ZTogeyBbazogc3RyaW5nXTogYW55IH0gPSB7fTtcblxuICAvLyBzaW1wbGUgTGFtYmRhIGhhbmRsZXJcbiAgY29uc3QgbW9ja0hhbmRsZXIgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgeyBib2R5IH0gPSBzdGF0ZTtcbiAgICByZXR1cm4geyBib2R5LCBzdGF0dXNDb2RlOiAyMDAgfTtcbiAgfTtcblxuICAvLyBsb2dnaW5nIGZ1bmN0aW9uIGZvciB0aGVzZSB0ZXN0cyB0byBzcHkgb25cbiAgY29uc3QgbG9nZ2VyU3B5ID0gamVzdC5zcHlPbihsb2dnZXIsICd3YXJuJyk7XG5cbiAgLy8gVGhlIGRlY29yYXRvcmVkIGhhbmRsZXIgdXNpbmcgb3B0aW9ucyBmcm9tIHN0YXRlXG4gIGNvbnN0IGdldEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBlbmFibGVkLCByZXBsYWNlciwgcmV2aXZlciwgc3BhY2luZyB9ID0gc3RhdGU7XG4gICAgcmV0dXJuIGZvcm1hdEpTT04obW9ja0hhbmRsZXIsIHsgZW5hYmxlZCwgbG9nZ2VyLCByZXBsYWNlciwgcmV2aXZlciwgc3BhY2luZyB9KTtcbiAgfTtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBzdGF0ZS5ib2R5ID0gJ3sgXCJkYXRhXCI6IFwiSGVsbG8sIFdvcmxkIVwiIH0nO1xuICAgIHN0YXRlLmVuYWJsZWQgPSB1bmRlZmluZWQ7XG4gICAgc3RhdGUuZXZlbnQgPSB7fTtcbiAgICBzdGF0ZS5yZXBsYWNlciA9IHVuZGVmaW5lZDtcbiAgICBzdGF0ZS5yZXZpdmVyID0gdW5kZWZpbmVkO1xuICAgIHN0YXRlLnNwYWNpbmcgPSB1bmRlZmluZWQ7XG4gIH0pO1xuXG4gIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgbG9nZ2VyU3B5Lm1vY2tDbGVhcigpO1xuICB9KTtcblxuICBpdCgnSGFzIHJlYXNvbmFibGUgZGVmYXVsdHMnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlciA9IGdldEhhbmRsZXIoKTtcbiAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgaGFuZGxlcihzdGF0ZS5ldmVudCk7XG4gICAgY29uc3QgZXhwZWN0ZWQgPSB7IGJvZHk6ICd7XCJkYXRhXCI6XCJIZWxsbywgV29ybGQhXCJ9Jywgc3RhdHVzQ29kZTogMjAwIH07XG4gICAgZXhwZWN0KHJlc3VsdHMpLnRvTWF0Y2hPYmplY3QoZXhwZWN0ZWQpO1xuICAgIGV4cGVjdChsb2dnZXJTcHkpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygwKTtcbiAgfSk7XG5cbiAgaXQoJ0hhbmRsZXMgdW5wYXJzYWJsZSBpbnB1dCcsIGFzeW5jICgpID0+IHtcbiAgICBzdGF0ZS5ib2R5ID0gJ1RoaXMgaXMgTm90IEpTT04nO1xuICAgIGNvbnN0IGhhbmRsZXIgPSBnZXRIYW5kbGVyKCk7XG4gICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IGhhbmRsZXIoc3RhdGUuZXZlbnQpO1xuICAgIGNvbnN0IGV4cGVjdGVkID0geyBib2R5OiAnVGhpcyBpcyBOb3QgSlNPTicsIHN0YXR1c0NvZGU6IDIwMCB9O1xuICAgIGV4cGVjdChyZXN1bHRzKS50b01hdGNoT2JqZWN0KGV4cGVjdGVkKTtcbiAgICBleHBlY3QobG9nZ2VyU3B5KS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMSk7XG4gIH0pO1xuXG4gIGl0KCdIb25vcnMgdGhlIGVuYWJsZWQgZmxhZycsIGFzeW5jICgpID0+IHtcbiAgICBzdGF0ZS5lbmFibGVkID0gZmFsc2U7XG4gICAgc3RhdGUuYm9keSA9ICd7XFxuXFxuXFxuXCJkYXRhXCI6XFx0XFx0XFx0XCJIZWxsbywgV29ybGQhXCJcXG5cXG5cXG59JztcbiAgICBjb25zdCBoYW5kbGVyID0gZ2V0SGFuZGxlcigpO1xuICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBoYW5kbGVyKHN0YXRlLmV2ZW50KTtcbiAgICBjb25zdCBleHBlY3RlZCA9IHsgYm9keTogJ3tcXG5cXG5cXG5cImRhdGFcIjpcXHRcXHRcXHRcIkhlbGxvLCBXb3JsZCFcIlxcblxcblxcbn0nLCBzdGF0dXNDb2RlOiAyMDAgfTtcbiAgICBleHBlY3QocmVzdWx0cykudG9NYXRjaE9iamVjdChleHBlY3RlZCk7XG4gICAgZXhwZWN0KGxvZ2dlclNweSkudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDApO1xuICB9KTtcblxuICBkZXNjcmliZSgnSlNPTi5zdHJpbmdpZnkgYXJncycsICgpID0+IHtcbiAgICBpdCgnQWNjZXB0cyBhIGZ1bmN0aW9uIGZvciByZXBsYWNlciBhcmd1bWVudCcsIGFzeW5jICgpID0+IHtcbiAgICAgIHN0YXRlLnJlcGxhY2VyID0gKGs6IHN0cmluZywgdjogYW55KSA9PiAoayA9PT0gJ2RhdGEnID8gJ0hlbGxvLCBSZXBsYWNlciEnIDogdik7XG4gICAgICBjb25zdCBoYW5kbGVyID0gZ2V0SGFuZGxlcigpO1xuICAgICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IGhhbmRsZXIoc3RhdGUuZXZlbnQpO1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSB7IGJvZHk6ICd7XCJkYXRhXCI6XCJIZWxsbywgUmVwbGFjZXIhXCJ9Jywgc3RhdHVzQ29kZTogMjAwIH07XG4gICAgICBleHBlY3QocmVzdWx0cykudG9NYXRjaE9iamVjdChleHBlY3RlZCk7XG4gICAgICBleHBlY3QobG9nZ2VyU3B5KS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWNjZXB0cyBhbiBhcnJheSBmb3IgcmVwbGFjZXIgYXJndW1lbnQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBzdGF0ZS5ib2R5ID0gJ3sgXCJkYXRhXCI6IFwiSGVsbG8sIFdvcmxkIVwiLCBcImV4dHJhXCI6IFwic3R1ZmZcIiB9JztcbiAgICAgIHN0YXRlLnJlcGxhY2VyID0gWydkYXRhJ107XG4gICAgICBjb25zdCBoYW5kbGVyID0gZ2V0SGFuZGxlcigpO1xuICAgICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IGhhbmRsZXIoc3RhdGUuZXZlbnQpO1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSB7IGJvZHk6ICd7XCJkYXRhXCI6XCJIZWxsbywgV29ybGQhXCJ9Jywgc3RhdHVzQ29kZTogMjAwIH07XG4gICAgICBleHBlY3QocmVzdWx0cykudG9NYXRjaE9iamVjdChleHBlY3RlZCk7XG4gICAgICBleHBlY3QobG9nZ2VyU3B5KS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWNjZXB0cyBhIG51bWJlciBmb3Igc3BhY2luZyBhcmd1bWVudCcsIGFzeW5jICgpID0+IHtcbiAgICAgIHN0YXRlLnNwYWNpbmcgPSAyO1xuICAgICAgY29uc3QgaGFuZGxlciA9IGdldEhhbmRsZXIoKTtcbiAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBoYW5kbGVyKHN0YXRlLmV2ZW50KTtcbiAgICAgIGNvbnN0IGV4cGVjdGVkID0geyBib2R5OiAne1xcbiAgXCJkYXRhXCI6IFwiSGVsbG8sIFdvcmxkIVwiXFxufScsIHN0YXR1c0NvZGU6IDIwMCB9O1xuICAgICAgZXhwZWN0KHJlc3VsdHMpLnRvTWF0Y2hPYmplY3QoZXhwZWN0ZWQpO1xuICAgICAgZXhwZWN0KGxvZ2dlclNweSkudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDApO1xuICAgIH0pO1xuXG4gICAgaXQoJ0FjY2VwdHMgYSBzdHJpbmcgZm9yIHNwYWNpbmcgYXJndW1lbnQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBzdGF0ZS5zcGFjaW5nID0gJ1xcdCc7XG4gICAgICBjb25zdCBoYW5kbGVyID0gZ2V0SGFuZGxlcigpO1xuICAgICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IGhhbmRsZXIoc3RhdGUuZXZlbnQpO1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSB7IGJvZHk6ICd7XFxuXFx0XCJkYXRhXCI6IFwiSGVsbG8sIFdvcmxkIVwiXFxufScsIHN0YXR1c0NvZGU6IDIwMCB9O1xuICAgICAgZXhwZWN0KHJlc3VsdHMpLnRvTWF0Y2hPYmplY3QoZXhwZWN0ZWQpO1xuICAgICAgZXhwZWN0KGxvZ2dlclNweSkudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDApO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnSlNPTi5wYXJzZSBhcmdzJywgKCkgPT4ge1xuICAgIGl0KCdBY2NlcHRzIGEgZnVuY3Rpb24gZm9yIHJldml2ZXIgYXJndW1lbnQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBzdGF0ZS5ib2R5ID0gJ3sgXCJkYXRhXCI6IFwiSGVsbG8sIFdvcmxkIVwiLCBcImV4dHJhXCI6IFwic3R1ZmZcIiB9JztcbiAgICAgIHN0YXRlLnJldml2ZXIgPSAoazogc3RyaW5nLCB2OiBhbnkpID0+IChrID09PSAnZXh0cmEnID8gbnVsbCA6IHYpO1xuICAgICAgY29uc3QgaGFuZGxlciA9IGdldEhhbmRsZXIoKTtcbiAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBoYW5kbGVyKHN0YXRlLmV2ZW50KTtcbiAgICAgIGNvbnN0IGV4cGVjdGVkID0geyBib2R5OiAne1wiZGF0YVwiOlwiSGVsbG8sIFdvcmxkIVwiLFwiZXh0cmFcIjpudWxsfScsIHN0YXR1c0NvZGU6IDIwMCB9O1xuICAgICAgZXhwZWN0KHJlc3VsdHMpLnRvTWF0Y2hPYmplY3QoZXhwZWN0ZWQpO1xuICAgICAgZXhwZWN0KGxvZ2dlclNweSkudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDApO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19