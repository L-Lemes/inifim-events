import { SignJWT } from "jose";

export const SECRET_KEY = new TextEncoder().encode(process.env.ACCESS_TOKEN);

export const generateAccessToken = async (userId: string) => {
  return new SignJWT({ id: userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('2m') // tem 1 mudar pra 15 dps
    .sign(SECRET_KEY);
};


