import React from "react";
import { Form, Select } from "antd";
import { REQUIRED_ERR } from "commons/consts";
import { createFormErrorComp } from "utils";
import PropTypes from "prop-types";

//** Generate Characters */
const generateNumbers = () => {
  const numbers = [];
  for (let i = 0; i < 10; i++) {
    numbers.push(i);
  }
  return numbers;
};
const generateCharacters = () => {
  const characters = [];
  let cha = "a";
  while (cha !== "{") {
    characters.push(cha);
    cha = String.fromCharCode(cha.charCodeAt(0) + 1);
  }
  return characters;
};
const OPTIONS = [...generateNumbers(), ...generateCharacters()];

function PassCodeItemForm({ name, requiredPositions, isVerifyPasscode }) {
  const positions = [1, 2, 3, 4, 5, 6];
  const characters = isVerifyPasscode ? requiredPositions : positions;
  return (
    <div>
      {characters.map((item) => (
        <Form.Item
          key={`position-${item}`}
          label={`Character ${isVerifyPasscode ? item + 1 : item}`}
          name={`${name}-${isVerifyPasscode ? item + 1 : item}`}
          rules={[
            {
              required: true,
              message: createFormErrorComp(REQUIRED_ERR("character"))
            }
          ]}
        >
          <Select>
            {OPTIONS.map((letter) => (
              <Select.Option value={letter} key={`${name}-${letter}`}>
                {letter}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      ))}
    </div>
  );
}
PassCodeItemForm.propTypes = {
  name: PropTypes.string,
  isVerifyPasscode: PropTypes.bool,
  requiredPositions: PropTypes.array
};
PassCodeItemForm.defaultProps = {
  name: "",
  isVerifyPasscode: false,
  requiredPositions: []
};

export default PassCodeItemForm;
