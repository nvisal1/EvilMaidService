import * as jwt from 'express-jwt';

export const enforceTokenAccess = jwt({
  secret: process.env.KEY,
  issuer: process.env.ISSUER,
  getToken: req => {
    if (req.cookies && req.cookies.presence) {
      return req.cookies.presence;
    }
    if (
      req.headers.authorization &&
      typeof req.headers.authorization === 'string' &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      return req.headers.authorization.split(' ')[1];
    }

    return null;
  },
});
