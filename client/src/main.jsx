// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import './index.css'
import { store } from './redux/store.js'  // Import the store
import { Provider } from 'react-redux'  // Import the Provider component  

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
