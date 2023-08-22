import { useState } from "react";
import { ISetItem } from "../interfaces";
import {
  Button,
  Divider,
  Typography,
  MenuItem,
  Box,
  Slider,
  Select,
} from "@mui/material";
import { saveUserSets, addToMule } from "../service";

interface IItemProps {
  item: ISetItem;
  sets: ISetItem[];
  setSets: React.Dispatch<React.SetStateAction<ISetItem[]>>;
  checked: boolean;
  setModalVisible: Function;
  muleNames: String[];
}

const SetModal = ({
  item,
  sets,
  setSets,
  checked,
  setModalVisible,
  muleNames,
}: IItemProps) => {
  const itemKeys = Object.keys(item);
  const props = itemKeys.filter((prop) => prop.slice(0, 4) === "prop");
  const [selectedMule, setSelectedMule] = useState<string>("");

  type keys = keyof ISetItem;

  const handleSave = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const newSets: ISetItem[] = JSON.parse(JSON.stringify(sets));
    const newItem = newSets.find((set) => set.index === item.index);
    if (newItem) {
      newItem.found = checked.toString();
      saveUserSets("jing", newSets);
      addToMule(selectedMule, "jing", newItem);
      setSets(newSets);
    }
  };

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setModalVisible(false);
  };

  const handleChange = (e: Event) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const name = target.name as keys;
    const setsCopy = JSON.parse(JSON.stringify(sets)) as ISetItem[];
    const itemCopy = setsCopy.find((set) => set.index === item.index);
    if (itemCopy !== undefined) {
      itemCopy[name as keys] = value;
    }
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
                defaultValue={Number(item[min as keys])}
                valueLabelDisplay="auto"
                step={1}
                name={stats as string}
                value={Number(item[stats as keys])}
                onChange={handleChange}
                marks={[
                  {
                    value: Number(item[min as keys]),
                    label: Number(item[min as keys]),
                  },
                  {
                    value: Number(item[max as keys]),
                    label: Number(item[max as keys]),
                  },
                ]}
                min={Number(item[min as keys])}
                max={Number(item[max as keys])}
              ></Slider>
            </Box>
          );
        }
      })}
      <Typography>Add to Mule</Typography>
      <Select
        variant="standard"
        sx={{ display: "flex" }}
        value={selectedMule}
        label="Mule"
        onChange={(e) => {
          e.preventDefault();
          setSelectedMule(e.target.value);
        }}
      >
        {muleNames.map((name) => {
          return <MenuItem value={name as string}>{name}</MenuItem>;
        })}
      </Select>
      <Button variant="contained" onClick={handleSave}>
        Save
      </Button>
      <Button
        variant="contained"
        onClick={handleClose}
        sx={{ marginLeft: "5px" }}
      >
        Close
      </Button>
    </Box>
  );
};

export default SetModal;
