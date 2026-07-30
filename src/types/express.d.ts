import type { JwtUserPayload } from "./jwt.types.js";

declare global {
  namespace Express {
    interface Request {
      user?: JwtUserPayload;
      [key: string]: any;
    }
  }
}
