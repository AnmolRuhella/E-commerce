import { connectToDB } from '@/lib/db';
import Product from '@/models/Product/Product';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const priceRange = searchParams.get('price');

    const query: Record<string, unknown> = {};
    if (category) query.category = category;
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      query.price = { $gte: min, $lte: max };
    }

    const products = await Product.find(query);
    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();
    const product = await Product.create(body);
    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
  }
}
