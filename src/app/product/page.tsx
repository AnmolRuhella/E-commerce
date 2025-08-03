"use client";

import { useCallback, useEffect, useState } from "react";

import axiosInstance from "@/lib/httpService";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
};

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    inStock: true,
  });
  const [open, setOpen] = useState(false);

 const fetchProducts = useCallback(async () => {
  try {
    const params = new URLSearchParams();
    if (selectedCategory) params.append("category", selectedCategory);
    if (selectedPrice) params.append("price", selectedPrice);

    const res = await axiosInstance.get(`/products?${params.toString()}`);

    if (res.data.success) {
      setProducts(res.data.products || []);
    } else {
      toast.error(res.data.error || "Failed to fetch products");
    }
  } catch (err) {
    console.error(err);
    toast.error("Error fetching products");
  }
}, [selectedCategory, selectedPrice]);


 useEffect(() => {
  fetchProducts();
}, [fetchProducts]);


  const handleDelete = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/products/${id}`);
      toast.success(res.data.message || "Product deleted");
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      inStock: product.inStock,
    });
    setOpen(true);
  };

const handleFormChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const target = e.target;
  const { name, value, type } = target;

  setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox" && target instanceof HTMLInputElement
      ? target.checked
      : value,
  }));
};


  const handleFormSubmit = async () => {
    const payload = {
      ...formData,
      price: Number(formData.price),
    };

    try {
      let res;

      if (editingProduct) {
        res = await axiosInstance.put(`/products/${editingProduct._id}`, payload);
        toast.success(res.data.message || "Product updated");
      } else {
        res = await axiosInstance.post(`/products`, payload);
        toast.success(res.data.message || "Product created");
      }

      setOpen(false);
      setEditingProduct(null);
      setFormData({
        name: "",
        price: "",
        category: "",
        inStock: true,
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save product");
    }
  };

  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="p-6 space-y-6 bg-black min-h-screen text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Product List</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingProduct(null);
                setFormData({
                  name: "",
                  price: "",
                  category: "",
                  inStock: true,
                });
                setOpen(true);
              }}
            >
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-900 border border-zinc-700 text-white">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h2>
              <div className="grid gap-2">
                <Label>Name</Label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="bg-zinc-800"
                />
              </div>
              <div className="grid gap-2">
                <Label>Price</Label>
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleFormChange}
                  className="bg-zinc-800"
                />
              </div>
              <div className="grid gap-2">
                <Label>Category</Label>
                <Input
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  className="bg-zinc-800"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="inStock"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleFormChange}
                  className="accent-blue-600"
                />
                <Label htmlFor="inStock">In Stock</Label>
              </div>
              <Button onClick={handleFormSubmit} className="w-full bg-blue-900">
                {editingProduct ? "Update" : "Create"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <select
          className="bg-zinc-900 border border-zinc-700 px-3 py-2 rounded text-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className="bg-zinc-900 border border-zinc-700 px-3 py-2 rounded text-white"
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
        >
          <option value="">All Prices</option>
          <option value="0-10000">₹0 - ₹10,000</option>
          <option value="10000-50000">₹10,000 - ₹50,000</option>
          <option value="50000-500000">₹50,000 - ₹5,00,000</option>
        </select>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product._id} className="bg-zinc-900 border border-zinc-700">
            <CardHeader className="text-white">
              <CardTitle>{product.name}</CardTitle>
              <CardDescription className="text-white">
                Category: <span className="text-white">{product.category}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white">
                <strong>Price:</strong> ₹{product.price}
              </p>
              <Badge
                variant={product.inStock ? "outline" : "destructive"}
                className="text-white"
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleEditClick(product)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
