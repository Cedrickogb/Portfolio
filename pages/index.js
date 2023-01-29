import Head from "next/head";
import Navbar from "../components/Navbar"
import Feed from "../components/Feed"




export default function Home({newsResults, randomUsersResults}) {
  return (
    <div>
      <Head>
        <title>Cédrick_ogb</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/codicon.ico" />
      </Head>

      <Navbar/>

      <Feed/>

    </div>
  )
};
