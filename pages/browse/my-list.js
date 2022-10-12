import Head from "next/head";
import NavBar from "../../components/nav/navbar";
import SectionCards from "../../components/card/section-cards";

const MyList = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>My List</title>
      </Head>
      <main>
        <NavBar />
        <div>
        <SectionCards title="My List" videos={[]} size="small" />
        </div>
      </main>
    </div>
  )
}

export default MyList;
