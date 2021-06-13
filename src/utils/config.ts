export const getConfig = (name: string): string => {
  const config = process.env[name];

  if (config == null) {
    throw new Error(`${name} should be not null. Configure at .env files.`);
  }
  return config;
};
