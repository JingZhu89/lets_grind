import { useEffect, useState } from "react";
import "./App.css";
import { Grid } from "@mui/material";
import { getUserUniques, getUserSets } from "./service";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { ISetItem, IUniqueItem } from "./interfaces";
import { Typography } from "@mui/material";
import Item from "./components/Item";
function App() {
  const [uniques, setUniques] = useState<IUniqueItem[]>([]);
  const [sets, setSets] = useState<ISetItem[]>([]);
  const [selected, setSelected] = useState<"uniques" | "sets">("uniques");

  useEffect(() => {
    const generateInitialData = async () => {
      const userUniques = await getUserUniques("jing");
      setUniques(userUniques);
      const userSets = await getUserSets("jing");
      setSets(userSets);
    };
    generateInitialData();
  }, []);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const radioValue = e.target.value;
    if (radioValue === "uniques" || radioValue === "sets") {
      setSelected(radioValue);
    }
  };
  return (
    <Grid container>
      <Grid xs={12} item>
        <Typography variant="h2" textAlign={"center"}>
          Diablo II Grail Tracker
        </Typography>
      </Grid>
      <Grid xs={12} item>
        <FormControl>
          <FormLabel>Type</FormLabel>
          <RadioGroup
            row
            defaultValue="Unique"
            name="grailType"
            value={selected}
            onChange={handleSelect}
          >
            <FormControlLabel
              value="uniques"
              control={<Radio />}
              label="Uniques"
            />
            <FormControlLabel value="sets" control={<Radio />} label="Sets" />
          </RadioGroup>
        </FormControl>
        <Grid xs={12} item>
          <Grid container>
            {selected === "uniques"
              ? uniques.map((unique) => {
                  return (
                    <Grid xs={12} md={4} item>
                      <Item
                        item={unique}
                        uniques={uniques}
                        sets={sets}
                        setUniques={setUniques}
                        setSets={setSets}
                        selected={selected}
                      />
                    </Grid>
                  );
                })
              : null}
            {selected === "sets"
              ? sets.map((set) => {
                  return (
                    <Grid xs={12} md={4} item>
                      <Item
                        item={set}
                        uniques={uniques}
                        sets={sets}
                        setUniques={setUniques}
                        setSets={setSets}
                        selected={selected}
                      />
                    </Grid>
                  );
                })
              : null}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
