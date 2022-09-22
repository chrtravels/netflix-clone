import { magicAdmin } from "../../lib/magic";

export default async function login (req, res) {
  if (req.method === "POST") {
    try {
      const auth = req.headers.authorization;
      const didToken = auth.substring(7);

      const metadata = await magicAdmin.users.getMetadataByToken(didToken)
      console.log({ metadata });

      res.send({ done: true });
    } catch(error) {
      console.error("There was an error logging in", error);
      res.status(500).send({ done: false });
    }
  } else (
    res.send({ done: false })
  )
}
