import React from "react";
import { Formik, Form } from "formik";
import { FormView } from "./bank-form-view.comp";
import { validationSchema } from "./validation.schema";

export const BankForm = React.forwardRef(({ intialValues, onSubmit, onTriggerSubmit }, ref) => {
  return (
    <Formik
      innerRef={ref}
      onSubmit={onSubmit}
      initialValues={intialValues}
      validationSchema={validationSchema}
    >
      <Form>
        <FormView onSubmit={onTriggerSubmit} />
      </Form>
    </Formik>
  );
});
