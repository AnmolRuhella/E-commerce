import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyToken = (req: Request): (JwtPayload & { isAdmin?: boolean }) | null => {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    
    // Ensure it's a valid payload
    if (typeof decoded === "string") return null;

    return decoded as JwtPayload & { isAdmin?: boolean };
  } catch (err) {
    return null;
  }
};
