import "dotenv/config";
import express, { Express, Request, Response, RequestHandler } from "express";
import cors from "cors";
import {
  createInitialUniquesData,
  createInitialSetsData,
  createNewMule,
  createNewUser,
  getUserData,
  updateData,
  getUserAllMules,
  addToMule,
} from "./model/dbService";

const app: Express = express();
app.use(cors());
app.use(express.json({ limit: "200MB" }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
}
const PORT = process.env.PORT || 3001;

// eslint-disable-next-line @typescript-eslint/no-floating-promises
createInitialUniquesData();
// eslint-disable-next-line @typescript-eslint/no-floating-promises
createInitialSetsData();

//create user
app.post("/user", (async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const name = req.body.name;
    if (!name || typeof name !== "string") {
      throw new Error("Name must be a string");
    }
    await createNewUser(name);
    res.status(200).send("New user created");
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).send(err.message);
    }
  }
}) as RequestHandler);

//create mule
app.post("/mule/:user", (async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const userName = req.params.user;
    const name = req.body.name;
    if (!name || typeof name !== "string") {
      throw new Error("Name must be a string");
    }
    await createNewMule(name, userName);
    res.status(200).send("New mule created");
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).send(err.message);
    }
  }
}) as RequestHandler);

app.get("/uniques/:name", (async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    const dbResponse = await getUserData(name);
    res.status(200).send(dbResponse.uniques);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).send(err.message);
    }
  }
}) as RequestHandler);

app.get("/sets/:name", (async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    const dbResponse = await getUserData(name);
    res.status(200).send(dbResponse.sets);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).send(err.message);
    }
  }
}) as RequestHandler);

app.put("/sets/:name", (async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    await updateData(name, { sets: req.body as Object });
    res.sendStatus(200);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).send(err.message);
    }
  }
}) as RequestHandler);

app.put("/uniques/:name", (async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    await updateData(name, { uniques: req.body as Object });
    res.sendStatus(200);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).send(err.message);
    }
  }
}) as RequestHandler);

app.get("/mules/:user", (async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const userName = req.params.user;
    const dbResponse = await getUserAllMules(userName);
    res.status(200).send(dbResponse);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).send(err.message);
    }
  }
}) as RequestHandler);

app.put("/mules/:user/:mule", (async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const userName = req.params.user;
    const muleName = req.params.mule;
    const data = req.body as Object;
    const dbResponse = await addToMule(muleName, userName, data);
    res.status(200).send(dbResponse);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).send(err.message);
    }
  }
}) as RequestHandler);

app.listen(PORT, () => {
  console.log(`${process.env.NODE_ENV} mode, listening on port ${PORT}`);
});
