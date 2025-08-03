import { connectToDB } from '@/lib/db';
import Product from '@/models/Product/Product';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDB();
    const body = await req.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { success: false, error: 'No product data provided.' },
        { status: 400 }
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, error: 'Product not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Product updated successfully.',
        product: updatedProduct,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Product update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update product.' },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDB();

    const deletedProduct = await Product.findByIdAndDelete(params.id);

    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, error: 'Product not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Product deleted successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Product delete error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete product.' },
      { status: 500 }
    );
  }
}
