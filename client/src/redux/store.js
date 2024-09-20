import { configureStore, combineReducers } from '@reduxjs/toolkit';
import useReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from './theme/themeSlice';  // import the themeReducer from themeSlice.js

const rootReducer = combineReducers({ 
  user: useReducer,
  theme: themeReducer,  // add the themeReducer to the rootReducer  

}); 

const persistConfig = {
  key: 'root',
  storage: storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);  

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    {
      serializableCheck: false,
    }
  ),
})


export const persistor = persistStore(store);