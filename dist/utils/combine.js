"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combine = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var normalizeDecoratorInput = function normalizeDecoratorInput(input) {
  if (typeof input === 'function') {
    var _decorator = input;
    return [_decorator];
  }

  var _input = (0, _toArray2["default"])(input),
      decorator = _input[0],
      args = _input.slice(1);

  if (typeof decorator === 'function') {
    return [decorator].concat((0, _toConsumableArray2["default"])(args));
  }
};

var applyDecorators = function applyDecorators(target, current) {
  var _current = (0, _toArray2["default"])(current),
      decorator = _current[0],
      args = _current.slice(1);

  return decorator.apply(void 0, [target].concat((0, _toConsumableArray2["default"])(args)));
};
/**
 * Apply an array of decorators to a function.
 *
 * Decorators exist in TypeScript but are applied to Classes and Methods; they
 * are not applied to functions.
 *
 * The array of decorators are applied from right-to-left to replicate the
 * same behavior of decorator stacking.
 *
 * ```ts
 * // Example of two decorators applied to a class method
 * class C {
 *   @f()
 *   @g()
 *   method() {}
 * }
 * // f(): f is evaluated first
 * // g(): g is evaluated second
 * // g(): g is called third
 * // f(): f is called fourth
 * ```
 */


var combine = function combine(target, decorators) {
  return decorators.map(normalizeDecoratorInput).filter(function (x) {
    return x;
  }).reduceRight(applyDecorators, target);
};

