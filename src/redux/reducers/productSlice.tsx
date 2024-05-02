import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProductModelApi {
  id: number;
  name: string;
  alias: string;
  price: number;
  description: string;
  size: string;
  shortDescription: string;
  quantity: number;
  deleted: boolean;
  categories: string;
  relatedProducts: string;
}

export interface ProductReducerType {
  arrProduct: ProductModelApi[] | null | undefined;
}

const initialState: ProductReducerType = {
  arrProduct: [],
};

const productReducer = createSlice({
  name: 'productReducer',
  initialState,
  reducers: {
    setArrProductAction: (state, action: PayloadAction<ProductModelApi[]>) => {
      state.arrProduct = action.payload;
    },
  },
});

export const { setArrProductAction } = productReducer.actions;

export default productReducer.reducer;