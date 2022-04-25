import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import React from "react";
import Tab from "@mui/material/Tab";
import Tabs, { TabsProps } from "@mui/material/Tabs";
import { usePathParams } from "@/hooks/use-path-params";
import { useSearchParams } from "@/hooks/use-search-params";

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

interface TabDef {
  key: string;
  label: string;
  component: React.ReactNode;
}
interface Props extends Omit<TabsProps, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  actions?: React.ReactNode;
  tabs: TabDef[];
}
export const DTCTabs = ({ tabs, value, onChange, actions, ...props }: Props) => {
  const handleChange = (_, newValue: string) => {
    if (onChange) {
      onChange(newValue);
    }
  };
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Stack direction="row">
          <Box width={0} flexGrow={1}>
            <Tabs {...props} value={value} onChange={handleChange} aria-label="basic tabs example">
              {tabs.map((tab) => (
                <Tab key={tab.key} value={tab.key} label={tab.label} {...a11yProps(tab.key)} />
              ))}
            </Tabs>
          </Box>
          {actions && (
            <Stack direction="row" alignItems="center" justifyContent="flex-end">
              {actions}
            </Stack>
          )}
        </Stack>
      </Box>
      {tabs.map((tab) => (
        <TabPanel key={tab.key} value={value} index={tab.key}>
          <Box mx={-3}>{tab.component}</Box>
        </TabPanel>
      ))}
    </Box>
  );
};

const extractValue = (
  tabs: Omit<TabDef, "component">[],
  key: string,
  filter: Record<string, string>,
  defaultValue: string | null
) => {
  if (tabs.some((tab) => tab.key === filter[key])) return filter[key];
  if (defaultValue) return defaultValue;
  return tabs[0]?.key;
};

export const useTabSearchParams: (
  tabs: TabDef[],
  key?: string,
  defaultValue?: string | null
) => [string, (newValue: string) => void] = (tabs, key = "tab", defaultValue = null) => {
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

export const useTabPathParams = (
  tabs: Omit<TabDef, "component">[],
  path: string,
  key = "tab",
  defaultValue = null
) => {
  const [filter, setFilter] = usePathParams(path);
  const value = React.useMemo(() => extractValue(tabs, key, filter, defaultValue), [
    tabs,
    key,
    filter,
    defaultValue
  ]);
  const handleChange = (newValue: string) => {
    setFilter({ ...filter, [key]: newValue });
  };
  return [value, handleChange] as [string, (value: string) => void];
};
