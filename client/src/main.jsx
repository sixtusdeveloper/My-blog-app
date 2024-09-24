import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import './index.css'
import { store, persistor } from './redux/store.js'  // Import the store
import { PersistGate } from 'redux-persist/integration/react'  // Import the PersistGate component  
import { Provider } from 'react-redux'  // Import the Provider component  
import ThemeProvider from './components/ThemeProvider.jsx'  // Import the ThemeProvider component  

ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      
      <ThemeProvider>
        <App />
      </ThemeProvider>

    </Provider>,
  </PersistGate>
);
