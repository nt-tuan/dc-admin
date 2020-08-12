import { Button, Modal, message } from "antd";
import { RouteConst } from "commons/consts";
import { ROUTE_SCHEMA } from "commons/schemas";
import { DTCTable } from "components";
import React, { useEffect, useState, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { RouteService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";
import { DatetimeUtils } from "utils/date-time.util";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

export const DefaultRouteTab = () => {
  const [data, setData] = useState([]);
  const history = useHistory();

  const getData = useCallback(
    () =>
      asyncErrorHandlerWrapper(async () => {
        const result = await getAllRecordsFromAPI(RouteService.getAll, {
          outerParams: {
            isDefault: true
          }
        });
        setData(
          result.map((r) => {
            return {
              ...r,
              createdDate: DatetimeUtils.formatDateTime(r.createdDate)
            };
          })
        );
      }),
    []
  );

  useEffect(() => {
    getData();
  }, [getData]);

  const handleEditClick = useCallback(
    (id) => {
      history.push(`${RouteConst.EDIT_DEFAULT_ROUTE}?id=${id}`);
    },
    [history]
  );

  const handleDeleteClick = useCallback(
    (id) => {
      confirm({
        title: "Are you sure?",
        icon: <ExclamationCircleOutlined />,
        content: "Do you want to delete this route?",
        onOk() {
          asyncErrorHandlerWrapper(async () => {
            await RouteService.delete(id);
            getData();
            message.success("Delete Successfully!");
          });
        }
      });
    },
    [getData]
  );

  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10">
      <div className="d-flex justify-content-end">
        <Link to={RouteConst.ADD_DEFAULT_ROUTE}>
          <Button type="primary" className="mb-3">
            Create Default Route
          </Button>
        </Link>
      </div>

      <DTCTable
        showSettings={false}
        loading={false}
        dataSource={data}
        schema={ROUTE_SCHEMA.getTableSchema(handleEditClick, handleDeleteClick)}
        onChange={(value) => setData(value)}
      />
    </div>
  );
};
