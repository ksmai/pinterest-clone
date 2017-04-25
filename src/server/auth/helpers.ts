export function ensureLogin(req: any, res: any, next: any) {
  if (req.user) {
    next();
    return;
  }

  const err = {
    status: 401,
    message: 'Unauthenticated',
  };
  next(err);
}

export function ensureNotLogin(req: any, res: any, next: any) {
  if (!req.user) {
    next();
    return;
  }

  const err = {
    status: 401,
    message: 'Already authenticated',
  };
  next(err);
}
