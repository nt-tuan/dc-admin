import Box from "@mui/material/Box";
import React from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useSearchParams } from "hooks/use-search-params";

function a11yProps(index) {
  return {
    id: `dtc-tab-${index}`,
    "aria-controls": `dtc-tabpanel-${index}`
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  if (value !== index) return null;
  return (
    <div
      role="tabpanel"
      id={`dtc-tabpanel-${index}`}
      aria-labelledby={`dtc-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
export const DTCTabs = ({ tabs, value, onChange }) => {
  const handleChange = (_, newValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {tabs.map((tab) => (
            <Tab key={tab.key} value={tab.key} label={tab.label} {...a11yProps(tab.key)} />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab) => (
        <TabPanel key={tab.key} value={value} index={tab.key}>
          {tab.component}
        </TabPanel>
      ))}
    </Box>
  );
};

export const useTabSearchParams = (tabs, defaultValue) => {
  const [filter, setFilter] = useSearchParams();
  const value = React.useMemo(() => {
    if (tabs.some((tab) => tab.key === filter?.tab)) return filter.tab;
    if (defaultValue) return defaultValue;
    return tabs[0]?.key;
  }, [tabs, filter, defaultValue]);
  const handleChange = (newValue) => {
    setFilter({ tab: newValue });
  };
  return [value, handleChange];
};
