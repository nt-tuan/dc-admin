import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import { REQUIRED_ERR } from "commons/consts";
import { KYC3_SCHEMA } from "commons/schemas";
import { LoadingIndicator, RequestWithdrawalForm } from "components";
import { FormError } from "components/atoms";
import { BankDetailsReadonly } from "components/molecules";
import { BankDetailsForm } from "components/organisms";
import { withMultiForm } from "HOCs/withMultiForm";
import { useBooleanState } from "hooks/utilHooks";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { areObjectValuesUndefined, getPrefixUrl, toCurrency } from "utils/general.util";

const FIELDS = KYC3_SCHEMA.BANK_DETAILS;
const LABELS = KYC3_SCHEMA.KYC3_LABEL;

const EBankDetailsFormArr = withMultiForm({ name: "bank-details", formLimit: 2 })(BankDetailsForm);

export const RequestWithdrawalTab = () => {
  const [data, setData] = useState({});
  const bankDetails = [
    {
      id: "792ab728-91ce-4701-864d-022f72979ed3",
      accountHolder: "First Century Bank",
      name: "US Bank",
      accountNumber: "01234567",
      iban: "AE82 WEST 123 4567",
      swiftCode: "AEIUFPIRRO82",
      nationality: "UAE"
    },
    {
      id: "792bb728-91ce-4701-864d-022f72979ed3",
      accountHolder: "First Century Bank",
      name: "US Bank",
      accountNumber: "251853943",
      iban: "AE82 WEST 123 4567",
      swiftCode: "AEIUFPIRRO82",
      nationality: "UAE"
    }
  ];
  const [loading, setLoading] = useState(true);
  const [isEdit, toggleIsEdit] = useBooleanState(false);
  const location = useLocation();
  const prefixUrl = getPrefixUrl(location.pathname);
  // let formRefArr = [];

  const isDisabled =
    bankDetails.filter((account) => areObjectValuesUndefined(account) === false).length === 0;

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      // const res = await getWithdrawalDetails();
      const res = { available_withdrawal: 100000, outbound: 20000, inbound: 30000 };
      setData(res);
      setLoading(false);
    });
  }, []);

  const renderBankEdit = () => {
    return (
      <div>
        <EBankDetailsFormArr
          addBtnText="Add One More Account"
          // wrappedRef={(formArr) => (formRefArr = formArr)}
          initialValues={bankDetails}
          schema={SCHEMA}
        />
        <div className="text-right">
          <Button className="mt-4" size="large" htmlType="button" type="primary" onClick={() => {}}>
            Update
          </Button>
        </div>
      </div>
    );
  };

  const renderBankReadOnly = () => {
    return <BankDetailsReadonly showHeader={false} bankDetails={bankDetails || []} />;
  };

  return (
    <Fragment>
      {loading ? (
        <div className="d-flex justify-content-center">
          <LoadingIndicator />
        </div>
      ) : (
        <div>
          {isDisabled && (
            <Row className="dtc-br-10 dtc-bg-red px-4 py-3 text-white">
              Some infomation in your bank account requires review, please
              <Link to={`${prefixUrl}/profile/bank-details`}> click here </Link>
              to review them before requesting withdrawal
            </Row>
          )}

          <Row className="py-3" gutter={[16, 16]}>
            <Col
              xl={8}
              lg={12}
              span={24}
              title="This is the amount that you can actually request for a withdrawal and can be this whole amount or just a part of it."
            >
              <CustomizedCard
                primaryText="Available"
                text="for withdrawal"
                currency={data.available_withdrawal}
              />
            </Col>
            <Col xl={8} lg={12} span={24} title="Funds being processed for your withdrawal request">
              <CustomizedCard
                primaryText="Pending"
                text="outbound"
                currency={data.outbound}
                renderIcon={() => <i className="fa fa-caret-up ml-2 font-size-21 text-success" />}
              />
            </Col>
            <Col xl={8} lg={12} span={24} title="Some of Sales Invoices and Seller Commissions">
              <CustomizedCard
                primaryText="Pending"
                text="inbound"
                currency={data.inbound}
                renderIcon={() => <i className="fa fa-caret-down ml-2 font-size-21 text-danger" />}
              />
            </Col>
          </Row>

          {isDisabled === false && (
            <div className={`dtc-br-10 air__utils__shadow bg-white px-4 pt-4 ${isEdit && "pb-4"}`}>
              <div className="d-flex align-items-center mb-2">
                <b className="mr-2 text-primary">Bank Account Details</b>
                <Button
                  icon={isEdit ? <CloseOutlined /> : <EditOutlined />}
                  onClick={toggleIsEdit}
                />
              </div>
              {isEdit ? renderBankEdit() : renderBankReadOnly()}
            </div>
          )}

          <div className="dtc-br-10 air__utils__shadow bg-white px-4 py-3 mt-3">
            <RequestWithdrawalForm
              data={{ bankDetails, available_withdrawal: 100000 }}
              isDisabled={isDisabled}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

const CustomizedCard = ({ primaryText, text, currency, renderIcon }) => {
  return (
    <Card className="dtc-br-10 air__utils__shadow">
      <b className="text-uppercase">
        <span className="text-primary">{primaryText}</span> {text}
        {renderIcon && renderIcon()}
      </b>
      <div className="text-center font-weight-bold pt-2" style={{ fontSize: 28 }}>
        {toCurrency(currency)}
      </div>
    </Card>
  );
};

const SCHEMA = [
  {
    name: FIELDS.accountHolder,
    label: LABELS[FIELDS.accountHolder],
    placeholder: "Account Holder",
    className: "d-lg-inline-block col-lg-6 pr-lg-3",
    options: {
      rules: [
        {
          required: true,
          message: <FormError msg={REQUIRED_ERR(LABELS[FIELDS.accountHolder])} />
        }
      ]
    }
  },
  {
    name: FIELDS.bankName,
    label: LABELS[FIELDS.bankName],
    placeholder: "Bank Name",
    className: "d-lg-inline-block col-lg-6",
    options: {
      rules: [{ required: true, message: <FormError msg={REQUIRED_ERR("Bank Name")} /> }]
    }
  },
  {
    name: FIELDS.accountNumber,
    label: "Account Number",
    placeholder: "Account Number",
    className: "d-lg-inline-block col-lg-6 pr-lg-3",
    options: {
      rules: [{ required: true, message: <FormError msg={REQUIRED_ERR("Account Number")} /> }]
    }
  },
  {
    name: FIELDS.iban,
    label: "IBAN (What is IBAN?)",
    placeholder: "IBAN",
    className: "d-lg-inline-block col-lg-6",
    options: {
      rules: [{ required: true, message: <FormError msg={REQUIRED_ERR("IBAN")} /> }]
    }
  },
  {
    name: FIELDS.nationality,
    label: LABELS[FIELDS.nationality],
    placeholder: LABELS[FIELDS.nationality],
    className: "d-lg-inline-block col-lg-6 pr-lg-3",
    options: {
      rules: [
        {
          required: true,
          message: <FormError msg={REQUIRED_ERR(LABELS[FIELDS.nationality])} />
        }
      ]
    }
  },
  {
    name: FIELDS.swiftCode,
    label: LABELS[FIELDS.swiftCode],
    placeholder: LABELS[FIELDS.swiftCode],
    className: "d-lg-inline-block col-lg-6",
    options: {
      rules: [
        {
          required: true,
          message: <FormError msg={REQUIRED_ERR(LABELS[FIELDS.nationality])} />
        }
      ]
    }
  }
];
