import Head from "next/head";
import dynamic from "next/dynamic";

const Compare = dynamic(() => import("../Home/Compare"));

function Index() {
  return (
    <div className="flex flex-col items-center justify-center h-screen justify-between">
      <Head>
        <title>Bitcoin Compare</title>
        <link rel="icon" href="/Bitcoin_logo.png" />
        <nav id="header" class="bg-white fixed w-full z-10 top-0 shadow">
          <div class="w-full container mx-auto flex flex-wrap items-center justify-between my-4">
            <div class="pl-4 md:pl-0">
              <img src="/bitcoin.png" className="max-w-md mx-auto h-10" />
            </div>
          </div>
        </nav>
      </Head>
      <Compare />
      <footer className="flex items-center justify-center w-full h-24 relative bottom-0 top-auto  border-t mt-10 hover:text-red-500">
        <a
          className="flex items-center justify-center"
          href="https://github.com/McTunT/bitcoin-compare"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by {"James"}
        </a>
      </footer>
    </div>
  );
}

export default Index;
