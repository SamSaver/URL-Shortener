// Imports
const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const nanoid = require("nanoid");
const authRoute = require("./auth");
const middleware = require("./middleware");
const app = express();

// Setting properties of server and middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/auth", authRoute);

// Connection to the database
mongoose.connect(
  "mongodb+srv://admin-sam:KbeJMDYku3r16eCL@cluster0.86aot.mongodb.net/urlShortener?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongo DB connected.");
  }
);

// GET Routes

// Home Route
app.get("/", async (req, res) => {
  const urls = await ShortUrl.find();
  res.render("index", { urls: urls });
});

// Helper Route During Dev Phase
app.get("/all", async (req, res) => {
  const obj = await ShortUrl.find();
  res.send(obj);
});

// Short URL redirection route
app.get("/:shortUrl", async (req, res) => {
  const urlObject = await ShortUrl.findOne({ short: req.params.shortUrl });

  if (urlObject == null) {
    return res.sendStatus(404);
  }

  urlObject.clicks++;
  urlObject.save();

  res.redirect(urlObject.full);
});

// POST Routes

// Form Post from frontend
app.post("/shortUrls", async (req, res) => {
  const fullUrl = req.body.full_url;
  const customAlias = req.body.custom_alias;
  const userName = req.body.user_name;
  let expire_at = req.body.expire_at;

  if (expire_at === "") {
    expire_at = new Date();
    expire_at.setDate(expire_at.getDate() + 30);
  }

  let shortUrl = "";

  if (customAlias.length > 0) {
    const doesExist = await ShortUrl.findOne({ short: customAlias });

    if (doesExist) {
      if (doesExist.full === fullUrl) {
        res.send({
          status: "SUCCESS",
          fullUrl: fullUrl,
          shortUrl: "http://localhost:8080/" + doesExist.short,
        });
        return;
      }

      res.send("Error: Custom Alias Already in Use.");
      return;
    }

    shortUrl = customAlias;
  } else {
    if (userName.length > 0) {
      shortUrl = nanoid.customAlphabet(userName + "abcABCdefDEF_098", 9)();
    } else {
      shortUrl = nanoid.nanoid(9);
    }
  }

  await ShortUrl.create({
    full: fullUrl,
    short: shortUrl,
    expireAt: expire_at,
  });
  res.redirect("/");
});

// API ROUTES

// API POST request for creation of short url
app.post("/api/getShortUrl", middleware.verify, async (req, res) => {
  const fullUrl = req.body.full_url;
  const customAlias = req.body.custom_alias;
  const userName = req.body.user_name;
  let expire_at = req.body.expire_at;

  if (expire_at === undefined) {
    expire_at = new Date();
    expire_at.setDate(expire_at.getDate() + 30);
  }

  let shortUrl = "";

  if (customAlias) {
    const doesExist = await ShortUrl.findOne({ short: customAlias });

    if (doesExist) {
      if (doesExist.full === fullUrl) {
        res.send({
          status: "SUCCESS",
          fullUrl: fullUrl,
          shortUrl: "http://localhost:8080/" + doesExist.short,
        });
        return;
      }

      res.send("Error: Custom Alias Already in Use.");
      return;
    }

    shortUrl = customAlias;
  } else {
    if (userName) {
      shortUrl = nanoid.customAlphabet(userName + "abcABCdefDEF_098", 9)();
    } else {
      shortUrl = nanoid.nanoid(9);
    }
  }

  await ShortUrl.create({
    full: fullUrl,
    short: shortUrl,
    expireAt: expire_at,
  });

  res.send({
    status: "SUCCESS",
    fullUrl: fullUrl,
    shortUrl: "http://localhost:8080/" + shortUrl,
    expireAt: expire_at,
  });
});

// API POST Route for deletion of the url
app.post("/api/deleteURL", middleware.verify, (req, res) => {
  const url = req.body.short_url;
  console.log("hit hua");

  ShortUrl.findOneAndDelete({ short: url })
    .then((response) => {
      if (response) {
        res.send({ success: "URL Removed" });
      } else {
        res.status(404).send("URL Not Found");
      }
    })
    .catch((err) => res.status(404).send(err));

  return;
});

// Server Start
app.listen(process.env.PORT || 8080, () => {
  console.log(`Server running on port ${process.env.PORT || 8080}`);
});

// curl -X POST http://localhost:8080/api/getShortUrl -H 'Content-Type: application/json' -d '{"full_url":"https://www.linkedin.com/in/samarth-singh-pawar","custom_alias":"sam_rocks"}'
