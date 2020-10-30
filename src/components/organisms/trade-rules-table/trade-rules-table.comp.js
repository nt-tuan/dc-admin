import { Table, Checkbox, message } from "antd";
import React, {
  memo,
  useMemo,
  useEffect,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef
} from "react";

import { TradeRuleService } from "services/trade-rule.service";

const RULE_TYPE = {
  IS_BUYER: "isBuyer",
  IS_PRODUCER: "isProducer"
};

export const TradeRulesTable = memo(
  forwardRef(({ selectedDoc }, tradeRuleTableRef) => {
    const [tableValue, setTableValue] = useState({});
    const [ruleList, setRuleList] = useState([]);
    useImperativeHandle(tradeRuleTableRef, () => ({
      getTradeRuleData
    }));

    const getTradeRuleData = () => {
      const invalidRow = Object.keys(tableValue).find((id) => {
        const rowValue = tableValue[id];
        return !rowValue[RULE_TYPE.IS_PRODUCER] && !rowValue[RULE_TYPE.IS_BUYER];
      });
      if (invalidRow) {
        message.error(`Please select value for ${invalidRow}`);
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
        title: "Producer",
        key: RULE_TYPE.IS_PRODUCER,
        dataIndex: RULE_TYPE.IS_PRODUCER,
        render: (isChecked, record) => {
          return (
            <Checkbox
              className="error"
              defaultChecked={isChecked}
              onChange={(e) => onChangeRule(e, record, RULE_TYPE.IS_PRODUCER)}
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
        const currentRecordData = tableValue[record.id];
        setTableValue({
          ...tableValue,
          [record.id]: { ...currentRecordData, [type]: event.target.checked }
        });
      },
      [tableValue]
    );

    useEffect(() => {
      //api to get trade rule table
      const listResponse = selectedDoc.map(async (docId) => {
        // const rs = await TradeRuleService.getTradeRule(docId);
        // return rs;
        return new Promise((resolve) =>
          setTimeout(
            resolve({
              id: "sampleId",
              docName: "doc sample",
              [RULE_TYPE.IS_PRODUCER]: false,
              [RULE_TYPE.IS_BUYER]: false
            })
          )
        );
      });

      Promise.all(listResponse).then((list) => {
        const tableValue = {};
        list.forEach((item) => {
          const id = item.id;
          tableValue[id] = {
            [RULE_TYPE.IS_PRODUCER]: false,
            [RULE_TYPE.IS_BUYER]: false
          };
        });
        setRuleList(list);
        setTableValue(tableValue);
      });
    }, [selectedDoc]);

    const getRowKey = useMemo((doc) => doc?.id, []);

    return (
      <div className="mt-3 mb-3">
        <Table columns={tradeRuleColumn} dataSource={ruleList} rowKey={getRowKey}></Table>
      </div>
    );
  })
);
