import jwt from 'jsonwebtoken';
import { findVideoIdByUser, insertStats, updateStats } from '../../lib/db/hasura';

export default async function stats(req, res) {
  if (req.method === "POST") {

    try {
      const token = req.cookies.token;

      if (!token) {
        res.status(403).send({});
      } else {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decodedToken.issuer;
        const videoId = req.query.videoId;

        const doesStatsExist = await findVideoIdByUser(token, userId, videoId);
        console.log(doesStatsExist.data.stats)
        if (doesStatsExist.data.stats.length !== 0) {
          // update it
          const response = await updateStats(token, { userId, videoId: "CaimKeDcudo", favorited: 0, watched: true })
          res.send({ msg: "it works", updateStats: response });
        } else {
          // add it
          const response = await insertStats(token, { userId, videoId, favorited: 0, watched: false })
          res.send({ msg: "it works", insertStats: response });
        }
      }
    } catch(error) {
      console.error("Error occurred /stats", error);
      res.status(500).send({ done: false, error: error?.message });
    }

  }
}
