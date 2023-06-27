import '@/styles/globals.css';
import { NextPage } from 'next';
import { AppProps, type AppType } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import 'tailwindcss/tailwind.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App: AppType = ({ Component, pageProps }: AppPropsWithLayout) => {
  return <Component {...pageProps} />;
}

export default App;