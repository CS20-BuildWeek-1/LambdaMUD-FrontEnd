const Pusher = require("pusher");
const Chatkit = require("@pusher/chatkit-server");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const chatkit = new Chatkit.default({
  instanceLocator: "v1:us1:19220286-039a-4203-bd68-ce7c1bef3446",
  key:
    "260ee3b1-cc03-4ead-9562-fa99d1202b70:0k0FIEHuAlOGEbokc9pHSF6gVhTTiHg0HxJLB33Dh40="
});

// const pusher = new Pusher({
//   appId: "848784",
//   key: "ff2810ec3a66168f055f",
//   secret: "24f79188d750e65de30d",
//   cluster: "us3",
//   encrypted: true
// });

app.post("/users", (req, res) => {
  console.log("REQUEST", req.body);
  const { username } = req.body;
  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error === "services/chatkit/user_already_exists") {
        res.sendStatus(200);
      } else {
        res.status(error.status).json(error);
      }
    });
});

app.post("/authenticate", (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id });
  res.status(authData.status).send(authData.body);
});

app.post("/message", (req, res) => {
  const payload = req.body;
  pusher.trigger("chat", "message", payload);
  res.send(payload);
});

app.set("PORT", process.env.PORT || 5000);

app.listen(app.get("PORT"), () =>
  console.log("Listening at " + app.get("PORT"))
);
