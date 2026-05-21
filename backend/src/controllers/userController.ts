import bcrypt from 'bcryptjs';
import type { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import validator from "validator";
import type { IUser } from "../models/userModel.js";
import User from "../models/userModel.js";

const createToken = (id: string) => {
    return jwt.sign({ id }, process.env.SECRET as string, {expiresIn: "1d"})
}


export const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) return res.status(400).json({ error: "All fields must be filled." });
  if (!validator.isEmail(email)) return res.status(400).json({ error: "Invalid email." });
  if (!validator.isStrongPassword(password)) return res.status(400).json({ error: "Password not strong enough." });

  try {
    const exists = await User.findOne({ email }).lean();
    if (exists) return res.status(400).json({ error: "Email already in use." });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const created = await User.create({ email, password: hash } as Partial<IUser>);
    const token = createToken(created._id.toString());
    return res.status(201).json({ email: created.email, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error." });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) return res.status(400).json({ error: "All fields must be filled." });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "Email not found." });

    const ok = await bcrypt.compare(password, user.hashedPassword);
    if (!ok) return res.status(400).json({ error: "Incorrect password." });

    const token = createToken(user._id.toString());
    return res.status(200).json({ email: user.email, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error." });
  }
};

