import jwt from 'jsonwebtoken';
import { findVideoIdByUser, updateStats } from '../../lib/db/hasura';

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
        let favorited = req.query.favorited;
        // let watched = req.query.watched;
        const doesStatsExist = await findVideoIdByUser(token,  userId, videoId);
        console.log(doesStatsExist.data)
        if ("doesStatsExist:", doesStatsExist) {
          // update it
          const response = await updateStats(token, { userId: userId, videoId: '4zH5iYM4wJo', favorited: + 1, watched: true })
          res.send({ msg: "it works", updateStats: response });
        } else {
          // add it
          res.send({ msg: "it works", decodedToken, doesStatsExist });
        }
      }
    } catch(error) {
      console.error("Error occurred /stats", error);
      res.status(500).send({ done: false, error: error?.message });
    }

  }
}
