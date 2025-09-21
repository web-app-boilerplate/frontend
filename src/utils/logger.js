const LEVELS = {
    INFO: "info",
    WARN: "warn",
    ERROR: "error",
};

const log = (level, message, meta = {}) => {
    const logObject = {
        level,
        message,
        meta,
        timestamp: new Date().toISOString(),
    };
    console[level](logObject); // logs to browser console

    // Optional: send logs to backend API for centralization
    // fetch("http://localhost:4000/api/logs", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(logObject),
    // });
};

const info = (message, meta) => log(LEVELS.INFO, message, meta);
const warn = (message, meta) => log(LEVELS.WARN, message, meta);
const error = (message, meta) => log(LEVELS.ERROR, message, meta);

export default { info, warn, error };
