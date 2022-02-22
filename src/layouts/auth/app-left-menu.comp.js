import * as React from "react";
import List from "@mui/material/List";
import { useStateProvider } from "hooks/state-provider";
import SettingsMenu from "./settings-menu.comp";
import MenuItem from "./app-menu-item.comp";

export const AppLeftMenu = React.memo(({ collapsed, onExpand }) => {
  const [state] = useStateProvider();

  return (
    <List>
      {state.isSettingsMenu ? (
        <SettingsMenu collapsed={collapsed} onExpand={onExpand} />
      ) : (
        state.menu.map((item) => {
          return (
            <List key={item.key}>
              <MenuItem data={item} collapsed={collapsed} onExpand={onExpand} />
            </List>
          );
        })
      )}
    </List>
  );
});
