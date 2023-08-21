import { useState } from "react";
import { ISetItem } from "../interfaces";
import { Box } from "@mui/system";
import Slider from "@mui/material/Slider";
import { Button, Divider, Typography } from "@mui/material";

interface IItemProps {
  item: ISetItem;
  sets: ISetItem[];
  setSets: React.Dispatch<React.SetStateAction<ISetItem[]>>;
  checked: boolean;
}

const SetModal = ({ item, sets, setSets, checked }: IItemProps) => {
  const itemKeys = Object.keys(item);
  const props = itemKeys.filter((prop) => prop.slice(0, 4) === "prop");

  type keys = keyof ISetItem;

  const handleSave = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const newSets: ISetItem[] = JSON.parse(JSON.stringify(sets));
    const newItem = newSets.find((set) => set.index === item.index);
    if (newItem) {
      newItem.found = checked;
    }
    setSets(newSets);
  };

  const handleChange = (e: Event) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const name = target.name as keys;
    const setsCopy = JSON.parse(JSON.stringify(sets)) as ISetItem[];
    const itemCopy = setsCopy.find((set) => set.index === item.index);
    // if (itemCopy !== undefined && typeof itemCopy[name as keys] === "number") {
    //   type fieldType = (typeof itemCopy)[name];
    //   itemCopy[name as keys] = Number(value) as fieldType;
    // }
    setSets(setsCopy);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Typography variant="h5">{item.index}</Typography>
      <Typography>{`${item.set} set`}</Typography>
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
            <Box>
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
            </Box>
          );
        }
      })}
      <Button variant="contained" onClick={handleSave}>
        Save
      </Button>
    </Box>
  );
};

export default SetModal;
