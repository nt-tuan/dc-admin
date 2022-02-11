import {
  CompanyInfo,
  CompanyLogo,
  OwnerInfo,
  Reputation,
  UserProfile
} from "components/user-details";
import React, { useCallback, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { DTCSection } from "components/commons";
import Divider from "@mui/material/Divider";
import { Helmet } from "react-helmet";
import { RouteConst } from "commons/consts";
import Stack from "@mui/material/Stack";
import { UserService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import qs from "qs";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

const UserDetails = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { username, companyId } = qs.parse(location.search, { ignoreQueryPrefix: true });
  const history = useHistory();

  const getUserDetails = useCallback(() => {
    asyncErrorHandlerWrapper(async () => {
      const res = await UserService.getUserDetails(username);
      setData(res);
      setLoading(false);
    });
  }, [username]);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  return (
    <Box>
      <Helmet title="User Detail" />
      {loading ? (
        <Stack justifyContent="center" alignItems="center">
          <CircularProgress />
        </Stack>
      ) : (
        <DTCSection>
          <CompanyLogo companyInfo={data.companyInfo?.logoUrl} />
          <Box mt={3}>
            <UserProfile data={data.userInfo} />
          </Box>
          <Divider />
          <Box mt={3}>
            <CompanyInfo
              companyInfo={data.companyInfo}
              companyAddress={data.companyAddressInfoList}
            />
          </Box>
          <Divider />
          <Box mt={3}>
            <OwnerInfo owners={data.ownerDTOS.map((data) => ({ ...data, ...data.address }))} />
          </Box>
          <Divider />
          <Box mb={3}>
            <Reputation
              data={{
                reputation: data.companyInfo.reputation,
                reputationList: data.companyInfo.reputationList
              }}
              user={data}
              companyId={companyId}
              setLoading={setLoading}
              getUserDetails={getUserDetails}
              isEditable={true}
            />
          </Box>
          <Box mt={2}>
            <Button variant="contained" onClick={() => history.push(RouteConst.USER_MANAGEMENT)}>
              Back
            </Button>
          </Box>
        </DTCSection>
      )}
    </Box>
  );
};

export default UserDetails;