exports.combine = combine;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9jb21iaW5lLnRzIl0sIm5hbWVzIjpbIm5vcm1hbGl6ZURlY29yYXRvcklucHV0IiwiaW5wdXQiLCJkZWNvcmF0b3IiLCJhcmdzIiwiYXBwbHlEZWNvcmF0b3JzIiwidGFyZ2V0IiwiY3VycmVudCIsImNvbWJpbmUiLCJkZWNvcmF0b3JzIiwibWFwIiwiZmlsdGVyIiwieCIsInJlZHVjZVJpZ2h0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsdUJBQXVCLEdBQUcsU0FBMUJBLHVCQUEwQixDQUFDQyxLQUFELEVBQThDO0FBQzVFLE1BQUksT0FBT0EsS0FBUCxLQUFpQixVQUFyQixFQUFpQztBQUMvQixRQUFNQyxVQUFTLEdBQUdELEtBQWxCO0FBQ0EsV0FBTyxDQUFDQyxVQUFELENBQVA7QUFDRDs7QUFKMkUseUNBTS9DRCxLQU4rQztBQUFBLE1BTXJFQyxTQU5xRTtBQUFBLE1BTXZEQyxJQU51RDs7QUFRNUUsTUFBSSxPQUFPRCxTQUFQLEtBQXFCLFVBQXpCLEVBQXFDO0FBQ25DLFlBQVFBLFNBQVIsNkNBQXNCQyxJQUF0QjtBQUNEO0FBQ0YsQ0FYRDs7QUFhQSxJQUFNQyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUNDLE1BQUQsRUFBbUJDLE9BQW5CLEVBQTREO0FBQUEsMkNBQ3JEQSxPQURxRDtBQUFBLE1BQzNFSixTQUQyRTtBQUFBLE1BQzdEQyxJQUQ2RDs7QUFFbEYsU0FBT0QsU0FBUyxNQUFULFVBQVVHLE1BQVYsNkNBQXFCRixJQUFyQixHQUFQO0FBQ0QsQ0FIRDtBQUtBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQk8sSUFBTUksT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBQ0YsTUFBRCxFQUFtQkcsVUFBbkIsRUFBbUQ7QUFDeEUsU0FBT0EsVUFBVSxDQUNkQyxHQURJLENBQ0FULHVCQURBLEVBRUpVLE1BRkksQ0FFRyxVQUFDQyxDQUFEO0FBQUEsV0FBT0EsQ0FBUDtBQUFBLEdBRkgsRUFHSkMsV0FISSxDQUdRUixlQUhSLEVBR3lCQyxNQUh6QixDQUFQO0FBSUQsQ0FMTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERlY29yYXRvcklucHV0LCBEZWNvcmF0b3JXaXRoQXJncyB9IGZyb20gJy4uL3R5cGVzJztcblxuY29uc3Qgbm9ybWFsaXplRGVjb3JhdG9ySW5wdXQgPSAoaW5wdXQ6IERlY29yYXRvcklucHV0KTogRGVjb3JhdG9yV2l0aEFyZ3MgPT4ge1xuICBpZiAodHlwZW9mIGlucHV0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3QgZGVjb3JhdG9yID0gaW5wdXQ7XG4gICAgcmV0dXJuIFtkZWNvcmF0b3JdO1xuICB9XG5cbiAgY29uc3QgW2RlY29yYXRvciwgLi4uYXJnc10gPSBpbnB1dDtcblxuICBpZiAodHlwZW9mIGRlY29yYXRvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBbZGVjb3JhdG9yLCAuLi5hcmdzXTtcbiAgfVxufTtcblxuY29uc3QgYXBwbHlEZWNvcmF0b3JzID0gKHRhcmdldDogRnVuY3Rpb24sIGN1cnJlbnQ6IERlY29yYXRvcldpdGhBcmdzKTogRnVuY3Rpb24gPT4ge1xuICBjb25zdCBbZGVjb3JhdG9yLCAuLi5hcmdzXSA9IGN1cnJlbnQ7XG4gIHJldHVybiBkZWNvcmF0b3IodGFyZ2V0LCAuLi5hcmdzKTtcbn07XG5cbi8qKlxuICogQXBwbHkgYW4gYXJyYXkgb2YgZGVjb3JhdG9ycyB0byBhIGZ1bmN0aW9uLlxuICpcbiAqIERlY29yYXRvcnMgZXhpc3QgaW4gVHlwZVNjcmlwdCBidXQgYXJlIGFwcGxpZWQgdG8gQ2xhc3NlcyBhbmQgTWV0aG9kczsgdGhleVxuICogYXJlIG5vdCBhcHBsaWVkIHRvIGZ1bmN0aW9ucy5cbiAqXG4gKiBUaGUgYXJyYXkgb2YgZGVjb3JhdG9ycyBhcmUgYXBwbGllZCBmcm9tIHJpZ2h0LXRvLWxlZnQgdG8gcmVwbGljYXRlIHRoZVxuICogc2FtZSBiZWhhdmlvciBvZiBkZWNvcmF0b3Igc3RhY2tpbmcuXG4gKlxuICogYGBgdHNcbiAqIC8vIEV4YW1wbGUgb2YgdHdvIGRlY29yYXRvcnMgYXBwbGllZCB0byBhIGNsYXNzIG1ldGhvZFxuICogY2xhc3MgQyB7XG4gKiAgIEBmKClcbiAqICAgQGcoKVxuICogICBtZXRob2QoKSB7fVxuICogfVxuICogLy8gZigpOiBmIGlzIGV2YWx1YXRlZCBmaXJzdFxuICogLy8gZygpOiBnIGlzIGV2YWx1YXRlZCBzZWNvbmRcbiAqIC8vIGcoKTogZyBpcyBjYWxsZWQgdGhpcmRcbiAqIC8vIGYoKTogZiBpcyBjYWxsZWQgZm91cnRoXG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNvbnN0IGNvbWJpbmUgPSAodGFyZ2V0OiBGdW5jdGlvbiwgZGVjb3JhdG9yczogYW55W10pOiBGdW5jdGlvbiA9PiB7XG4gIHJldHVybiBkZWNvcmF0b3JzXG4gICAgLm1hcChub3JtYWxpemVEZWNvcmF0b3JJbnB1dClcbiAgICAuZmlsdGVyKCh4KSA9PiB4KVxuICAgIC5yZWR1Y2VSaWdodChhcHBseURlY29yYXRvcnMsIHRhcmdldCk7XG59O1xuIl19