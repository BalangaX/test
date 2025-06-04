const enabled = import.meta.env.VITE_ENABLE_LOGGING === 'true';

export function log(...args) {
  if (enabled) {
    console.log(...args);
  }
}

export function error(...args) {
  if (enabled) {
    console.error(...args);
  }
}

export default { log, error };
