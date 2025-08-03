import { connectToDB } from '../../../../lib/db';
import User from '@/models/User/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connectToDB();

    const { email, userName, password } = await req.json();

  
    if (!email || !userName || !password) {
      return NextResponse.json(
        { success: false, error: 'All fields are required.' },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email already in use.' },
        { status: 409 }
      );
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

 
    const newUser = new User({ email, userName, password: hashedPassword });
    await newUser.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful! You can now log in to your account.', 
        user: {
          id: newUser._id,
          email: newUser.email,
          username: newUser.userName,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Registration error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
