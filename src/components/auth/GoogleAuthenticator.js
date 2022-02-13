import * as USER_ACTIONS from "redux/user/user.duck";

import { Button, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import {
  getGoogleAuthenticator,
  validateGoogleAuthenticator
} from "services/two-factor-auth.service";

import GoogleAuthenticatorVerificationForm from "./GoogleAuthenticatorVerificationForm";
import { LoadingIndicator } from "components/commons";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { useBooleanState } from "hooks/utilHooks";
import { useDispatch } from "react-redux";

function GoogleAuthenticator({ isGAVerified, toogleGoogleAuthenticator }) {
  const [data, setData] = useState({});
  const [showCopySuccess, setShowCopySuccess] = useBooleanState(false);
  const [step1, setStep1] = useBooleanState(true);
  const [step2, setStep2] = useBooleanState(false);
  const [step3, setStep3] = useBooleanState(false);
  const [loading, setLoading] = useBooleanState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const result = await getGoogleAuthenticator();
      setData(result);
      setLoading();
    });
  }, [setLoading]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setShowCopySuccess();
    setTimeout(() => {
      setShowCopySuccess();
    }, 1000);
  };
  const verifyGACode = (code) => {
    asyncErrorHandlerWrapper(async () => {
      try {
        await validateGoogleAuthenticator({ code });
        setStep2();
        setStep3();
        dispatch(USER_ACTIONS.setStateAction({ gaVerified: true }));
      } catch (error) {
        message.error("Invalid code. Please try again");
      }
    });
  };

  const goToStep2 = () => {
    setStep1();
    setStep2();
  };

  const goBackToStep1 = () => {
    setStep2();
    setStep1();
  };

  return (
    <Modal
      visible={isGAVerified}
      onCancel={() => {
        toogleGoogleAuthenticator(false);
      }}
      footer={null}
      width={800}
    >
      {loading && <LoadingIndicator />}
      {step1 && (
        <>
          <h1>Setup Google Authenticator</h1>
          <p>- Get the Google Authenticator App from Apple App Store / Google Play Store</p>
          <p>
            - In the <b>App</b>, select <b>Set up account</b>
          </p>
          <p>
            - Choose <b>Scan barcode</b>
          </p>
          <p className="text-center">
            <img src={data.qrCodeUrl} alt="qrCodeUrl" className="img-fluid" />
          </p>
          <p>
            - If you cannot scan the barcode, please copy and paste the key below in Enter a
            provided key
          </p>
          <p className="font-weight-bold d-flex justify-content-center mt-4">
            <p style={{ marginRight: "10px" }}>{data.secretKey} </p>
            {document.queryCommandSupported("copy") && (
              <Button
                title="Copy"
                type="primary"
                size="small"
                onClick={() => handleCopy(data.secretKey)}
                ghost
              >
                <i className={showCopySuccess ? "fe fe-check" : "fe fe-copy"} />
              </Button>
            )}
          </p>
          <hr />
          <p>
            <b>
              <i>Notice</i>
            </b>
            : Please save the QR Code or the Secret Key since they will help you setting up the
            Google Authenticator again in case you lose your Google Authenticator account or your
            device
          </p>
          <div className="d-flex justify-content-center mt-4">
            <Button
              className="mr-3"
              type="primary"
              onClick={() => toogleGoogleAuthenticator(false)}
            >
              Cancel
            </Button>
            <Button type="primary" onClick={goToStep2}>
              Next
            </Button>
          </div>
        </>
      )}
      {/*  ==== Step2 ==== */}
      {step2 && (
        <>
          <div>
            <div>
              <p>
                - To complete the set up, please enter the six digit code displayed in the Google
                Authenticator app
              </p>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <GoogleAuthenticatorVerificationForm
                handleVerifyGACode={verifyGACode}
                handleBackButton={goBackToStep1}
              />
            </div>
          </div>
        </>
      )}
      {/*  ==== Step3 ==== */}
      {step3 && (
        <div>
          <div>
            <br />
            Successfully set up your Google Authenticator, now you can enable this 2FA method for
            your login
            <br />
          </div>
          <div className="d-flex justify-content-center mt-4 ml-2">
            <Button type="primary" onClick={() => toogleGoogleAuthenticator(false)}>
              Exit
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
GoogleAuthenticator.propTypes = {};

export default GoogleAuthenticator;
