import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

export const register = async (
    username: string,
    email: string,
    password: string
) => {
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw new Error('Utilisateur déjà existant');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    passwordHash
  });

  const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
    expiresIn: '7d',
  });

  return {
    token,
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email
    },
  };
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Utilisateur non trouvé');

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw new Error('Mot de passe incorrect');

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: '7d',
  });

  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    },
  };
};
