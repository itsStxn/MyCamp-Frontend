
import Header from "@/components/Header";
import Main from "@/components/Main";
import lazy from "next/dynamic";
import "./Home.scss";

export const dynamic = "auto",
dynamicParams = true,
revalidate = 0,
fetchCache = "auto",
runtime = "nodejs",
preferedRegion = "auto";

const Cards_1Lazy = lazy(() => import('@/components/Cards_1'), {ssr: false});

const Home = () => {
  return (
    <>
      <div className="Home">
        <Header/>
        <Cards_1Lazy className="mt-[-5rem] activities gap-5 m-auto w-[80%] flex flex-wrap justify-center"/>
        <Main/>
      </div>
    </>
  );
}

export default Home