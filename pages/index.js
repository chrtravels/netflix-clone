import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Banner from '../components/banner/banner';
import NavBar from '../components/nav/navbar';

import SectionCards from '../components/card/section-cards';
import { getVideos, getPopularVideos, getWatchItAgainVideos } from '../lib/videos';

export async function getServerSideProps() {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweDVCNmExMEU0YzQ1NmQyRTY2OTZFOWVENDE4M2VmQTQzMzczMmE4NTMiLCJwdWJsaWNBZGRyZXNzIjoiMHg1QjZhMTBFNGM0NTZkMkU2Njk2RTllRDQxODNlZkE0MzM3MzJhODUzIiwiZW1haWwiOiJjaHJ0cmF2ZWxzQGdtYWlsLmNvbSIsIm9hdXRoUHJvdmlkZXIiOm51bGwsInBob25lTnVtYmVyIjpudWxsLCJpYXQiOjE2NjUxMTM2MjAsImV4cCI6MTY2NTcxODQyMCwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtdXNlci1pZCI6ImRpZDpldGhyOjB4NUI2YTEwRTRjNDU2ZDJFNjY5NkU5ZUQ0MTgzZWZBNDMzNzMyYTg1MyJ9fQ.n3lCLHRDN1RB9Hu_OkjkN5vImIb6HRtKOAZpOA7InUw";
  const userId = "did:ethr:0x5B6a10E4c456d2E6696E9eD4183efA433732a853";
  const watchItAgainVideos = await getWatchItAgainVideos(userId, token)

  const disneyVideos = await getVideos("disney trailer");
  const travelVideos = await getVideos("travel");
  const eightiesCartoons = await getVideos("80's cartoons");
  const popularVideos = await getPopularVideos("popular");

  // Pass data to the page via props
  return { props: { disneyVideos, travelVideos, eightiesCartoons, popularVideos, watchItAgainVideos } }
}

export default function Home({ disneyVideos, travelVideos, eightiesCartoons, popularVideos, watchItAgainVideos }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <NavBar username="Chris" />
        <Banner
        videoId="4zH5iYM4wJo"
        title="Clifford the red dog"
        subTitle="a very cute dog"
        imgUrl="/static/clifford.webp"
        />

        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" videos={disneyVideos} size="large"/>
          <SectionCards title="Watch It Again" videos={watchItAgainVideos} size="small" />
          <SectionCards title="Travel" videos={travelVideos} size="small" />
          <SectionCards title="80's Cartoons" videos={eightiesCartoons} size="medium" />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>

    </div>
  )
}
