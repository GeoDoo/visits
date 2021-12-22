const express = require("express");
const redis = require("redis");

const app = express();
const port = 8081;

(async () => {
  const client = redis.createClient({ url: "redis://redis:6379" });

  await client.connect();

  await client.set("visits", 0);

  app.get("/", async (_req, res) => {
    const visits = await client.get("visits");

    res.send(`Number of visits is ${visits}`);
    
    await client.set("visits", parseInt(visits) + 1);
  });
})();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
