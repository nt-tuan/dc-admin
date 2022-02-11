import * as Yup from "yup";

import { Field, Form, Formik } from "formik";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { FormHelperText } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { REQUIRED_ERR } from "commons/consts";
import React from "react";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { TextField } from "components/commons/fields";
import Typography from "@mui/material/Typography";

const QuestionSelect = ({
  name,
  value,
  onChange,
  label,
  securityQuestions,
  selectedQuestions,
  error
}) => {
  const labelId = `question-select-for-${name}`;
  return (
    <FormControl error={Boolean(error)} required>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        inputProps={{ name }}
        value={value}
        onChange={onChange}
        label={label}
      >
        {securityQuestions.map((question) => (
          <MenuItem
            title={question.content}
            disabled={selectedQuestions.includes(question.id)}
            key={question.id}
            value={question.id}
          >
            {question.content}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
};

const getFieldValidation = (name) => Yup.string().required(REQUIRED_ERR(name));
const validationSchema = Yup.object({
  questions: Yup.array(
    Yup.object({
      answerContent: getFieldValidation("Answer"),
      questionId: getFieldValidation("Security Question")
    })
  )
});

export function PassCodeQuestionForm({ onFinish, securityQuestions }) {
  return (
    <Formik
      onSubmit={(values) => onFinish(values.questions)}
      validationSchema={validationSchema}
      initialValues={{
        questions: [
          {
            questionId: "",
            answerContent: ""
          },
          {
            questionId: "",
            answerContent: ""
          },
          {
            questionId: "",
            answerContent: ""
          }
        ]
      }}
    >
      <Form>
        <Typography variant="h6">Update your passcode</Typography>
        <Typography>
          The passcode will be used to verify your identity while withdrawing the funds
        </Typography>
        <Stack mt={4} direction="column" spacing={4}>
          {[0, 1, 2].map((index) => (
            <Stack key={index} direction="column" spacing={1}>
              <Field name={`questions[${index}].questionId`}>
                {({ field, form, meta }) => {
                  const values = form.values;
                  const selectedQuestions = [];
                  for (let i = 0; i < 3; i++) {
                    const currentValue = values.questions[i]?.questionId;
                    if (currentValue) {
                      selectedQuestions.push(currentValue);
                    }
                  }

                  return (
                    <QuestionSelect
                      selectedQuestions={selectedQuestions}
                      securityQuestions={securityQuestions}
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      error={meta.touched && meta.error}
                      label={`Security Question ${index + 1}`}
                    />
                  );
                }}
              </Field>
              <TextField
                required
                name={`questions[${index}].answerContent`}
                label={`Answer ${index + 1}`}
              />
            </Stack>
          ))}
          <Button sx={{ alignSelf: "center" }} type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Form>
    </Formik>
  );
}
