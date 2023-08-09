import { configureStore } from '@reduxjs/toolkit';
import { toggleReducer } from '../functions/toggleReducer/toggleReducer';
import {
  toggleSliceReducer
} from './features/toggleFeatures/toggle';
import { logger } from './middleware/logger';
import {cityApi, isochronApi} from "./services/cityApi";

export const storeOfLayers = configureStore({
  reducer: {
    [cityApi.reducerPath]: cityApi.reducer,
    [isochronApi.reducerPath]: isochronApi.reducer,
    toggle: toggleSliceReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([cityApi.middleware, isochronApi.middleware, logger]),
  devTools: process.env.NODE_ENV !== 'production'
});