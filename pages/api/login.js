import { magicAdmin } from "../../lib/magic";
import jwt from "jsonwebtoken";
import { queryHasuraGQL } from "../../lib/db/hasura";

export default async function login (req, res) {
  if (req.method === "POST") {
    try {
      const auth = req.headers.authorization;
      const didToken = auth.substring(7);
      // Invote magic
      const metadata = await magicAdmin.users.getMetadataByToken(didToken)
      console.log({ metadata });
      console.log({ queryHasuraGQL })

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
      "thisisasecretthisisasupersecret2367",
      );
      console.log({ token });

      res.send({ done: true });
    } catch(error) {
      console.error("There was an error logging in", error);
      res.status(500).send({ done: false });
    }
  } else (
    res.send({ done: false })
  )
}
