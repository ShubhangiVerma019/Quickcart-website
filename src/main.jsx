import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from './components/ErrorBoundary.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
   <PersistGate loading={null} persistor={persistor}>
    <AuthProvider>
    <ErrorBoundary>
    <App />
    </ErrorBoundary>
    </AuthProvider>
  </PersistGate>
    </Provider>
  </StrictMode>,
)
