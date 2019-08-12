import React from "react";
import path from "path";
import fs from "fs";
import express from "express";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "../client/components/App";

const port = process.env.PORT || 8080;

const app = express();

app.use("/favicon", (req, res) => {
  res.send({});
});

app.use(express.static("static"));

app.get("/*", (req, res) => {
  const context = {};

  const app = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const indexFile = path.resolve("./static/template.html");
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }

    return res.send(
      data.replace(
        `<div id="root"></div>`,
        `<div id="root" class="bar">${app}</div>`
      )
    );
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
