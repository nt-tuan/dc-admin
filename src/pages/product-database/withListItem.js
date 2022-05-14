import { Avatar, Button, Checkbox, Col, Empty, List, Row } from "antd";
import React, { Fragment, useState } from "react";

import { Link } from "react-router-dom";
import { LoadingIndicator } from "@/components/commons";

const checkboxStyles = {
  position: "absolute",
  top: "15px",
  zIndex: 3,
  left: "30px"
};

export const withListItem = (
  { gutter, xxl = 24, xl = 24, lg = 24, md = 24, sm = 24, xs = 24 },
  duplicateFieldName = "id"
  // eslint-disable-next-line sonarjs/cognitive-complexity
) => (ItemComponent) => {
  return React.memo(
    ({
      data = [],
      selectMode = false,
      isLoading,
      onOk,
      okText = "OK",
      disabledIds = [],
      ...restProps
    }) => {
      const [checkedList, setCheckedList] = useState({});
      const [internalDisabledIds, setInternalDisabledIds] = useState([...disabledIds]);

      const handleCheckboxClick = (checked, item) => {
        if (checked) {
          setCheckedList({ ...checkedList, [item.id]: item });
          setInternalDisabledIds([...internalDisabledIds, item[duplicateFieldName]]);
        } else {
          const removedId = internalDisabledIds.find((id) => item[duplicateFieldName] === id);
          setCheckedList({ ...checkedList, [item.id]: undefined });
          removedId &&
            setInternalDisabledIds([...internalDisabledIds.filter((id) => removedId !== id)]);
        }
      };

      const isCheckListEmpty = () =>
        Object.values(checkedList).filter((item) => item !== undefined).length === 0;

      const handleRemoveProduct = (id) => {
        setCheckedList({ ...checkedList, [id]: undefined });
      };

      const handleOkClick = () => {
        onOk && onOk(checkedList);
      };

      const renderSelectedItems = () => {
        return (
          <div className="air__utils__shadow dtc-br-10 bg-white mb-4">
            <List
              size="small"
              header={
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Selected Products</h5>
                  <Button type="primary" onClick={handleOkClick} disabled={isCheckListEmpty()}>
                    {okText}
                  </Button>
                </div>
              }
              footer={null}
              bordered
              dataSource={Object.values(checkedList).filter((item) => item !== undefined)}
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                  actions={[
                    <i className="fe fe-trash-2" onClick={() => handleRemoveProduct(item.id)} />
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.image} shape={"square"} />}
                    title={<Link to={item.link}>{item.name}</Link>}
                    description={null}
                  />
                  {item.content}
                </List.Item>
              )}
            />
          </div>
        );
      };

      const renderList = () => {
        return data.length ? (
          <Row gutter={gutter} type="flex">
            {data.map((item) => {
              return (
                <Col key={item.id} xxl={xxl} xl={xl} lg={lg} md={md} sm={sm} xs={xs}>
                  {selectMode ? (
                    <Checkbox
                      style={checkboxStyles}
                      checked={checkedList[item.id] !== undefined}
                      onChange={(e) => handleCheckboxClick(e.target.checked, item)}
                      disabled={
                        internalDisabledIds.includes(item[duplicateFieldName]) &&
                        checkedList[item.id] === undefined
                      }
                    />
                  ) : null}
                  <ItemComponent data={item} {...restProps} />
                </Col>
              );
            })}
          </Row>
        ) : (
          <div className="air__utils__shadow p-3 dtc-br-10 bg-white mb-3 text-center">
            <Empty className="w-100" image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Data" />
          </div>
        );
      };

      return (
        <Fragment>
          {selectMode ? renderSelectedItems() : null}
          {isLoading ? (
            <div className="air__utils__shadow dtc-br-10 bg-white dtc-h-min-fix-200 d-flex align-self-stretch">
              <div className="d-flex justify-content-center align-items-center w-100">
                <LoadingIndicator />
              </div>
            </div>
          ) : (
            renderList()
          )}
        </Fragment>
      );
    }
  );
};
