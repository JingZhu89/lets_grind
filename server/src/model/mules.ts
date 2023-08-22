import mongoose from "./mongoConnect";
import { ISetItem } from "./sets";
import { IUniqueItem } from "./uniques";

export interface IMule {
  name: String;
  userName: String;
  items: (ISetItem | IUniqueItem)[] | [];
}

const MuleSchema = new mongoose.Schema<IMule>({
  name: String,
  userName: String,
  items: Object,
});

export const Mule = mongoose.model<IMule>("mules", MuleSchema);

MuleSchema.set("toObject", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
