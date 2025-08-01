import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product/Product";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  await connectDB();
  const products = await Product.find();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  await connectDB();
  const user = verifyToken(req);
  if (!user || !user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const product = await Product.create(data);
  return NextResponse.json(product);
}
