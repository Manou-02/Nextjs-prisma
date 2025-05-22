const validate = (token: string) => {
  const validToken = true;

  if (!token || !validToken) {
    return false;
  }
  return true;
};

export const authMiddleware = (req: Request) => {
  console.log("aaaaaaaaa", req);

  const token = req.headers.get("authorization")?.split(" ")?.[0];
  return {
    isValid: validate(token as string),
  };
};
