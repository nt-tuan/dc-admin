import { AlertComponent, ConfirmModal, DTCTable } from "components/commons";
import { Box, Button, Tab } from "@mui/material";
import { Link, useHistory, useLocation } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { APIError } from "commons/types";
import { DTCSection } from "components/commons";
import { DatetimeUtils } from "utils/date-time.util";
import { ROUTE_SCHEMA } from "commons/schemas";
import { RouteConst } from "commons/consts";
import { RouteService } from "services";
import Stack from "@mui/material/Stack";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import countryJson from "assets/country.json";
import { getAllRecordsFromAPI } from "utils/general.util";
import qs from "qs";

export const RouteTab = () => {
  const [activeData, setActiveData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [currentTab, setTab] = useState("1");
  const [alert, setAlert] = useState({
    open: false,
    content: "",
    state: "success"
  });
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    title: "",
    innerTExt: "",
    onConfirmDelete: () => undefined
  });

  const history = useHistory();
  const location = useLocation();
  const { tab } = qs.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    if (tab) setTab("2");
  }, tab);

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
      history.push(`${RouteConst.EDIT_TRADE_ROUTE}?id=${id}`);
    },
    [history]
  );

  const handleDeleteClick = useCallback(
    (status, setFn) => (id) => {
      setConfirmModal({
        title: "Are you sure?",
        innerText: "Do you want to delete this route?",
        show: true,
        onConfirmDelete: () => {
          asyncErrorHandlerWrapper(async () => {
            try {
              await RouteService.delete(id);
              getData(status, setFn);
              setAlert({
                content: "Deleted Successfully!",
                state: "success",
                open: true
              });
            } catch (error) {
              if (error instanceof APIError) {
                const err = error.errors;
                setAlert({
                  content: err[0][1],
                  state: "warning",
                  open: true
                });
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

  const handleChangeTab = (event, newTab) => {
    setTab(newTab);
  };

  const handleCloseConfirmModal = () => {
    setConfirmModal({
      show: false,
      title: "",
      onConfirmDelete: () => undefined
    });
  };

  const handleCloseAlert = () => {
    setAlert({
      open: false,
      content: "",
      state: "success"
    });
  };

  return (
    <DTCSection>
      <DTCSection.Content>
        <Stack direction="row" justifyContent="flex-end">
          <Link to={RouteConst.CREATE_TRADE_ROUTES}>
            <Button variant="contained" className="mb-3">
              Trade Routes Creation
            </Button>
          </Link>
        </Stack>
        <TabContext sx={{ mt: 2 }} value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
              <Tab label="Active" value="1" />
              <Tab label="Pending" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box sx={{ height: "500px" }}>
              <DTCTable
                showSettings={false}
                loading={false}
                columns={ROUTE_SCHEMA.getTableSchema(
                  handleEditClick,
                  handleDeleteClick("ACTIVE", setActiveData)
                )}
                columnBuffer={
                  ROUTE_SCHEMA.getTableSchema(
                    handleEditClick,
                    handleDeleteClick("ACTIVE", setActiveData)
                  ).length
                }
                dataSource={activeData}
              />
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <Box sx={{ height: "500px" }}>
              <DTCTable
                showSettings={false}
                loading={false}
                columns={ROUTE_SCHEMA.getTableSchema(
                  handleEditClick,
                  handleDeleteClick("PENDING", setActiveData)
                )}
                columnBuffer={
                  ROUTE_SCHEMA.getTableSchema(
                    handleEditClick,
                    handleDeleteClick("PENDING", setActiveData)
                  ).length
                }
                dataSource={pendingData}
              />
            </Box>
          </TabPanel>
        </TabContext>
        <ConfirmModal
          showForm={confirmModal.show}
          title={confirmModal.title}
          innerText={confirmModal.innerText}
          onConfirmLock={confirmModal.onConfirmDelete}
          toggleShowForm={handleCloseConfirmModal}
        />
        <AlertComponent
          content={alert.content}
          open={alert.open}
          state={alert.state}
          handleClose={handleCloseAlert}
        />
      </DTCSection.Content>
    </DTCSection>
  );
};
