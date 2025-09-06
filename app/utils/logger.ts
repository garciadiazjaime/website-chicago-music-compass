export const loggerInfo = (msg: string, metadata?: Record<any, any>) => {
  if (process.env.NEXT_PUBLIC_LOGS !== "true") return;

  console.log(msg, metadata);
};

export const loggerWarn = (msg: string, metadata?: Record<any, any>) => {
  console.warn(msg, metadata);
};

export const loggerError = (msg: string, metadata?: Record<any, any>) => {
  console.error(msg, metadata);
};
