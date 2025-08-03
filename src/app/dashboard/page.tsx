'use client';

import { useRouter } from 'next/navigation';
import ProtectedLayout from '../layout/ProtectedLayout';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const router = useRouter();

  const goToProducts = () => {
    router.push('/product');
  };

  return (
    <ProtectedLayout>
      <section className="p-6 md:p-10 w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
          Welcome to your Dashboard 
        </h1>
        <p className="text-blue-900 mb-6 max-w-xl">
          This is your central hub for managing your ecommerce store. Start by adding products and customizing your catalog to match your needs.
        </p>

        <Card className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white border border-gray-800 shadow-lg max-w-xl">
          <CardHeader>
            <CardTitle className="text-xl">
              Get Started with Your Store
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
              <li>Go to the <strong>Product</strong> section.</li>
              <li>Add and manage your products.</li>
              <li>Customize details like price, stock, and category.</li>
            </ul>
            <Button onClick={goToProducts} className="mt-2 bg-blue-600 hover:bg-blue-700 text-white">
              Go to Products
            </Button>
          </CardContent>
        </Card>
      </section>
    </ProtectedLayout>
  );
}
