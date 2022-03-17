import React from "react";
import Stack from "@mui/material/Stack";
import { BankForm } from "../components/bank-form/bank-form.comp";
import Button from "@mui/lab/LoadingButton";
import { Header } from "../components/header.comp";
import { PhoneVerifier } from "@/components/auth/components/phone-verifier/phone-verifier.comp";
import { useBankController } from "../controllers/use-bank-controller";
import { createBankDetails } from "../services/bank-services";
import { getInitialValues } from "../utils/form.util";

const Addition = () => {
  const {
    cancel,
    ref,
    startUpdateBank,
    updateBank,
    verifier,
    isVerifingPhone,
    isUpdating
  } = useBankController({
    mutateFn: (values) => createBankDetails([values])
  });
  return (
    <Stack>
      <Header
        header="Add Bank Details"
        actions={
          <Button loading={isUpdating} onClick={startUpdateBank} variant="contained">
            Save
          </Button>
        }
      />
      <BankForm
        intialValues={getInitialValues()}
        onSubmit={updateBank}
        onTriggerSubmit={startUpdateBank}
        ref={ref}
      />
      <PhoneVerifier verifier={verifier} open={isVerifingPhone} onClose={cancel} />
    </Stack>
  );
};
export default Addition;
