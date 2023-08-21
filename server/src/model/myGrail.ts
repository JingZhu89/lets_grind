import mongoose from "./mongoConnect";
import { ISetItem } from "./sets";
import { IUniqueItem } from "./uniques";

export interface IGrail {
  name: String;
  sets: ISetItem[];
  uniques: IUniqueItem[];
}

const GrailSchema = new mongoose.Schema<IGrail>({
  name: String,
  sets: Object,
  uniques: Object,
});

export const Grail = mongoose.model<IGrail>("grails", GrailSchema);

GrailSchema.set("toObject", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
