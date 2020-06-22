import { Button, Dropdown, Input, Menu, Table } from "antd";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { DTCHighlighter } from "../dtc-highlighter/dtc-highlighter.comp";
import styles from "./styles.module.scss";
import { LoadingIndicator } from "../loading-indicator/loading-indicator.comp";

export const DTCTable = React.memo(
  ({
    rowSelection = null,
    dataSource,
    schema,
    renderTopContent,
    loading,
    hiddenColumns = [],
    showSetting,
    onSettingClick,
    className,
    renderFooter = () => {},
    onChange
  }) => {
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchText, setSearchText] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const filtered = (() => {
      if (searchText === "") {
        return dataSource;
      }
      const result = dataSource.filter((bid) => {
        return Object.entries(bid).find(([, value]) => {
          return (
            value && value.toString().toLowerCase().trim().includes(searchText.toLowerCase().trim())
          );
        });
      });
      return result;
    })();

    const handlePageSizeChange = (e) => {
      setItemsPerPage(Number(e.key));
      setCurrentPage(1);
    };

    return (
      <div className={classNames(className)}>
        {renderTopContent()}
        <div className="d-flex flex-wrap">
          <div className="flex-grow-1 pb-3">
            <span>Show</span>
            <Dropdown
              className="mx-2"
              overlay={
                <Menu onClick={handlePageSizeChange}>
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
            {showSetting ? (
              <Button type="link" shape="circle" onClick={onSettingClick}>
                <i className="fe fe-settings" />
              </Button>
            ) : null}
          </div>
        </div>
        <div className={`air__utils__scrollTable ${styles["custom-pagination"]}`}>
          <Table
            showSorterTooltip={false}
            rowSelection={rowSelection}
            loading={{ indicator: <LoadingIndicator />, spinning: loading }}
            pagination={{
              pageSize: itemsPerPage,
              total: filtered.length,
              showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total} entries`,
              showLessItems: true,
              onChange: (page, pageSize) => {
                setCurrentPage(page);
              },
              current: currentPage
            }}
            scroll={{ x: true }}
            rowKey={(record) => record.id}
            columns={schema(sortedInfo, DTCHighlighter, searchText, hiddenColumns)}
            dataSource={filtered}
            onChange={(pagination, filters, sorter, value) => {
              if (value.currentDataSource.length === dataSource.length) {
                onChange && onChange(value.currentDataSource);
              }
              setSortedInfo(sorter);
            }}
            showLessItems={true}
          />
          {renderFooter()}
        </div>
      </div>
    );
  }
);

DTCTable.propTypes = {
  loading: PropTypes.bool,
  showSetting: PropTypes.bool,
  className: PropTypes.string,
  dataSource: PropTypes.array,
  rowSelection: PropTypes.object,
  hiddenColumns: PropTypes.array,
  schema: PropTypes.func,
  renderFooter: PropTypes.func,
  onSettingClick: PropTypes.func,
  renderTopContent: PropTypes.func
};

DTCTable.defaultProps = {
  loading: true,
  showSetting: false,
  className: "",
  dataSource: [],
  hiddenColumns: [],
  rowSelection: undefined,
  schema: () => {},
  renderFooter: () => {},
  onSettingClick: () => {},
  renderTopContent: () => {}
};
