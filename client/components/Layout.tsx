import Footer from "./Footer";
import CustomHead from "./CustomHead";

import Header from "./Header";

export default function Layout({ children, pageMeta }: any) {
  return (
    <>
      <CustomHead
        title={pageMeta?.title}
        description={pageMeta?.description}
        url={pageMeta?.url}
        image={pageMeta?.image}
        creator={pageMeta?.creator}
      />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
