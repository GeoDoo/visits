const express = require("express");
const redis = require("redis");

const app = express();
const port = 8081;
const client = redis.createClient({
  host: "redis-server",
});

client.set("visits", 0);

app.get("/", (_req, res) => {
  client.get("visits", (err, visits) => {
    res.send(`Number of visits is ${visits}`);
    client.set("visits", parseInt(visits) + 1);
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
