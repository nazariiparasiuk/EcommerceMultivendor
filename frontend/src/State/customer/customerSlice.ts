import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../config/Api';
import { HomeData, HomeCategory } from '../../types/homeCategoryTypes';

export const fetchHomePageData = createAsyncThunk<HomeData, void, { rejectValue: string }>(
  'home/fetchHomePageData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/home');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to load the home page.');
    }
  }
);

interface HomeState {
  homePageData: HomeData | null;
  homeCategories: HomeCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  homePageData:null,
  homeCategories: [],
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHomePageData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchHomePageData.fulfilled, (state, action) => {
      state.loading = false;
      state.homePageData = action.payload;
    });
    builder.addCase(fetchHomePageData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to load the home page.';
    });
  },
});

export default homeSlice.reducer;
