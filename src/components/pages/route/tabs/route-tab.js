import { ExclamationCircleOutlined } from "@ant-design/icons";
import { message, Modal, Tabs, Button } from "antd";
import { RouteConst } from "commons/consts";
import { ROUTE_SCHEMA } from "commons/schemas";
import { APIError } from "commons/types";
import { DTCTable } from "components";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import { RouteService } from "services";
import { DatetimeUtils } from "utils/date-time.util";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";
import countryJson from "assets/country.json";
import qs from "qs";

const { confirm } = Modal;

export const RouteTab = () => {
  const [activeData, setActiveData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const { tab } = qs.parse(location.search, { ignoreQueryPrefix: true });

  const getData = useCallback(
    (status, setFn) =>
      asyncErrorHandlerWrapper(async () => {
        const result = await getAllRecordsFromAPI(RouteService.getAll, {
          outerParams: {
            isDefault: false,
            status
          }
        });

        setFn(
          result.map((r) => {
            const targetFromCountry = countryJson.find((c) => c.alpha2Code === r.fromCountry);
            const targetToCountry = countryJson.find((c) => c.alpha2Code === r.toCountry);
            return {
              ...r,
              createdDate: DatetimeUtils.formatDateTime(r.createdDate),
              toCountry: targetToCountry.name,
              fromCountry: targetFromCountry.name
            };
          })
        );
      }),
    []
  );

  useEffect(() => {
    getData("ACTIVE", setActiveData);
  }, [getData]);

  useEffect(() => {
    getData("PENDING", setPendingData);
  }, [getData]);

  const handleEditClick = useCallback(
    (id) => {
      history.push(`${RouteConst.EDIT_ROUTE}?id=${id}`);
    },
    [history]
  );

  const handleDeleteClick = useCallback(
    (status, setFn) => (id) => {
      confirm({
        title: "Are you sure?",
        icon: <ExclamationCircleOutlined />,
        content: "Do you want to delete this route?",
        onOk() {
          asyncErrorHandlerWrapper(async () => {
            try {
              await RouteService.delete(id);
              getData(status, setFn);
              message.success("Deleted Successfully!");
            } catch (error) {
              if (error instanceof APIError) {
                const err = error.errors;
                message.error(err[0][1]);
              } else {
                throw error;
              }
            }
          });
        }
      });
    },
    [getData]
  );

  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10">
      <div className="d-flex justify-content-end mr-4">
        <Link to={RouteConst.CREATE_TRADE_ROUTES}>
          <Button type="primary" className="mb-3">
            Trade Routes Creation
          </Button>
        </Link>
      </div>
      <Tabs defaultActiveKey={tab ? "2" : "1"} type="line">
        <Tabs.TabPane tab="Active" key="1" forceRender>
          <DTCTable
            showSettings={false}
            loading={false}
            dataSource={activeData}
            schema={ROUTE_SCHEMA.getTableSchema(
              handleEditClick,
              handleDeleteClick("ACTIVE", setActiveData)
            )}
            onChange={(value) => setActiveData(value)}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Pending" key="2" forceRender>
          <DTCTable
            showSettings={false}
            loading={false}
            dataSource={pendingData}
            schema={ROUTE_SCHEMA.getTableSchema(
              handleEditClick,
              handleDeleteClick("PENDING", setPendingData)
            )}
            onChange={(value) => setPendingData(value)}
          />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
