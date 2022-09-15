import { useRouter } from "next/router";
import Modal from 'react-modal';

import styles from '../../styles/Video.module.css';
// combine classnames
import clsx from "classnames";

import { getYoutubeVideoById } from "../../lib/videos";

Modal.setAppElement('#__next');

export async function getStaticProps() {
  // Data to fetch from API
  // const video = {
  //   title: 'Hi cute dog',
  //   publishTime: '1990-01-01',
  //   description: 'A big red dog that is super cute, can he get any bigger?',
  //   channelTitle: 'Paramount Pictures',
  //   viewCount: 10000,
  // }

  const videoId = "4zH5iYM4wJo";
  const videoArray = await getYoutubeVideoById(videoId);
  console.log({ videoArray });
  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {}
    },
    revalidate: 10, // In seconds
  }
}

// Static generation for Banner component
export async function getStaticPaths() {
  const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];

  // Get the paths we want to pre-render based on posts
  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }))

  return { paths, fallback: 'blocking' }
}

const Video = ({ video }) => {
  const router = useRouter()

  const {title, publishTime, description, channelTitle, statistics: { viewCount }} = video;

  return (
    <div className={styles.container}>
      <Modal
      isOpen={true}
      contentLabel="Watch the video"
      onRequestClose={() => router.back()}
      className={styles.modal}
      overlayClassName={styles.overlay}
      >
        <iframe
        id="ytplayer"
        className={styles.videoPlayer}
        type="text/html"
        width="100%"
        height="360"
        src={`https://www.youtube.com/embed/${router.query.videoId}?autoplay=0&origin=http://example.com&controls=0&rel=0`}
        frameborder="0"
        ></iframe>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
            <p className={clsx(styles.subText, styles.subTextWrapper)}>
              <span className={styles.textColor}>Cast: </span>
              <span className={styles.channelTitle}>
              {channelTitle}
              </span>
            </p>
            <p className={clsx(styles.subText, styles.subTextWrapper)}>
              <span className={styles.textColor}>View Count: </span>
              <span className={styles.channelTitle}>
              {viewCount}
              </span>
            </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
