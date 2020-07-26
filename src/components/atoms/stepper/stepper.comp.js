import { Button, Steps } from "antd";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { isScreensize } from "utils/general.util";

const { Step } = Steps;

export const Stepper = ({ title, steps = [], onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const isSmallDevice = isScreensize("sm");

  const handleNextClick = () => {
    asyncErrorHandlerWrapper(async () => {
      const canMove = await steps[currentStep + 1].canMove();
      canMove && currentStep < steps.length - 1 && setCurrentStep(currentStep + 1);
    });
  };

  const handlePrevClick = () => {
    currentStep > 0 && setCurrentStep(currentStep - 1);
  };

  const handleSubmitClick = () => {
    onSubmit();
  };

  return (
    <Fragment>
      <h5 className="text-center p-3">{title}</h5>
      <Steps
        className={null}
        current={currentStep}
        labelPlacement="vertical"
        size="default"
        direction={isSmallDevice ? "vertical" : "horizontal"}
        onChange={(targetStep) => {
          asyncErrorHandlerWrapper(async () => {
            if (currentStep > targetStep) {
              setCurrentStep(targetStep);
            } else {
              const canMove = await steps[targetStep].canMove();
              canMove && setCurrentStep(targetStep);
            }
          });
        }}
      >
        {steps.map((step) => (
          <Step
            key={step.title}
            description={step.title}
            icon={step.stepIndex === currentStep ? <i className="fe fe-edit" /> : null}
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
    </Fragment>
  );
};

Stepper.propTypes = {
  onSubmit: PropTypes.func,
  steps: PropTypes.array,
  title: PropTypes.string
};
