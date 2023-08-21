import "dotenv/config";
import express, { Express, Request, Response, RequestHandler } from "express";
import cors from "cors";
import {
  createInitialUniquesData,
  createInitialSetsData,
  getUniqueItems,
  getSetItems,
  getUserData,
  checkUniqueName,
} from "./model/dbService";
import { Grail } from "./model/myGrail";
const app: Express = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
}
const PORT = process.env.PORT || 3001;

createInitialUniquesData();
createInitialSetsData();

//create user
app.post("/user", (async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    if (!name || typeof name !== "string") {
      throw new Error("Name must be a string");
    }
    await checkUniqueName(name);
    const uniques = await getUniqueItems();
    const sets = await getSetItems();
    const newUser = new Grail({
      name,
      sets,
      uniques,
    });
    await newUser.save();
    res.status(200).send("New user created");
  } catch (err) {
    res.status(404).send(err);
  }
}) as RequestHandler);

app.get("/uniques/:name", (async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    const dbResponse = await getUserData(name);
    res.status(200).send(dbResponse.uniques);
  } catch (err) {
    res.status(200).send(err);
  }
}) as RequestHandler);

app.get("/sets/:name", (async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    const dbResponse = await getUserData(name);
    res.status(200).send(dbResponse.sets);
  } catch (err) {
    res.status(200).send(err);
  }
}) as RequestHandler);

app.put("/:name", (async (req: Request, res: Response) => {
  const name = req.params.name;
}) as RequestHandler);

app.listen(PORT, () => {
  console.log(`${process.env.NODE_ENV} mode, listening on port ${PORT}`);
});
