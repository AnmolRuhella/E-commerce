import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User/User';
import { connectToDB } from '@/lib/db';

export async function POST(req: Request) {
  await connectToDB();
  const { email, password, isAdmin = false } = await req.json();

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed, isAdmin });

  return NextResponse.json({ message: 'User registered', user: { email: user.email, isAdmin: user.isAdmin } });
}
