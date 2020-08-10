import { Form, Select, Table } from "antd";
import React, { useContext, useEffect, useRef, useState, forwardRef, useCallback } from "react";

const EditableContext = React.createContext();

const EditableRow = ({ rowId, onMount, ...props }) => {
  const [selectedActors, setSelectedActors] = useState({
    Seller: undefined,
    Buyer: undefined,
    "Logistic Service Provider": undefined,
    "Inspection Provider": undefined
  });
  const [form] = Form.useForm();

  useEffect(() => {
    onMount && onMount(form);
  }, [onMount, form]);

  const handleActorChange = (actor, fieldName) => {
    const key = Object.keys(selectedActors).find((k) => selectedActors[k] === fieldName);
    if (actor === undefined) {
      setSelectedActors({
        ...selectedActors,
        [key]: undefined
      });
    } else {
      setSelectedActors({
        ...selectedActors,
        [key]: undefined,
        [actor]: fieldName
      });
    }
  };

  return (
    <Form name={rowId} form={form} component={false}>
      <EditableContext.Provider value={{ form: form, handleActorChange, selectedActors }}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  onChange,
  ...restProps
}) => {
  // const [editing, setEditing] = useState(true);
  const inputRef = useRef();
  const { handleActorChange, selectedActors } = useContext(EditableContext);

  let childNode = children;
  if (editable) {
    childNode = (
      <Form.Item
        style={{
          margin: 0
        }}
        name={dataIndex}
        initialValue={record[dataIndex]}
        rules={[
          {
            required: true,
            message: `${title} is required.`
          }
        ]}
      >
        {dataIndex === "document" ? (
          <div>{record[dataIndex]}</div>
        ) : (
          <Select
            ref={inputRef}
            onChange={(e) => handleActorChange(e, dataIndex)}
            style={{ width: 200 }}
            allowClear
            disabled={record.disabled}
          >
            {["Seller", "Buyer", "Logistic Service Provider", "Inspection Provider"]
              .filter((actor) => selectedActors[actor] === undefined)
              .map((item) => (
                <Select.Option value={item} key={item}>
                  {item}
                </Select.Option>
              ))}
          </Select>
        )}
      </Form.Item>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export const DocumentRuleTable = forwardRef(({ data }, ref) => {
  const [dataSource, setDatasource] = useState(data);

  useEffect(() => {
    setDatasource(data);
  }, [data]);

  const columns = [
    {
      title: "Document",
      dataIndex: "document",
      editable: true
    },
    {
      title: "Provider",
      dataIndex: "provider",
      editable: true
    },
    {
      title: "Viewer 1",
      dataIndex: "viewer1",
      editable: true
    },
    {
      title: "Viewer 2",
      dataIndex: "viewer2",
      editable: true
    },
    {
      title: "Viewer 3",
      dataIndex: "viewer3",
      editable: true
    }
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  };
  const _columns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title
      })
    };
  });

  const handleRowMount = useCallback(
    (record) => (formRef) => {
      ref && ref.current.set(record.id, formRef);
    },
    [ref]
  );

  return (
    <div className="air__utils__scrollTable">
      <Table
        pagination={{
          hideOnSinglePage: true,
          pageSize: 1000
        }}
        scroll={{ x: true }}
        rowKey="id"
        components={components}
        onRow={(record) => ({
          rowId: record.id,
          onMount: handleRowMount(record)
        })}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={_columns}
      />
    </div>
  );
});
