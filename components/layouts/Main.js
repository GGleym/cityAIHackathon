import Head from 'next/head';
import { Navbar } from '../Navbar';

const Main = ({ children, router }) => {
  return (
    <>
      <Head>
        <meta
          name={'viewport'}
          content={
            'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
          }
        />
        <title>SR Space</title>
      </Head>

      <Navbar path={router.asPath} />

      {children}
    </>
  );
};

export default Main;
