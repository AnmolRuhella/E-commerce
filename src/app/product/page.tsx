"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/httpService";
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

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedCategory) params.append("category", selectedCategory);
      if (selectedPrice) params.append("price", selectedPrice);
      const res = await axiosInstance.get(`/products?${params.toString()}`);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedPrice]);

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Delete failed:", err);
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
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (target as HTMLInputElement).checked : value,
    }));
  };

  const handleFormSubmit = async () => {
    const payload = {
      ...formData,
      price: Number(formData.price),
    };

    try {
      if (editingProduct) {
        await axiosInstance.put(`/products/${editingProduct._id}`, payload);
      } else {
        await axiosInstance.post("/products", payload);
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
      console.error("Save failed:", err);
    }
  };

  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="p-6 space-y-6">
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
          <DialogContent>
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
                />
              </div>
              <div className="grid gap-2">
                <Label>Price</Label>
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleFormChange}
                />
              </div>
              <div className="grid gap-2">
                <Label>Category</Label>
                <Input
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                />
              </div>
              <div className="flex flex-row items-center gap-2">
                <input
                  type="checkbox"
                  id="inStock"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleFormChange}
                />
                <Label htmlFor="inStock">In Stock</Label>
              </div>

              <Button onClick={handleFormSubmit}>
                {editingProduct ? "Update" : "Create"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <select
          className="border rounded px-3 py-2 text-sm"
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
          className="border rounded px-3 py-2 text-sm"
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
        >
          <option value="">All Prices</option>
          <option value="0-10000">₹0 - ₹10,000</option>
          <option value="10000-50000">₹10,000 - ₹50,000</option>
          <option value="50000-500000">₹50,000 - ₹5,00,000</option>
        </select>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product._id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">{product.name}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Category:{" "}
                <span className="font-medium text-black">
                  {product.category}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-base">
                <span className="font-semibold">Price:</span> ₹{product.price}
              </p>
              <div>
                <Badge variant={product.inStock ? "default" : "destructive"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
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
