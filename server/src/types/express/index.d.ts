import type { JwtPayload } from "../../modules/item/auth/authMiddleware";
import type { User } from "../../modules/item/users/usersRepository";

declare global {
  namespace Express {
    export interface Request {
      /* ************************************************************************* */
      // Add your custom properties here, for example:
      //
      // user?: { ... }
      user?: JwtPayload;
      user?: User;
      /* ************************************************************************* */
    }
  }
}
