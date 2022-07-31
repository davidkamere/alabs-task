import Head from "next/head";
import Header from "../Components/Header";
import Feed from "../Components/Feed";
import Footer from "../Components/Footer";
import Modal from "../Components/Modal";
import Loading from "../Components/Loading";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="bg-white text-black min-h-screen">
      <Head>
        <title>PCHA</title>
        <link rel="icon" href="/floral.ico" />
      </Head>

      {/* Header with Log out  */}

      {session && <Header />}

      {/* Feed */}

      <Feed />

      {/* Upload Modal */}
      <Modal />

      {/* Sticky Footer */}
      <div className="sticky bottom-0 opacity-90 bg-opacity-10 backdrop-blur-lg">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
