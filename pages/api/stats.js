import jwt from 'jsonwebtoken';
import { findVideoIdByUser, insertStats, updateStats } from '../../lib/db/hasura';

export default async function stats(req, res) {
  if (req.method === "POST") {

    try {
      const token = req.cookies.token;

      if (!token) {
        res.status(403).send({});
      } else {
        const { videoId, favorited, watched = true } = req.body

        if (videoId) {
          const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

          const userId = decodedToken.issuer;

          const doesStatsExist = await findVideoIdByUser(token, userId, videoId);

          if (doesStatsExist.data.stats.length !== 0) {
            // update it
            const response = await updateStats(token, { userId, videoId, favorited, watched })
            res.send({ data: response });
          } else {
            // add it
            const response = await insertStats(token, { userId, videoId, favorited, watched })
            res.send({ data: response });
          }
        }
      }
    } catch(error) {
      console.error("Error occurred /stats", error);
      res.status(500).send({ done: false, error: error?.message });
    }

  }
}
