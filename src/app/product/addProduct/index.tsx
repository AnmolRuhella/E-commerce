'use client';

import { useState } from 'react';
import axiosInstance from '../../../lib/httpService'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type Props = {
  onProductAdded: () => void;
};

export default function AddProduct({ onProductAdded }: Props) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    inStock: true,
  });

  const [open, setOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleAdd = async () => {
    try {
      await axiosInstance.post('/products', {
        ...form,
        price: Number(form.price),
      });
      onProductAdded();
      setForm({ name: '', price: '', category: '', inStock: true });
      setOpen(false);
    } catch (err) {
      console.error('Failed to add product', err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Product</Button>
      </DialogTrigger>
      <DialogContent>
  <DialogHeader>
    <DialogTitle>Add New Product</DialogTitle>
  </DialogHeader>
  <form
    onSubmit={(e) => {
      e.preventDefault();
      handleAdd();
    }}
    className="grid gap-4 py-4"
  >
    <div className="grid gap-2">
      <Label htmlFor="name">Name</Label>
      <Input id="name" name="name" value={form.name} onChange={handleChange} />
    </div>
    <div className="grid gap-2">
      <Label htmlFor="price">Price</Label>
      <Input
        id="price"
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
      />
    </div>
    <div className="grid gap-2">
      <Label htmlFor="category">Category</Label>
      <Input id="category" name="category" value={form.category} onChange={handleChange} />
    </div>
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id="inStock"
        name="inStock"
        checked={form.inStock}
        onChange={handleChange}
      />
      <Label htmlFor="inStock">In Stock</Label>
    </div>
    <Button type="submit">Submit</Button>
  </form>
</DialogContent>

    </Dialog>
  );
}
