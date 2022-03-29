import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import React from "react";

const removeInvalidChars = (value) => {
  if (value == null) return value;
  return value.replace(/[^0-9a-zA-Z]/, "");
};
const defaultOtpInput = new Array(6).fill("");
const isNotEmpty = (value) => {
  return value != null && value !== "";
};
export const OtpInput = ({ numberDigits = 6, onFinish, onChange }) => {
  const [digits, setDigits] = React.useState(defaultOtpInput);
  const ref = React.useRef([]);
  React.useEffect(() => {
    onChange(digits.join(""));
  }, [digits, onChange]);
  const updateInput = (newValue, i) => {
    const value = removeInvalidChars(newValue);
    if (value && value.length > 0) {
      setDigits((current) => {
        const nextDigits = [...current];
        let chars = [...value];
        for (let charIndex = 0; charIndex < chars.length && charIndex + i < 6; charIndex++) {
          const char = chars[charIndex];
          nextDigits[i + charIndex] = char;
        }
        return nextDigits;
      });
      const nextPosition = i + value.length;
      ref.current[i].blur();
      if (nextPosition < numberDigits && ref.current[nextPosition]) {
        ref.current[nextPosition].focus();
        return;
      }
      onFinish();
    }
  };
  const onInputChange = (event, i) => {
    updateInput(event.target.value, i);
  };
  const focus = (event) => event.target.select();
  const handleKeyDown = (event, i) => {
    const removeDigit = (current, at) => {
      const nextCurrent = [...current];
      nextCurrent[at] = "";
      return nextCurrent;
    };
    if (event.key === "Backspace") {
      if (isNotEmpty(event.target.value) || i === 0) {
        setDigits((current) => removeDigit(current, i));
      } else {
        setDigits((current) => removeDigit(current, i - 1));
        ref.current[i - 1].focus();
      }
      event.stopPropagation();
    }
  };
  const renderInputs = () => {
    const elements = [];
    for (let i = 0; i < numberDigits; i++) {
      elements.push(
        <OutlinedInput
          autoComplete="off"
          inputRef={(element) => (ref.current[i] = element)}
          onFocus={focus}
          onChange={(event) => onInputChange(event, i)}
          onKeyDown={(event) => handleKeyDown(event, i)}
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
