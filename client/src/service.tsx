import axios from "axios";
import { ISetItem, IUniqueItem, IMule } from "./interfaces";
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

export const getUserMules = async (name: string): Promise<IMule[]> => {
  const res = await axios.get(`${URL}mules/${name}`);
  return res.data;
};

export const saveUserSets = async (name: string, data: ISetItem[]) => {
  const res = await axios.put(`${URL}sets/${name}`, data);
  console.log(res);
};

export const saveUserUniques = async (name: string, data: IUniqueItem[]) => {
  const res = await axios.put(`${URL}uniques/${name}`, data);
  console.log(res);
};

export const addToMule = async (
  name: string,
  userName: string,
  newData: Object
) => {
  console.log(name, userName, newData);
  await axios.put(`${URL}mules/${userName}/${name}`, newData);
};
