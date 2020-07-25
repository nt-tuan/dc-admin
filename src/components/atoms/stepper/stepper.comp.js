import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button, Steps } from "antd";
import { isScreensize } from "utils/general.util";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";

const { Step } = Steps;

export const Stepper = ({ title, steps = [], onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const isSmallDevice = isScreensize("sm");

  const handleNextClick = () => {
    asyncErrorHandlerWrapper(async () => {
      const canMoveNext = await steps[currentStep].canMoveNext();
      canMoveNext && currentStep < steps.length - 1 && setCurrentStep(currentStep + 1);
    });
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
            />
          ))}
        </Steps>
        {steps.map(({ component, title }, index) => (
          <div key={title} className="my-4" hidden={currentStep !== index}>
            {component}
          </div>
        ))}
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

Stepper.propTypes = {
  onSubmit: PropTypes.func,
  steps: PropTypes.array,
  title: PropTypes.string
};
