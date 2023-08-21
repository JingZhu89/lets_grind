import { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { IUniqueItem, ISetItem } from "../interfaces";
import SetModal from "./SetModal";
import UniqueModal from "./UniqueModal";

interface IItemProps {
  item: IUniqueItem | ISetItem;
  uniques: IUniqueItem[];
  sets: ISetItem[];
  setUniques: React.Dispatch<React.SetStateAction<IUniqueItem[]>>;
  setSets: React.Dispatch<React.SetStateAction<ISetItem[]>>;
  selected: "uniques" | "sets";
}

const Item = ({
  item,
  uniques,
  sets,
  setUniques,
  setSets,
  selected,
}: IItemProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(!!item.found);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setChecked(!checked);
    if (!checked) {
      setModalVisible(true);
      //found status will be sent inside the modal
    } else {
      setModalVisible(false);
      //need to send the not found status back here
    }
  };

  return (
    <FormGroup>
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
        />
      ) : null}
      {modalVisible && selected === "sets" ? (
        <SetModal
          item={item as ISetItem}
          sets={sets}
          setSets={setSets}
          checked={checked}
        />
      ) : null}
    </FormGroup>
  );
};

export default Item;
