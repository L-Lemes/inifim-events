import { jwtVerify, SignJWT } from "jose";

export const REFRESH_SECRET_KEY = new TextEncoder().encode(process.env.REFRESH_ACCESS_TOKEN);

export const generateRefreshToken = async (userId: string) => {
  return new SignJWT({ id: userId })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(REFRESH_SECRET_KEY);
};

export const verifyRefreshToken = async (token: string) => {
  const { payload } = await jwtVerify(token, REFRESH_SECRET_KEY);
  return payload;
};