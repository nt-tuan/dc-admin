import OutlinedInput from "@mui/material/OutlinedInput";
import React from "react";
import Stack from "@mui/material/Stack";

const defaultOtpInput = new Array(6).fill("");
export const OtpInput = ({ numberDigits = 6, onFinish, onChange }) => {
  const [digits, setDigits] = React.useState(defaultOtpInput);
  const ref = React.useRef([]);
  React.useEffect(() => {
    onChange(digits.join(""));
  }, [digits, onChange]);
  const onInputChange = (event, i) => {
    const { value } = event.target;
    if (value && value.length > 0) {
      setDigits((values) => {
        const nextValues = [...values];
        nextValues[i] = value[value.length - 1];
        return nextValues;
      });

      if (i < numberDigits - 1 && ref.current[i + 1]) {
        ref.current[i + 1].focus();
        return;
      }
      ref.current[i].blur();
      onFinish();
    }
  };
  const renderInputs = () => {
    const elements = [];
    for (let i = 0; i < numberDigits; i++) {
      elements.push(
        <OutlinedInput
          inputRef={(element) => (ref.current[i] = element)}
          onChange={(event) => onInputChange(event, i)}
          key={i}
          value={digits[i]}
        />
      );
    }
    return <>{elements}</>;
  };
  React.useEffect(() => {
    if (ref.current[0]) {
      ref.current[0].focus();
    }
  }, []);
  return (
    <Stack direction="row" spacing={1}>
      {renderInputs()}
    </Stack>
  );
};
