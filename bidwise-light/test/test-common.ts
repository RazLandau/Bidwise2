import * as originalEventually from 'wix-eventually';

export const baseURL = `http://localhost:5554`;
export const dataHook = (hook: string) => `[data-hook="${hook}"]`;
export const eventually = originalEventually.with({
  timeout: 1000,
  interval: 10,
});
