const enabled = process.env.ENABLE_LOGGING === 'true';

exports.log = (...args) => {
  if (enabled) {
    console.log(...args);
  }
};

exports.error = (...args) => {
  if (enabled) {
    console.error(...args);
  }
};
