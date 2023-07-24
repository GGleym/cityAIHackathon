import Layout from '/components/layouts/Main';
import '/styles/globals.css';

const Website = ({ Component, pageProps, router }) => {
  return (
    <Layout router={router}>
      <Component {...pageProps} />
    </Layout>
  );
};

export default Website;
