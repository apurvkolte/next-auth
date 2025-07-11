// pages/_app.js
import '@/styles/globals.css';
import { Provider } from 'react-redux';
import store from '../store/store';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <Toaster position="top-center" reverseOrder={false} />
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}
