import Button from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom";

import { BankForm } from "../components/bank-form/bank-form.comp";
import { Header } from "../components/header.comp";
import { PhoneVerifier } from "@/components/auth/components/phone-verifier/phone-verifier.comp";
import { useBankController } from "../controllers/use-bank-controller";
import { updateBankDetails } from "../services/bank-services";
import { getInitialValues } from "../utils/form.util";

const Actions = ({ onSave, isUpdating }) => {
  return (
    <Button loading={isUpdating} variant="contained" onClick={onSave}>
      Save
    </Button>
  );
};

const Edition = () => {
  const { id } = useParams();
  const {
    bankData,
    isLoading,
    cancel,
    ref,
    startUpdateBank,
    updateBank,
    verifier,
    isVerifingPhone,
    isUpdating
  } = useBankController({ id, mutateFn: (values) => updateBankDetails(id, values) });
  if (isLoading) return <></>;
  return (
    <>
      <Stack>
        <Header
          header="Bank Details"
          actions={<Actions loading={isUpdating} onSave={startUpdateBank} />}
        />
        <BankForm
          intialValues={getInitialValues(bankData)}
          onTriggerSubmit={startUpdateBank}
          onSubmit={updateBank}
          ref={ref}
        />
      </Stack>
      <PhoneVerifier verifier={verifier} open={isVerifingPhone} onClose={cancel} />
    </>
  );
};

export default Edition;
