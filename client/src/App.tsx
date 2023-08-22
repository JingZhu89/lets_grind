import { useEffect, useState } from "react";
import "./App.css";
import { Grid, Typography, Tabs, Tab } from "@mui/material";
import { getUserUniques, getUserSets, getUserMules } from "./service";
import { ISetItem, IUniqueItem, IMule } from "./interfaces";
import Mules from "./components/Mules";
import Item from "./components/Item";

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function App() {
  const [uniques, setUniques] = useState<IUniqueItem[]>([]);
  const [sets, setSets] = useState<ISetItem[]>([]);
  const [muleNames, setMuleNames] = useState<String[]>([]);
  const [value, setValue] = useState("uniques");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    const generateInitialData = async () => {
      const userUniques = await getUserUniques("jing");
      setUniques(userUniques);
      const userSets = await getUserSets("jing");
      setSets(userSets);
      const userMules = await getUserMules("jing");
      const muleNames = userMules.map((mule) => mule.name);
      setMuleNames(muleNames);
    };
    generateInitialData();
  }, []);

  return (
    <Grid container>
      <Grid xs={12} item>
        <Typography
          variant="h2"
          textAlign="center"
          sx={{ background: "black", color: "white" }}
        >
          Diablo II Grail Tracker
        </Typography>
      </Grid>
      <Grid
        xs={12}
        item
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Uniques" value="uniques" {...a11yProps(0)} />
          <Tab label="Sets" value="sets" {...a11yProps(1)} />
          <Tab label="Mules" value="mules" {...a11yProps(2)} />
        </Tabs>
      </Grid>
      <Grid xs={12} item>
        <Grid container>
          {value === "uniques"
            ? uniques.map((unique) => {
                return (
                  <Grid xs={12} md={4} item>
                    <Item
                      item={unique}
                      uniques={uniques}
                      sets={sets}
                      setUniques={setUniques}
                      setSets={setSets}
                      selected={value}
                      muleNames={muleNames}
                    />
                  </Grid>
                );
              })
            : null}
          {value === "sets"
            ? sets.map((set) => {
                return (
                  <Grid xs={12} md={4} item>
                    <Item
                      item={set}
                      uniques={uniques}
                      sets={sets}
                      setUniques={setUniques}
                      setSets={setSets}
                      selected={value}
                      muleNames={muleNames}
                    />
                  </Grid>
                );
              })
            : null}
          {value === "mules" ? <Mules /> : null}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
