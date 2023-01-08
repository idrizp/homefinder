// Default nextjs _app.tsx
import { AppProps } from "next/app";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen h-full">
      <Component {...pageProps} />
      <footer className="flex flex-col items-center justify-center h-full bg-accent p-5 text-white">
        <p className="text-center">Made with ❤️ by Idriz Pelaj</p>
      </footer>
    </div>
  );
}
