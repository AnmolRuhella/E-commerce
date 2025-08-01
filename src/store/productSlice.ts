import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

const productSlice = createSlice({
  name: 'products',
  initialState: [] as Product[],
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => action.payload,
    addProduct: (state, action: PayloadAction<Product>) => void state.push(action.payload),
    updateProduct: (state, action: PayloadAction<Product>) =>
      state.map(p => (p._id === action.payload._id ? action.payload : p)),
    removeProduct: (state, action: PayloadAction<string>) =>
      state.filter(p => p._id !== action.payload),
  },
});

export const { setProducts, addProduct, updateProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;
