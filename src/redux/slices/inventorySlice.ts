import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  price: string;
  quantity: number;
  value: string;
  isActive: boolean;
}

interface InventoryState {
  items: InventoryItem[];
  totalProducts: number;
  totalValue: number;
  outOfStock: number;
  categoryCount: number;
}

const initialState: InventoryState = {
  items: [],
  totalProducts: 0,
  totalValue: 0,
  outOfStock: 0,
  categoryCount: 0,
};

// Helper function to calculate stats
const calculateStats = (items: InventoryItem[]) => {
  const activeItems = items.filter(item => item.isActive);

  const stats = activeItems.reduce((acc, item) => {
    const numericValue = parseFloat(item.value.replace('$', '')) || 0;

    // Increment totalValue
    acc.totalValue += numericValue;

    // Increment totalProducts count
    acc.totalProducts++;

    // Check for outOfStock items
    if (item.quantity === 0) {
      acc.outOfStock++;
    }

    // Add category to set for unique category count
    acc.categories.add(item.category);

    return acc;
  }, {
    totalProducts: 0,
    totalValue: 0,
    outOfStock: 0,
    categories: new Set<string>()
  });

  return {
    totalProducts: stats.totalProducts,
    totalValue: stats.totalValue,
    outOfStock: stats.outOfStock,
    categoryCount: stats.categories.size
  };
};

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setInventories: (state, action: PayloadAction<InventoryItem[]>) => {
      state.items = action.payload;
      const stats = calculateStats(action.payload);
      state.totalProducts = stats.totalProducts;
      state.totalValue = stats.totalValue;
      state.outOfStock = stats.outOfStock;
      state.categoryCount = stats.categoryCount;
    },
    editInventory: (state, action: PayloadAction<Partial<InventoryItem>>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
        console.log('state.items[index]::', state.items[index])
      }
      const stats = calculateStats(state.items);
      state.totalProducts = stats.totalProducts;
      state.totalValue = stats.totalValue;
      state.outOfStock = stats.outOfStock;
      state.categoryCount = stats.categoryCount;
    },
    deleteInventory: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      const stats = calculateStats(state.items);
      state.totalProducts = stats.totalProducts;
      state.totalValue = stats.totalValue;
      state.outOfStock = stats.outOfStock;
      state.categoryCount = stats.categoryCount;
    },
  },
});

export const { setInventories, editInventory, deleteInventory } = inventorySlice.actions;
export default inventorySlice.reducer;
