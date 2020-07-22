import React, { useState } from "react";
import { Button, Steps } from "antd";
import { isScreensize } from "utils/general.util";

const { Step } = Steps;

export const Stepper = ({ title, steps, renderStepContent, onSave, savedDataArray, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const isSmallDevice = isScreensize("sm");

  const handleNextClick = async () => {
    const res = await steps[currentStep].onNext();
    if (res) {
      onSave(currentStep, res);
    }
    currentStep < 3 && setCurrentStep(currentStep + 1);
  };

  const handlePrevClick = () => {
    currentStep > 0 && setCurrentStep(currentStep - 1);
  };

  const handleSubmitClick = () => {
    onSubmit();
  };

  return (
    <div className="dtc-br-10 air__utils__shadow bg-white p-4">
      <h5 className="text-center p-3">{title}</h5>
      <div>
        <Steps
          className={null}
          current={currentStep}
          labelPlacement="vertical"
          size="default"
          direction={isSmallDevice ? "vertical" : "horizontal"}
          onChange={(value) => setCurrentStep(value)}
        >
          {steps.map((step, index) => (
            <Step
              key={step.title}
              description={step.title}
              icon={index === currentStep ? <i className="fe fe-edit" /> : null}
              disabled={
                savedDataArray.length !== steps.length - 1 && index > savedDataArray.length - 1
              }
            />
          ))}
        </Steps>
        <div className="my-4">{renderStepContent(currentStep)}</div>
        <div className="d-flex justify-content-end">
          {currentStep > 0 && (
            <Button type="primary" onClick={handlePrevClick}>
              Previous
            </Button>
          )}
          {currentStep === 3 ? (
            <Button className="ml-2" type="primary" onClick={handleSubmitClick}>
              Submit
            </Button>
          ) : (
            <Button className="ml-2" type="primary" onClick={handleNextClick}>
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
