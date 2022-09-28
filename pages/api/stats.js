export default async function stats(req, res) {
  if (req.method === "POST") {
    console.log({cookies: req.cookies});
    res.send({msg: "it works"});
  }
}
