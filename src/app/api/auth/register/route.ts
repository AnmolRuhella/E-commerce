import { connectToDB } from '../../../../lib/db';
import User from '@/models/User/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    await connectToDB();

    const { email, userName, password } = await req.json();

    if (!email || !userName || !password) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email already in use" }), { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, userName, password: hashedPassword });
    await newUser.save();

    return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });

  } catch (err) {
    console.error("Registration error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
