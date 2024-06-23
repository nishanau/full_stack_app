import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendVerificationEmail } from './email';

const prisma = new PrismaClient();

export const registerUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const emailVerificationToken = crypto.randomBytes(32).toString('hex');

  const user = await prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword,
      emailVerificationToken,
    },
  });

  await sendVerificationEmail(user, emailVerificationToken);

  return user;
};
