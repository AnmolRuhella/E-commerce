import { connectToDB } from '@/lib/db';
import Product from '@/models/Product/Product';
import { NextRequest, NextResponse } from 'next/server';

interface ParamsContext {
  params: {
    id: string;
  };
}
export async function PUT(req: NextRequest, context: unknown) {
  if (!isParamsContext(context)) {
    return NextResponse.json(
      { success: false, error: 'Invalid context structure.' },
      { status: 400 }
    );
  }

  const { id } = context.params;

  try {
    await connectToDB();
    const body = await req.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { success: false, error: 'No product data provided.' },
        { status: 400 }
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
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
    return NextResponse.json(
      { success: false, error: 'Failed to update product.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: unknown) {
  if (!isParamsContext(context)) {
    return NextResponse.json(
      { success: false, error: 'Invalid context structure.' },
      { status: 400 }
    );
  }

  const { id } = context.params;

  try {
    await connectToDB();

    const deletedProduct = await Product.findByIdAndDelete(id);

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
    return NextResponse.json(
      { success: false, error: 'Failed to delete product.' },
      { status: 500 }
    );
  }
}

// Safe runtime type check to avoid using `any`
function isParamsContext(context: unknown): context is ParamsContext {
  return (
    typeof context === 'object' &&
    context !== null &&
    'params' in context &&
    typeof (context as Record<string, unknown>).params === 'object' &&
    (context as { params: { id: unknown } }).params.id !== undefined &&
    typeof (context as { params: { id: unknown } }).params.id === 'string'
  );
}
