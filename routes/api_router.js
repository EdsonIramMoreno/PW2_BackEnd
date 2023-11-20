var express = require("express");
var userRouter = require("./user_routes");
var postRouter = require("./post_routes");
var mediaRouter = require("./media_routes");
var aboutRouter = require("./about_routes");
var social_mediaRouter = require("./social_media_routes");

var app = express();

app.use("/user/", userRouter);
app.use("/post/", postRouter);
app.use("/media/", mediaRouter);
app.use("/about/", aboutRouter);
app.use("/social_media/", social_mediaRouter);

module.exports = app;