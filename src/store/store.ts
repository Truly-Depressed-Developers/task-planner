import { combineReducers, configureStore } from "@reduxjs/toolkit";

import counterSlice from "./slices/counterSlice";

import ExpoFileSystemStorage from "redux-persist-expo-filesystem"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const rootReducer = combineReducers({
    counter: counterSlice
});

const persistConfig = {
    storage: ExpoFileSystemStorage,
    key: "root"
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] } })
});

const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;