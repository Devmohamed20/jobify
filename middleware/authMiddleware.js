import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/CustomErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";
import { StatusCodes } from "http-status-codes";
export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");
  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === "67a0daf1f4c381cd3ffd6d22";
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

export const authorizedPermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unaathorized to access this information");
    }
    next();
  };
};

export const checkForTestUser = async (req, res, next) => {
  if (req.user.testUser)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Demo user, Read only" });
  next();
};
