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

    return NextResponse.json(
      {
        success: true,
        message: 'Products fetched successfully.',
        products,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Fetch error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products.' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDB();

    const body = await req.json();
    const { name, price, category, inStock } = body;

    if (!name || price === undefined || !category || inStock === undefined) {
      return NextResponse.json(
        { success: false, error: 'All product fields are required.' },
        { status: 400 }
      );
    }

    const product = await Product.create({ name, price, category, inStock });

    return NextResponse.json(
      {
        success: true,
        message: 'Product added successfully.',
        product,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Product creation error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to add product.' },
      { status: 500 }
    );
  }
}
