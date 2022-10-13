import { findVideoIdByUser, updateStats, insertStats } from '../../lib/db/hasura';
import { verifyToken } from '../../lib/utils';

export default async function stats(req, res,) {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(403).send({});
    } else {
      const { videoId } = req.method === "POST" ? req.body : req.query

      if (videoId) {
        const userId = await verifyToken(token);
        const findVideo = await findVideoIdByUser(token, userId, videoId);
        const doesStatsExist = findVideo?.length > 0;
        console.log({videoId})
        if (req.method === "POST") {
          const { favorited, watched = true } = req.body

          if (doesStatsExist) {
            // update it
            const response = await updateStats(token, {
              watched,
              userId,
              videoId,
              favorited,
            })
            res.send({ data: response });
          } else {
            // add it
            const response = await insertStats(token, {
              watched,
              userId,
              videoId,
              favorited,
            })
            res.send({ data: response });
          }
        } else {
          if (doesStatsExist) {
            res.send(findVideo);
          } else {
            res.status(404);
            res.send({ user: null, msg: "Video not found"});
          }
        }
      }
    }
  } catch (error) {
    console.error("Error occurred /stats", error);
    res.status(500).send({ done: false, error: error?.message });
  }

}
