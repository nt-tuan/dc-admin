import React, { memo, useState } from "react";

import Box from "@mui/material/Box";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { MESSAGES } from "commons/consts";
import { PhoneVerifyForm } from "./phone-verify-form.comp";
import { Popconfirm } from "components/commons";
import { Property } from "components/commons/property";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import WarningIcon from "@mui/icons-material/Warning";
//** components */
import countryList from "assets/country.json";

const InformationView = memo((props) => {
  const {
    user: { username, middleName, firstName, lastName, email, country, phone, phoneVerified },
    handleSendRequest
  } = props;
  const countryValue = countryList.find((it) => it.alpha2Code === country)?.name;
  const [isSendCode, setIsSendCode] = useState(false);

  //** Handle Send Code */
  const handleSendCode = () => {
    handleSendRequest();
    setIsSendCode(true);
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={10} lg={8} xl={6}>
        <Stack direction="column" spacing={1}>
          <Property label="Username: " value={username} />
          <Property label="First Name: " value={firstName} />
          <Property label="Middle Name: " value={middleName} />
          <Property label="Last Name: " value={lastName} />
          <Property label="Email: " value={email} />
          <Property label="Country: " value={countryValue} />
          <Property
            label="Phone Number: "
            value={
              <Stack alignItems="center" spacing={1} direction="row">
                <Box>{phone}</Box>
                {phoneVerified ? (
                  <Tooltip title="Verified" placement="top">
                    <CheckBoxIcon color="success" />
                  </Tooltip>
                ) : (
                  <Popconfirm
                    id="verify-phone-number-popconfirm"
                    title={MESSAGES.VERIFY_PHONE_NOW}
                    okText="Yes"
                    onConfirm={!isSendCode ? handleSendCode : null}
                    cancelText="No"
                  >
                    <IconButton>
                      <WarningIcon color="warning" />
                    </IconButton>
                  </Popconfirm>
                )}
              </Stack>
            }
          />
          <Property label="Username: " value={username} />
          {isSendCode && (
            <Stack direction="row" justifyContent="flex-end" alignItems="center">
              <PhoneVerifyForm onClose={() => setIsSendCode(false)} />
            </Stack>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
});

export default InformationView;
