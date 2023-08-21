import { useState } from "react";
import { IUniqueItem } from "../interfaces";
import { Box } from "@mui/system";
import Slider from "@mui/material/Slider";
import { Divider, Typography } from "@mui/material";

interface IItemProps {
  item: IUniqueItem;
  uniques: IUniqueItem[];
  setUniques: React.Dispatch<React.SetStateAction<IUniqueItem[]>>;
  checked: boolean;
}

const UniqueModal = ({ item, uniques, setUniques, checked }: IItemProps) => {
  const itemKeys = Object.keys(item);
  const props = itemKeys.filter((prop) => prop.slice(0, 4) === "prop");

  type keys = keyof IUniqueItem;

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newUniques: IUniqueItem[] = JSON.parse(JSON.stringify(uniques));
    const newItem = newUniques.find((unique) => unique.index === item.index);
    if (newItem) {
      newItem.found = checked;
    }
    setUniques(newUniques);
  };

  const handleChange = (e: Event) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;
    const uniquesCopy = JSON.parse(JSON.stringify(uniques)) as IUniqueItem[];
    const itemCopy = uniquesCopy.find((unique) => unique.index === item.index);
    if (itemCopy !== undefined && typeof itemCopy[name as keys] === "number") {
      // itemCopy[name as keys] = Number(value);
    }
    setUniques(uniquesCopy);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Typography variant="h5">{item.index}</Typography>
      <Divider />
      <Typography>{`Level Req: ${item.lvl_req.toString()}`}</Typography>
      {props.map((prop) => {
        const num = prop.slice(4);
        const min = "min" + num;
        const max = "max" + num;
        const stats = "stats" + num;
        if (item[min as keys] === item[max as keys]) {
          return (
            <Typography>
              {`${item[prop as keys]}: ${item[min as keys]}`}
            </Typography>
          );
        } else {
          return (
            <>
              <Typography>{`${item[prop as keys]} :`}</Typography>
              <Slider
                aria-label="small"
                defaultValue={item[min as keys] as number}
                valueLabelDisplay="auto"
                step={1}
                name={stats as string}
                value={item[stats as keys] as number}
                onChange={handleChange}
                marks={[
                  {
                    value: item[min as keys] as number,
                    label: item[min as keys] as number,
                  },
                  {
                    value: item[max as keys] as number,
                    label: item[max as keys] as number,
                  },
                ]}
                min={item[min as keys] as number}
                max={item[max as keys] as number}
              ></Slider>
            </>
          );
        }
      })}
    </Box>
  );
};

export default UniqueModal;
