"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _combine = require("./combine");

describe('Decorators: combine (util)', function () {
  var state = {};
  /**
   * Mock decorator pushes its own label to the outer 'state' then
   * calls the target function.
   */

  var stateDecorator = function stateDecorator(target) {
    var label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var stateLabel = label;
    var labelOverride = options.labelOverride;

    if (labelOverride) {
      stateLabel = labelOverride;
    }

    state.appliedDecorators.push(stateLabel);
    return function () {
      return target.apply(void 0, arguments);
    };
  }; // simple Lambda handler


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
  }();

  beforeEach(function () {
    state.appliedDecorators = [];
  });
  it('should apply decorators so execution is left-right (or top-bottom)',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var decoratorsToApply, decorated, results, expected;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            decoratorsToApply = [// bare function
            stateDecorator, // array of a single function
            [stateDecorator], // array of a single function, followed by any number of args
            [stateDecorator, 'positional arg'], [stateDecorator, 'positional arg', {
              labelOverride: 'positional args'
            }]];
            decorated = (0, _combine.combine)(mockHandler, decoratorsToApply);
            _context2.next = 4;
            return decorated();

          case 4:
            results = _context2.sent;
            expected = {
              body: 'Hello, World!',
              statusCode: 200
            };
            expect(results).toMatchObject(expected);
            expect(state.appliedDecorators).toEqual(['positional args', 'positional arg', 'default', 'default']);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9jb21iaW5lLnRlc3QudHMiXSwibmFtZXMiOlsiZGVzY3JpYmUiLCJzdGF0ZSIsInN0YXRlRGVjb3JhdG9yIiwidGFyZ2V0IiwibGFiZWwiLCJvcHRpb25zIiwic3RhdGVMYWJlbCIsImxhYmVsT3ZlcnJpZGUiLCJhcHBsaWVkRGVjb3JhdG9ycyIsInB1c2giLCJtb2NrSGFuZGxlciIsImJvZHkiLCJzdGF0dXNDb2RlIiwiYmVmb3JlRWFjaCIsIml0IiwiZGVjb3JhdG9yc1RvQXBwbHkiLCJkZWNvcmF0ZWQiLCJyZXN1bHRzIiwiZXhwZWN0ZWQiLCJleHBlY3QiLCJ0b01hdGNoT2JqZWN0IiwidG9FcXVhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFFQUEsUUFBUSxDQUFDLDRCQUFELEVBQStCLFlBQU07QUFDM0MsTUFBTUMsS0FBMkIsR0FBRyxFQUFwQztBQUVBOzs7OztBQUlBLE1BQU1DLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FDckJDLE1BRHFCLEVBSVI7QUFBQSxRQUZiQyxLQUVhLHVFQUZMLFNBRUs7QUFBQSxRQURiQyxPQUNhLHVFQUR5QixFQUN6QjtBQUNiLFFBQUlDLFVBQVUsR0FBR0YsS0FBakI7QUFEYSxRQUVMRyxhQUZLLEdBRWFGLE9BRmIsQ0FFTEUsYUFGSzs7QUFJYixRQUFJQSxhQUFKLEVBQW1CO0FBQ2pCRCxNQUFBQSxVQUFVLEdBQUdDLGFBQWI7QUFDRDs7QUFFRE4sSUFBQUEsS0FBSyxDQUFDTyxpQkFBTixDQUF3QkMsSUFBeEIsQ0FBNkJILFVBQTdCO0FBRUEsV0FBTztBQUFBLGFBQW9CSCxNQUFNLE1BQU4sbUJBQXBCO0FBQUEsS0FBUDtBQUNELEdBZkQsQ0FQMkMsQ0F3QjNDOzs7QUFDQSxNQUFNTyxXQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQ0FBRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsK0NBQWE7QUFBRUMsZ0JBQUFBLElBQUksRUFBRSxlQUFSO0FBQXlCQyxnQkFBQUEsVUFBVSxFQUFFO0FBQXJDLGVBQWI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBSDs7QUFBQSxvQkFBWEYsV0FBVztBQUFBO0FBQUE7QUFBQSxLQUFqQjs7QUFFQUcsRUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZlosSUFBQUEsS0FBSyxDQUFDTyxpQkFBTixHQUEwQixFQUExQjtBQUNELEdBRlMsQ0FBVjtBQUlBTSxFQUFBQSxFQUFFLENBQUMsb0VBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSwrQkFBdUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ2pFQyxZQUFBQSxpQkFEaUUsR0FDN0MsQ0FDeEI7QUFDQWIsWUFBQUEsY0FGd0IsRUFJeEI7QUFDQSxhQUFDQSxjQUFELENBTHdCLEVBT3hCO0FBQ0EsYUFBQ0EsY0FBRCxFQUFpQixnQkFBakIsQ0FSd0IsRUFTeEIsQ0FBQ0EsY0FBRCxFQUFpQixnQkFBakIsRUFBbUM7QUFBRUssY0FBQUEsYUFBYSxFQUFFO0FBQWpCLGFBQW5DLENBVHdCLENBRDZDO0FBYWpFUyxZQUFBQSxTQWJpRSxHQWFyRCxzQkFBUU4sV0FBUixFQUFxQkssaUJBQXJCLENBYnFEO0FBQUE7QUFBQSxtQkFjakRDLFNBQVMsRUFkd0M7O0FBQUE7QUFjakVDLFlBQUFBLE9BZGlFO0FBZWpFQyxZQUFBQSxRQWZpRSxHQWV0RDtBQUFFUCxjQUFBQSxJQUFJLEVBQUUsZUFBUjtBQUF5QkMsY0FBQUEsVUFBVSxFQUFFO0FBQXJDLGFBZnNEO0FBaUJ2RU8sWUFBQUEsTUFBTSxDQUFDRixPQUFELENBQU4sQ0FBZ0JHLGFBQWhCLENBQThCRixRQUE5QjtBQUNBQyxZQUFBQSxNQUFNLENBQUNsQixLQUFLLENBQUNPLGlCQUFQLENBQU4sQ0FBZ0NhLE9BQWhDLENBQXdDLENBQ3RDLGlCQURzQyxFQUV0QyxnQkFGc0MsRUFHdEMsU0FIc0MsRUFJdEMsU0FKc0MsQ0FBeEM7O0FBbEJ1RTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUF2RSxHQUFGO0FBeUJELENBeERPLENBQVIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21iaW5lIH0gZnJvbSAnLi9jb21iaW5lJztcblxuZGVzY3JpYmUoJ0RlY29yYXRvcnM6IGNvbWJpbmUgKHV0aWwpJywgKCkgPT4ge1xuICBjb25zdCBzdGF0ZTogeyBbazogc3RyaW5nXTogYW55IH0gPSB7fTtcblxuICAvKipcbiAgICogTW9jayBkZWNvcmF0b3IgcHVzaGVzIGl0cyBvd24gbGFiZWwgdG8gdGhlIG91dGVyICdzdGF0ZScgdGhlblxuICAgKiBjYWxscyB0aGUgdGFyZ2V0IGZ1bmN0aW9uLlxuICAgKi9cbiAgY29uc3Qgc3RhdGVEZWNvcmF0b3IgPSAoXG4gICAgdGFyZ2V0OiBGdW5jdGlvbixcbiAgICBsYWJlbCA9ICdkZWZhdWx0JyxcbiAgICBvcHRpb25zOiB7IGxhYmVsT3ZlcnJpZGU/OiBzdHJpbmcgfSA9IHt9LFxuICApOiBGdW5jdGlvbiA9PiB7XG4gICAgbGV0IHN0YXRlTGFiZWwgPSBsYWJlbDtcbiAgICBjb25zdCB7IGxhYmVsT3ZlcnJpZGUgfSA9IG9wdGlvbnM7XG5cbiAgICBpZiAobGFiZWxPdmVycmlkZSkge1xuICAgICAgc3RhdGVMYWJlbCA9IGxhYmVsT3ZlcnJpZGU7XG4gICAgfVxuXG4gICAgc3RhdGUuYXBwbGllZERlY29yYXRvcnMucHVzaChzdGF0ZUxhYmVsKTtcblxuICAgIHJldHVybiAoLi4uYXJnczogYW55W10pID0+IHRhcmdldCguLi5hcmdzKTtcbiAgfTtcblxuICAvLyBzaW1wbGUgTGFtYmRhIGhhbmRsZXJcbiAgY29uc3QgbW9ja0hhbmRsZXIgPSBhc3luYyAoKSA9PiAoeyBib2R5OiAnSGVsbG8sIFdvcmxkIScsIHN0YXR1c0NvZGU6IDIwMCB9KTtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBzdGF0ZS5hcHBsaWVkRGVjb3JhdG9ycyA9IFtdO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGFwcGx5IGRlY29yYXRvcnMgc28gZXhlY3V0aW9uIGlzIGxlZnQtcmlnaHQgKG9yIHRvcC1ib3R0b20pJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGRlY29yYXRvcnNUb0FwcGx5ID0gW1xuICAgICAgLy8gYmFyZSBmdW5jdGlvblxuICAgICAgc3RhdGVEZWNvcmF0b3IsXG5cbiAgICAgIC8vIGFycmF5IG9mIGEgc2luZ2xlIGZ1bmN0aW9uXG4gICAgICBbc3RhdGVEZWNvcmF0b3JdLFxuXG4gICAgICAvLyBhcnJheSBvZiBhIHNpbmdsZSBmdW5jdGlvbiwgZm9sbG93ZWQgYnkgYW55IG51bWJlciBvZiBhcmdzXG4gICAgICBbc3RhdGVEZWNvcmF0b3IsICdwb3NpdGlvbmFsIGFyZyddLFxuICAgICAgW3N0YXRlRGVjb3JhdG9yLCAncG9zaXRpb25hbCBhcmcnLCB7IGxhYmVsT3ZlcnJpZGU6ICdwb3NpdGlvbmFsIGFyZ3MnIH1dLFxuICAgIF07XG5cbiAgICBjb25zdCBkZWNvcmF0ZWQgPSBjb21iaW5lKG1vY2tIYW5kbGVyLCBkZWNvcmF0b3JzVG9BcHBseSk7XG4gICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IGRlY29yYXRlZCgpO1xuICAgIGNvbnN0IGV4cGVjdGVkID0geyBib2R5OiAnSGVsbG8sIFdvcmxkIScsIHN0YXR1c0NvZGU6IDIwMCB9O1xuXG4gICAgZXhwZWN0KHJlc3VsdHMpLnRvTWF0Y2hPYmplY3QoZXhwZWN0ZWQpO1xuICAgIGV4cGVjdChzdGF0ZS5hcHBsaWVkRGVjb3JhdG9ycykudG9FcXVhbChbXG4gICAgICAncG9zaXRpb25hbCBhcmdzJyxcbiAgICAgICdwb3NpdGlvbmFsIGFyZycsXG4gICAgICAnZGVmYXVsdCcsXG4gICAgICAnZGVmYXVsdCcsXG4gICAgXSk7XG4gIH0pO1xufSk7XG4iXX0=