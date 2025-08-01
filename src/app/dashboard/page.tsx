'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, removeProduct } from '@/store/productSlice';
import { RootState } from '../../store/rootStore/store';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('/api/products')
      .then(res => dispatch(setProducts(res.data)))
      .catch(err => console.error(err));
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    await axios.delete(`/api/products/${id}`, { headers: { Authorization: 'Bearer token-placeholder' } });
    dispatch(removeProduct(id));
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <>
      <h1>Dashboard</h1>
      <input placeholder="Search product" value={filter} onChange={e => setFilter(e.target.value)} />
      <ul>
        {filtered.map(p => (
          <li key={p._id}>
            {p.name} - ₹{p.price} - {p.category} - {p.inStock ? 'In stock' : 'Out of stock'}
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
