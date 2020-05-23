import React from "react";
import { Select } from "antd";
const { Option } = Select;

export const FilterDropdown = ({ items, defaultValue, onChange, ...rest }) => {
  return (
    <Select
      {...rest}
      defaultValue={defaultValue}
      onChange={onChange}
      style={{ ...rest.style, minWidth: 75 }}
    >
      {items.map((item) => {
        return (
          <Option key={item.value} value={item.value}>
            {item.name}
          </Option>
        );
      })}
    </Select>
  );
};
