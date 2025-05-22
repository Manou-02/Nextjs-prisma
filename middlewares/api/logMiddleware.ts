export const logMiddleware = (req: Request) => {
  return {
    method: req.method,
    url: req.url,
  };
};
