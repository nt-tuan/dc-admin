import { Form, Formik } from "formik";
import React, { useState } from "react";

import Button from "@mui/material/Button";
import { FormView } from "./bank-detail-form-view";
import IconButton from "@mui/material/IconButton";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import { RenderField } from "components/commons/fields";
import Stack from "@mui/material/Stack";
import { TwoStepsVerifycation } from "../modals/2StepsVerifycation";
import Typography from "@mui/material/Typography";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { selectUsers } from "redux/user/user.duck";
import { submitBankDetails } from "services/bankDetail.service";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

const emptyBankDetails = {
  accountName: "",
  name: "",
  bankIdType: "",
  swiftCode: "",
  accountNumber: "",
  iban: "",
  sortCode: "",
  abaNumber: "",
  address: "",
  city: "",
  state: "",
  country: null,
  postalCode: "",
  currency: null,
  recipientAddress: "",
  recipientCity: "",
  recipientState: "",
  recipientCountry: null,
  recipientPostalCode: ""
};

export function BankDetailForm({ companyName, onUpdated, bankDetails }) {
  const { enqueueSnackbar } = useSnackbar();
  const users = useSelector(selectUsers);
  const { email } = users;
  const [hasSecondary, setHasSecondary] = useState(bankDetails && bankDetails?.length > 1);
  const [submittedData, setSubmittedData] = useState();
  React.useEffect(() => {
    setHasSecondary(bankDetails && bankDetails?.length > 1);
  }, [bankDetails]);
  const handleUpdateBankDetail = () => {
    asyncErrorHandlerWrapper(async () => {
      try {
        await submitBankDetails(submittedData);
        onUpdated && onUpdated();
        enqueueSnackbar("Update Successful", { variant: "success" });
      } catch (error) {
        enqueueSnackbar("Error", { variant: "error" });
      }
    });
  };

  const handleSubmit = (values) => {
    setSubmittedData(values);
  };

  const initialValues =
    bankDetails == null || bankDetails.length === 0 ? [emptyBankDetails] : bankDetails;
  if (bankDetails == null) return <></>;
  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <FormView name="0" companyName={companyName} />
          {!hasSecondary && (
            <RenderField>
              {({ setFieldValue }) => {
                const addSecondaryBank = () => {
                  setHasSecondary(true);
                  setFieldValue("1", emptyBankDetails);
                };
                return (
                  <Button type="primary" style={{ margin: "20px 0" }} onClick={addSecondaryBank}>
                    Add a Secondary Bank Account
                  </Button>
                );
              }}
            </RenderField>
          )}
          {hasSecondary && (
            <>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mt={4}>
                <Typography variant="h4">Secondary Bank Account</Typography>
                <RenderField>
                  {({ setFieldValue }) => {
                    const removeSecondaryBank = () => {
                      setHasSecondary(false);
                      setFieldValue("1", undefined);
                    };
                    return (
                      <IconButton color="error" onClick={removeSecondaryBank}>
                        <IndeterminateCheckBoxIcon />
                      </IconButton>
                    );
                  }}
                </RenderField>
              </Stack>
              <FormView name="1" companyName={companyName} />
            </>
          )}
          <Stack direction="row" justifyContent="flex-end" mt={4}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </Form>
      </Formik>

      {submittedData && (
        <TwoStepsVerifycation
          isShowModal2Verify={submittedData != null}
          setIsShowModal2Verify={() => setSubmittedData(undefined)}
          email={email}
          handleUpdateBankDetail={handleUpdateBankDetail}
        />
      )}
    </>
  );
}
