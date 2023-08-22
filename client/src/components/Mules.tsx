import React, { useState, useEffect } from "react";
import { List, ListItemButton, Grid, Typography } from "@mui/material";
import { IMule } from "../interfaces";
import { getUserMules } from "../service";
const Mules = () => {
  const [mules, setMules] = useState<IMule[]>([]);
  const [selectedMuleIndex, setSelectedMuleIndex] = useState(0);
  useEffect(() => {
    const generateInitialData = async () => {
      const userMules = await getUserMules("jing");
      setMules(userMules);
    };
    generateInitialData();
  }, []);
  return (
    <Grid container>
      <Grid item>
        <List>
          {mules.map((mule, index) => {
            return (
              <ListItemButton
                selected={selectedMuleIndex === index}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedMuleIndex(index);
                }}
                sx={{ gap: "12px" }}
              >
                {mule.name}
              </ListItemButton>
            );
          })}
        </List>
      </Grid>
      <Grid item>
        <Typography>
          {mules.length !== 0
            ? mules[selectedMuleIndex].items.map((item) => item.index).join()
            : null}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Mules;
