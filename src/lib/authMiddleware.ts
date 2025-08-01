import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import User from '@/models/User/User';
import { connectToDB } from '@/lib/db';

export async function POST(req: Request) {
  await connectToDB();
  const { email, password } = await req.json();
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  const cookieSerialized = serialize('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 3600, // 1 hour
  });

  const res = NextResponse.json({ message: 'Login successful' });
  res.headers.set('Set-Cookie', cookieSerialized);
  return res;
}
