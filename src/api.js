const express = require("express");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const otherRoutes = require("./routes/otherRoutes");
const { authMiddleware } = require("./middlewares/authMiddleware");
require("./db");
const { sessionSecret, dbConnectionURL, apiBaseUrl } = require("./config");
const appSession = require("express-session");
const sessionStore = require("connect-mongodb-session")(appSession);
const store = new sessionStore({
  uri: dbConnectionURL,
  collection: "userSessions",
});
app.use(cors());
app.use(bodyParser.json());
app.use(
  appSession({
    secret: sessionSecret,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 },
    store: store,
    resave: false,
  })
);

// app.use(`${apiBaseUrl}/user`, userRoutes);
app.use(`/user`, userRoutes);
//app.use();
app.use(`/other`, authMiddleware, otherRoutes);
// app.use(`${apiBaseUrl}/other`, authMiddleware, otherRoutes);
app.listen(5000, () => {
  console.log(`Server is running in the port 5000`);
});
//http://localhost:9999/.netlify/functions/api/user/registerUser
module.exports.handler = serverless(app);
