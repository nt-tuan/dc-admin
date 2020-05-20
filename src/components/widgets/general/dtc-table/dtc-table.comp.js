import { Button, Dropdown, Input, Menu, Table } from "antd";
import PropTypes from "prop-types";
import React from "react";
import styles from "./styles.module.scss";

/*
  The goal of this component is to provide an easy way to build tables across
  this app.

  Currently this component creates a table with the following functionalites:
  - Sorting of columns
  - Search column items by text
  - Pagination

*/
export const DTCTable = ({
  data,
  columns,
  showSettings = true,
  isLoading = false,
  onSettingClick,
  searchTextValue = ""
}) => {
  const [sortedInfo, setSortedInfo] = React.useState({});
  const [searchText, setSearchText] = React.useState(searchTextValue);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);

  const filteredData = (() => {
    if (searchText === "") {
      return data;
    }
    return data.filter((dataObj) => {
      const result = Object.entries(dataObj).find(([fieldName, value]) => {
        if (value === undefined || fieldName === "id") {
          return false;
        }
        return value.toString().toLowerCase().trim().includes(searchText.toLowerCase().trim());
      });
      return result;
    });
  })();

  const mappedColumns = ((cols) => {
    return cols.map((col) => ({
      ...col,
      sortOrder: sortedInfo.columnKey === col.key && sortedInfo.order,
      render: col.makeRender({ searchText })
    }));
  })(columns);

  return (
    <React.Fragment>
      <div className="d-flex flex-wrap">
        <div className="flex-grow-1 pb-3">
          <span>Show</span>
          <Dropdown
            className="mx-2"
            overlay={
              <Menu onClick={(e) => setItemsPerPage(Number(e.key))}>
                <Menu.Item key={5}>5</Menu.Item>
                <Menu.Item key={10}>10</Menu.Item>
                <Menu.Item key={25}>25</Menu.Item>
                <Menu.Item key={50}>50</Menu.Item>
                <Menu.Item key={100}>100</Menu.Item>
              </Menu>
            }
          >
            <Button>
              {itemsPerPage} <i className="fe fe-chevron-down ml-2" />
            </Button>
          </Dropdown>
          <span>entries</span>
        </div>
        <div className="pb-3">
          <span className="mr-2">Search:</span>
          <Input
            onChange={(e) => setSearchText(e.target.value)}
            className={`d-inline-block ${styles["search-input"]}`}
            value={searchText}
          />
          {showSettings ? (
            <Button type="link" shape="circle" onClick={onSettingClick}>
              <i className="fe fe-settings" />
            </Button>
          ) : null}
        </div>
      </div>
      <div className={`air__utils__scrollTable ${styles["custom-pagination"]}`}>
        <Table
          pagination={{
            pageSize: itemsPerPage,
            total: filteredData.length,
            showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total} entries`,
            showLessItems: true
          }}
          loading={isLoading}
          scroll={{ x: true }}
          rowKey={(record) => record.id}
          columns={mappedColumns}
          dataSource={filteredData}
          onChange={(pagination, filters, sorter) => setSortedInfo(sorter)}
          showLessItems={true}
        />
      </div>
    </React.Fragment>
  );
};

DTCTable.propTypes = {
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      dataIndex: PropTypes.string,
      key: PropTypes.string,
      sorter: PropTypes.func,

      /*
        This function receives an object with the text currently being searched on the table,
        and should return another function that receives the text, record and index
        associated with a table cell, and should return a React Component to be rendered
        on the table cell.
        Signature: ({searchText}) => (text, record, index) => React.Component
      */
      makeRender: PropTypes.func.isRequired
    })
  ).isRequired
};
