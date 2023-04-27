var express = require("express");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var app = express();
const fs = require("fs");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.post("/pdf", (req, res) => {
  console.log('/pdf')
  var file = fs.createReadStream("./assets/sample.pdf");
  var stat = fs.statSync("./assets/sample.pdf");
  res.setHeader("Content-Length", stat.size);
  res.setHeader("Content-Type", "application/pdf");
  //加入這一行，前端才能取得 Content-Disposition
  res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
  res.setHeader("Content-Disposition", "attachment; filename=quote.pdf");
  file.pipe(res);
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
