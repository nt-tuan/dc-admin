import { Header, ToggleEditButton } from "components/commons";
import React, { useEffect, useState } from "react";
import { getBankDetails, getCompanyInfo } from "services/bankDetail.service";

import { BankDetailForm } from "./bank-detail-form";
import BankDetailView from "./bank-detail-view";
import { ThreeStepVerify } from "components/auth/three-step-verify";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { useSnackbar } from "notistack";

const BankDetailsTab = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [companyName, setCompanyName] = React.useState();
  const [isShowView, setIsShowView] = useState(true);
  const [bankDetails, setBankDetails] = useState();
  React.useEffect(() => {
    getCompanyInfo().then((company) => setCompanyName(company.name));
  }, []);

  //** Fetch Bank details */
  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      try {
        const res = await getBankDetails();
        setBankDetails(res);
      } catch (error) {
        enqueueSnackbar("Get Bank Detail Error", { variant: "error" });
      }
    });
  }, [enqueueSnackbar]);

  //** Handle Edit toggle */
  const toggleEdit = () => {
    setIsShowView((state) => !state);
  };

  return (
    <div>
      <Header
        action={<ToggleEditButton variant="contained" isEdit={!isShowView} onClick={toggleEdit} />}
        subtitle="Bank Accounts linked to you wallet for removing and adding funds."
      >
        Bank Details
      </Header>

      <ThreeStepVerify open={!isShowView} onCancel={() => setIsShowView(true)} />

      {!isShowView && (
        <BankDetailForm
          bankDetails={bankDetails}
          companyName={companyName}
          onUpdated={() => setIsShowView(true)}
        />
      )}

      {/* Show Information view */}
      {isShowView && <BankDetailView />}
    </div>
  );
};

BankDetailsTab.propTypes = {};
BankDetailsTab.defaultProps = {};

export default BankDetailsTab;
