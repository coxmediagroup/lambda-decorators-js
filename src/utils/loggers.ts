import { Logger } from '../types';

// Logger implements the error method which does nothing.
export const nullLogger: Logger = {
  error() {},
  info() {},
  log() {},
  warn() {},
};
