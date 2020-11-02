import { Table, Checkbox, message } from "antd";
import isEmpty from "lodash/isEmpty";
import React, {
  memo,
  useMemo,
  useEffect,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef
} from "react";

const RULE_TYPE = {
  IS_BUYER: "BUYER",
  IS_SELLER: "SELLER"
};

export const TradeRulesTable = memo(
  forwardRef(({ selectedDoc, initialValues }, tradeRuleTableRef) => {
    const [tableValue, setTableValue] = useState({});
    const [ruleList, setRuleList] = useState([]);

    useImperativeHandle(tradeRuleTableRef, () => ({
      getTradeRuleData
    }));

    const getTradeRuleData = () => {
      if (isEmpty(tableValue)) {
        message.error(`Please select value for Documents`);
        return;
      }
      const invalidRow = Object.keys(tableValue).find((id) => {
        const rowValue = tableValue[id];
        return !rowValue[RULE_TYPE.IS_SELLER] && !rowValue[RULE_TYPE.IS_BUYER];
      });
      if (invalidRow) {
        message.error(`Please select value for ${tableValue[invalidRow]["docName"]}`);
        return;
      } else {
        return tableValue;
      }
    };

    const tradeRuleColumn = [
      {
        title: "Document",
        key: "docName",
        dataIndex: "docName"
      },
      {
        title: "Seller",
        key: RULE_TYPE.IS_SELLER,
        dataIndex: RULE_TYPE.IS_SELLER,
        render: (isChecked, record) => {
          return (
            <Checkbox
              className="error"
              defaultChecked={isChecked}
              onChange={(e) => onChangeRule(e, record, RULE_TYPE.IS_SELLER)}
            ></Checkbox>
          );
        }
      },
      {
        title: "Buyer",
        key: RULE_TYPE.IS_BUYER,
        dataIndex: RULE_TYPE.IS_BUYER,
        render: (isChecked, record) => {
          return (
            <Checkbox
              defaultChecked={isChecked}
              onChange={(e) => onChangeRule(e, record, RULE_TYPE.IS_BUYER)}
            ></Checkbox>
          );
        }
      }
    ];

    const onChangeRule = useCallback(
      (event, record, type) => {
        const currentRecordData = tableValue[record.key];
        setTableValue({
          ...tableValue,
          [record.key]: { ...currentRecordData, [type]: event.target.checked }
        });
      },
      [tableValue]
    );

    useEffect(() => {
      if (initialValues) {
        setTableValue(initialValues);
        setRuleList(Object.values(initialValues));
      }
    }, [initialValues]);

    useEffect(() => {
      const tmpValue = {};
      selectedDoc.forEach((doc) => {
        if (Object.keys(tableValue).includes(doc.id)) {
          tmpValue[doc.id] = tableValue[doc.id];
        } else {
          tmpValue[doc.id] = {
            key: doc.id,
            docName: doc.name,
            [RULE_TYPE.IS_SELLER]: false,
            [RULE_TYPE.IS_BUYER]: false
          };
        }
      });
      setTableValue(tmpValue);
      setRuleList(Object.values(tmpValue));

      // NOTE: DO NOT add dependency: 'tableValue'
    }, [selectedDoc]);

    const getRowKey = useMemo((doc) => doc?.id, []);

    return (
      <div className="mt-3 mb-3">
        <Table columns={tradeRuleColumn} dataSource={ruleList} rowKey={getRowKey}></Table>
      </div>
    );
  })
);
