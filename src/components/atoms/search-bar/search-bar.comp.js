import React from "react";
import { Input } from "antd";

export const SearchBar = React.memo(
  ({ onSubmit, onTyping, classname = "w-50", renderRightAddon }) => {
    return (
      <div className={classname}>
        <Input.Search
          onChange={(e) => {
            onTyping && onTyping();
            onSubmit && onSubmit(e.target.value);
          }}
          allowClear
          className="w-100"
          placeholder="Search for a product"
          addonAfter={renderRightAddon && renderRightAddon()}
        />
      </div>
    );
  }
);