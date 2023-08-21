/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as fs from "fs";
import { UniqueItem, IUniqueItem } from "./uniques";
import { SetItem, ISetItem } from "./sets";
import { Grail, IGrail } from "./myGrail";

export const createInitialUniquesData = async () => {
  const numberOfUniques = await UniqueItem.count();
  if (numberOfUniques === 0) {
    console.log("Adding initial uniques data");
    const jsonString = fs.readFileSync("newUniqueItems.json", "utf-8");
    const jsonData = JSON.parse(jsonString) as JSON;
    type keys = keyof IUniqueItem;
    const itemArray = Object.values(jsonData);
    for (const jsonItem of itemArray) {
      const newItem = <IUniqueItem>{};
      for (const prop in jsonItem) {
        if (prop === "*ID") {
          newItem["ID"] = jsonItem["*ID"];
        } else if (prop === "lvl req") {
          newItem["lvl_req"] = jsonItem["lvl req"];
        } else if (prop === "*ItemName") {
          newItem["ItemName"] = jsonItem["*ItemName"];
        } else if ((prop as keys) !== null) {
          newItem[prop as keys] = jsonItem[prop];
        }
      }
      if (
        newItem.hasOwnProperty("ItemName") &&
        newItem.hasOwnProperty("lvl_req") &&
        newItem.hasOwnProperty("enabled") &&
        newItem.enabled === 1
      ) {
        newItem.found = false;
        const item = new UniqueItem(newItem);
        await item.save();
      }
    }
  } else {
    console.log(`Unique data exist with ${numberOfUniques} items`);
  }
};

export const createInitialSetsData = async () => {
  const numberOfSets = await SetItem.count();
  if (numberOfSets === 0) {
    console.log("Adding initial sets data");
    const jsonString = fs.readFileSync("setitems.json", "utf-8");
    const jsonData = JSON.parse(jsonString) as JSON;
    type keys = keyof ISetItem;
    const itemArray = Object.values(jsonData);
    for (const jsonItem of itemArray) {
      const newItem = <ISetItem>{};
      for (const prop in jsonItem) {
        if (prop === "*ID") {
          newItem["ID"] = jsonItem["*ID"];
        } else if (prop === "lvl req") {
          newItem["lvl_req"] = jsonItem["lvl req"];
        } else if (prop === "*ItemName") {
          newItem["ItemName"] = jsonItem["*ItemName"];
        } else if ((prop as keys) !== null) {
          newItem[prop as keys] = jsonItem[prop];
        }
      }
      if (
        newItem.hasOwnProperty("ItemName") &&
        newItem.hasOwnProperty("lvl_req")
      ) {
        newItem.found = false;
        const item = new SetItem(newItem);
        await item.save();
      }
    }
  } else {
    console.log(`Set data exist with ${numberOfSets} items`);
  }
};

export const getUniqueItems = async (): Promise<IUniqueItem[]> => {
  const uniqueData = await UniqueItem.find();
  console.log(uniqueData);
  return uniqueData;
};

export const getSetItems = async (): Promise<ISetItem[]> => {
  const setData = await SetItem.find();
  console.log(setData);
  return setData;
};

export const checkUniqueName = async (name: String): Promise<Boolean> => {
  const dbResponse = await Grail.find();
  const names = dbResponse.map((item) => item.name);
  return names.includes(name);
};

export const getUserData = async (name: String): Promise<IGrail> => {
  const dbResponse = await Grail.findOne({ name });
  if (dbResponse === null) {
    throw new Error("no such user");
  }
  return dbResponse;
};
