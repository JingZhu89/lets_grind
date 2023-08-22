import { useState } from "react";
import { IUniqueItem, ISetItem } from "../interfaces";
import SetModal from "./SetModal";
import UniqueModal from "./UniqueModal";
import {
  Checkbox,
  Button,
  FormGroup,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { saveUserSets, saveUserUniques } from "../service";

interface IItemProps {
  item: IUniqueItem | ISetItem;
  uniques: IUniqueItem[];
  sets: ISetItem[];
  setUniques: React.Dispatch<React.SetStateAction<IUniqueItem[]>>;
  setSets: React.Dispatch<React.SetStateAction<ISetItem[]>>;
  selected: "uniques" | "sets";
  muleNames: String[];
}

const Item = ({
  item,
  uniques,
  sets,
  setUniques,
  setSets,
  selected,
  muleNames,
}: IItemProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(!!item.found);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newStatus = !checked;
    setChecked(newStatus);
    if (newStatus) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
    if (selected === "sets") {
      const newSets: ISetItem[] = JSON.parse(JSON.stringify(sets));
      const newItem = newSets.find((set) => set.index === item.index);
      if (newItem) {
        newItem.found = newStatus.toString();
      }
      saveUserSets("jing", newSets);
      setSets(newSets);
    }
    if (selected === "uniques") {
      const newUniques: IUniqueItem[] = JSON.parse(JSON.stringify(uniques));
      const newItem = newUniques.find((unique) => unique.index === item.index);
      if (newItem) {
        newItem.found = newStatus.toString();
      }
      saveUserUniques("jing", newUniques);
      setUniques(newUniques);
    }
  };

  return (
    <Grid xs={12} container>
      <Grid xs={8} item>
        <FormGroup style={{ marginLeft: "20%" }}>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChange} />}
            label={item.index}
          />

          {modalVisible && selected === "uniques" ? (
            <UniqueModal
              item={item as IUniqueItem}
              uniques={uniques}
              setUniques={setUniques}
              checked={checked}
              setModalVisible={setModalVisible}
              muleNames={muleNames}
            />
          ) : null}
          {modalVisible && selected === "sets" ? (
            <SetModal
              item={item as ISetItem}
              sets={sets}
              setSets={setSets}
              checked={checked}
              setModalVisible={setModalVisible}
              muleNames={muleNames}
            />
          ) : null}
        </FormGroup>
      </Grid>
      <Grid xs={4} item>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-plus"
          onClick={(e) => {
            e.preventDefault();
            setModalVisible(!modalVisible);
          }}
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
      </Grid>
    </Grid>
  );
};

export default Item;
