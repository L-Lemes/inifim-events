import { NextFunction, Request, Response } from "express";
import { jwtVerify, SignJWT } from "jose";
import { v4 as uuidv4 } from "uuid";
import { SECRET_KEY } from "../utils/generate-jwt.js";
import { REFRESH_SECRET_KEY } from "../utils/generate-refresh-jwt.js";

export class TokenRenewalMiddleware {
  handle = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    
    if (!authHeader)  {
      res.status(401).json({ message: "E o token vida ?" })
      return;
    }

    try {
      const token = authHeader.split(" ")[1]

      const { payload } = await jwtVerify(token, SECRET_KEY)
      console.log(payload)

      const currentTime = Math.floor(Date.now() / 1000)
      const timeToExpire = (payload.exp as number) - currentTime

      if (timeToExpire < 300) {
        const newAccessToken = await new SignJWT({ userId: payload.userId })
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime("15m")
          .sign(SECRET_KEY);
        
        const newRefreshToken = await new SignJWT({ userId: payload.userId, sessionId: uuidv4() })
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime("7d") 
          .sign(REFRESH_SECRET_KEY);

        res.cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 3600 * 1000 //1w
        });

        res.setHeader("x-new-access-token", newAccessToken);
      }

      next()
    } catch (error) {
      if(error instanceof Error) res.status(403).json({ message: error.message });
    }
}  
};
