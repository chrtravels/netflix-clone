import videoData from '../data/videos.json';

export const getCommonVideos = async (url) => {

  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

  try {
    const BASE_URL = 'youtube.googleapis.com/youtube/v3'

    const response = await fetch(`https:/${BASE_URL}/${url}&key=${YOUTUBE_API_KEY}`);

    const data = await response.json();

    if (data?.error) {
      console.error("YouTube API error", data.error);
      return [];
    }

    return data?.items.map((item) => {
      const id = item?.id?.videoId || item.id;
      return {
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id: id
      }
    });
  } catch(error) {
    console.log("Something went wrong with the video library", error);
    return [];
  }

}

export const getVideos = (searchQuery) => {
  const URL = `search?part=snippet&maxResults=25&q=${searchQuery}&type=video`;
  return getCommonVideos(URL);
}
