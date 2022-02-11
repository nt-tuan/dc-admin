import { Field } from "formik";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";

//** Generate Characters */
const generateNumbers = () => {
  const numbers = [];
  for (let i = 0; i < 10; i++) {
    numbers.push(i);
  }
  return numbers;
};

const OPTIONS = [...generateNumbers()];
function PassCodeItemForm({ name, characters }) {
  return (
    <Stack direction="column" spacing={1}>
      {characters.map((character) => {
        const label = `Character ${character + 1}`;
        return (
          <Field key={character} name={`${name}[${character}]`}>
            {({ field }) => {
              return (
                <FormControl required>
                  <InputLabel>{label}</InputLabel>
                  <Select
                    value={field.value}
                    onChange={field.onChange}
                    key={character}
                    label={label}
                    name={`${name}[${character}]`}
                  >
                    {OPTIONS.map((letter) => (
                      <MenuItem value={letter} key={`${name}-${letter}`}>
                        {letter}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            }}
          </Field>
        );
      })}
    </Stack>
  );
}

export default PassCodeItemForm;
