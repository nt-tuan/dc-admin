import React from "react";
import { Checkbox } from "antd";

export const TableSetting = React.memo(({ onSettingChange, columnOptions, labels }) => {
  return (
    <React.Fragment>
      <div className="font-weight-bold text-primary">Columns</div>
      <div className="d-flex justify-content-between flex-wrap">
        {columnOptions.map((column) => {
          return (
            <Checkbox
              className="col-6 ml-0"
              key={column}
              option={column}
              defaultChecked={true}
              onChange={onSettingChange}
            >
              {labels[column] || column}
            </Checkbox>
          );
        })}
      </div>
    </React.Fragment>
  );
});
