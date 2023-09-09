import express from "express";
import config from "dotenv";
import { HeroController } from "./controller/hero";
import { HeroService } from "./service/hero";

const app = express();

app.use(function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req: express.Request, res: express.Response) => {
  console.log(req.query.id);
  res.status(200).json({ Reply: "Hello world!" });
});

const heroController = new HeroController();

app.get("/hero/all", (req: express.Request, res: express.Response) => {
  heroController.getHeroes(req, res);
});

config.config({ path: "./config.env" });
// set port, listen for requests
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
