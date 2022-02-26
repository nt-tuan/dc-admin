import Box from "@mui/material/Box";
import React from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { usePathParams } from "@/hooks/use-path-params";
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
export const DTCTabs = ({ tabs, value, onChange, ...props }) => {
  const handleChange = (_, newValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs {...props} value={value} onChange={handleChange} aria-label="basic tabs example">
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

const extractValue = (tabs, key, filter, defaultValue) => {
  if (tabs.some((tab) => tab.key === filter[key])) return filter[key];
  if (defaultValue) return defaultValue;
  return tabs[0]?.key;
};

export const useTabSearchParams = (tabs, key = "tab", defaultValue = null) => {
  const [filter, setFilter] = useSearchParams();
  const value = React.useMemo(() => extractValue(tabs, key, filter, defaultValue), [
    tabs,
    key,
    filter,
    defaultValue
  ]);
  const handleChange = (newValue) => {
    setFilter({ ...filter, [key]: newValue });
  };
  return [value, handleChange];
};

export const useTabPathParams = (tabs, path, key = "tab", defaultValue = null) => {
  const [filter, setFilter] = usePathParams(path);
  const value = React.useMemo(() => extractValue(tabs, key, filter, defaultValue), [
    tabs,
    key,
    filter,
    defaultValue
  ]);
  const handleChange = (newValue) => {
    setFilter({ ...filter, [key]: newValue });
  };
  return [value, handleChange];
};
