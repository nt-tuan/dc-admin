import React, { useState } from "react";
import { useSelector } from "react-redux";
//** components */
import { selectUsers } from "redux/user/user.duck";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { Form, Button, message } from "antd";
import { TwoStepsVerifycation } from "../modals";
import { FormView } from "./bank-detail-form-view";
import { submitBankDetails } from "services/bankDetail.service";

export function BankDetailForm({ companyName, onUpdated, bankDetails }) {
  const [primaryForm] = Form.useForm();
  const users = useSelector(selectUsers);
  const { email } = users;
  const [hasSecondary, setHasSecondary] = useState(bankDetails?.length > 1);
  const [submittedData, setSubmittedData] = useState();
  const handleUpdateBankDetail = () => {
    asyncErrorHandlerWrapper(async () => {
      try {
        await submitBankDetails(submittedData);
        onUpdated && onUpdated();
        message.success("Update Successful");
      } catch (error) {
        message.error("Error");
      }
    });
  };

  const handleFinish = (values) => {
    setSubmittedData(Object.values(values));
  };
  const addSecondaryBank = () => {
    setHasSecondary(true);
  };
  const removeSecondaryBank = () => {
    setHasSecondary(false);
  };
  if (bankDetails == null) return <></>;
  return (
    <>
      <Form
        className="customized_form_controls"
        layout="vertical"
        form={primaryForm}
        onFinish={handleFinish}
        initialValues={bankDetails}
      >
        <FormView name={0} form={primaryForm} companyName={companyName} />
        {!hasSecondary && (
          <Button type="primary" style={{ margin: "20px 0" }} onClick={addSecondaryBank}>
            Add a Secondary Bank Account
          </Button>
        )}
        {hasSecondary && (
          <>
            <h4 className="d-flex justify-content-between mt-2 mb-3">
              <span className="text-primary">Secondary Bank Account</span>
              <Button type="primary" onClick={removeSecondaryBank}>
                <i className="fe fe-minus"></i>
              </Button>
            </h4>
            <FormView name={1} form={primaryForm} companyName={companyName} />
          </>
        )}
        <div className="d-flex flex-row justify-content-center mb-4">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>

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
