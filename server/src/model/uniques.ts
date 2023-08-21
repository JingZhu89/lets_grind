import mongoose from "./mongoConnect";

export interface IUniqueItem {
  index: String;
  ID: Number;
  version: Number;
  enabled: Number;
  rarity: Number;
  lvl?: Number;
  lvl_req: Number;
  code?: String;
  ItemName: String;
  found: Boolean;
  prop1?: String;
  min1?: Number;
  max1?: Number;
  stats1?: Number;
  prop2?: String;
  min2?: Number;
  max2?: Number;
  stats2?: Number;
  prop3?: String;
  min3?: Number;
  max3?: Number;
  stats3?: Number;
  prop4?: String;
  min4?: Number;
  max4?: Number;
  stats4?: Number;
  prop5?: String;
  min5?: Number;
  max5?: Number;
  stats5?: Number;
  prop6?: String;
  min6?: Number;
  max6?: Number;
  stats6?: Number;
  prop7?: String;
  min7?: Number;
  max7?: Number;
  stats7?: Number;
  prop8?: String;
  min8?: Number;
  max8?: Number;
  stats8?: Number;
  prop9?: String;
  min9?: Number;
  max9?: Number;
  stats9?: Number;
  prop10?: String;
  min10?: Number;
  max10?: Number;
  stats10?: Number;
  lineNumber: Number;
  type?: String;
  tier?: String;
}

const UniqueItemSchema = new mongoose.Schema<IUniqueItem>({
  index: { type: String, required: true },
  ID: { type: Number, required: true },
  version: { type: Number, required: true },
  enabled: { type: Number, required: true },
  rarity: { type: Number, required: true },
  lvl: Number,
  lvl_req: { type: Number, required: true },
  code: String,
  ItemName: { type: String, required: true },
  found: { type: Boolean, required: true },
  prop1: String,
  min1: Number,
  max1: Number,
  stats1: Number,
  prop2: String,
  min2: Number,
  max2: Number,
  stats2: Number,
  prop3: String,
  min3: Number,
  max3: Number,
  stats3: Number,
  prop4: String,
  min4: Number,
  max4: Number,
  stats4: Number,
  prop5: String,
  min5: Number,
  max5: Number,
  stats5: Number,
  prop6: String,
  min6: Number,
  max6: Number,
  stats6: Number,
  prop7: String,
  min7: Number,
  max7: Number,
  stats7: Number,
  prop8: String,
  min8: Number,
  max8: Number,
  stats8: Number,
  prop9: String,
  min9: Number,
  max9: Number,
  stats9: Number,
  prop10: String,
  min10: Number,
  max10: Number,
  stats10: Number,
  lineNumber: Number,
  type: String,
  tier: String,
});

export const UniqueItem = mongoose.model<IUniqueItem>(
  "uniques",
  UniqueItemSchema
);

UniqueItemSchema.set("toObject", {
  transform: (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
