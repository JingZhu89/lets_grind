import axios from "axios";
import { ISetItem, IUniqueItem } from "./interfaces";
// const PRODURL = "/";
const DEVURL = "http://localhost:3001/";
const URL = DEVURL;

export const getUserUniques = async (name: string): Promise<IUniqueItem[]> => {
  const res = await axios.get(`${URL}uniques/${name}`);
  return res.data;
};

export const getUserSets = async (name: string): Promise<ISetItem[]> => {
  const res = await axios.get(`${URL}sets/${name}`);
  return res.data;
};
