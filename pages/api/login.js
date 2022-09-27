import { magicAdmin } from "../../lib/magic";
import jwt from "jsonwebtoken";
import { createNewUser, isNewUser } from "../../lib/db/hasura";
import { setTokenCookie } from '../../lib/cookies';

export default async function login (req, res) {
  if (req.method === "POST") {
    try {
      const auth = req.headers.authorization;
      const didToken = auth ? auth.substring(7) : "";

      // Invoke magic
      const metadata = await magicAdmin.users.getMetadataByToken(didToken);

      // Create JWT
      const token = jwt.sign(
        {
          ...metadata,
          "iat": Math.floor(Date.now() / 1000),
          "exp": Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-default-role": "user",
            "x-hasura-user-id": `${metadata.issuer}`,
          },
        },
        process.env.JWT_SECRET
      );

      const isNewUserQuery = await isNewUser(token, metadata.issuer);

      if (isNewUserQuery) {
        const createNewUserMutation = await createNewUser(token, metadata);
        console.log({ createNewUserMutation });
        // Set the cookie
        const cookie = setTokenCookie(token, res);
        console.log({ cookie });
        return res.send({ done: true, msg: "This is a new user" });
      } else {
        // set the cookie
        const cookie = setTokenCookie(token, res);
        console.log({ cookie });
        return res.send({ done: true, msg: "Not a new user" });
      }
    } catch(error) {
      console.error("There was an error logging in", error);
      res.status(500).send({ done: false });
    }
  } else (
    res.send({ done: false })
  )
}
