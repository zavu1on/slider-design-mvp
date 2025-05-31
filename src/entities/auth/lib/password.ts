import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 8;
const SECRET_SALT = process.env.PASSWORD_SECRET || 'default_salt';

export const hashPassword = async (password: string): Promise<string> => {
  const saltedPassword = password + SECRET_SALT;
  return await bcrypt.hash(saltedPassword, SALT_ROUNDS);
};

export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  const saltedPassword = password + SECRET_SALT;
  return await bcrypt.compare(saltedPassword, hash);
};
