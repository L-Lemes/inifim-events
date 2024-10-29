import { jwtVerify, SignJWT } from "jose";

export const SECRET_KEY = new TextEncoder().encode(process.env.ACCESS_TOKEN);

export const generateAccessToken = async (userId: string) => {
  return new SignJWT({ id: userId })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('20m')
      .sign(SECRET_KEY);
};


