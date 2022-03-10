import React, { memo } from "react";
import { Typography, Box, RadioGroup, Radio, FormControl } from "@mui/material";
import { whoCreateProductConst } from "../constant/general-data";
import FieldInput from "./general-field-input.comp";

const CreateProductForm = ({ handleChange }) => {
  return (
    <>
      <Box paddingBottom={3}>
        <Typography>Who can create products on your Marketplace? </Typography>
      </Box>
      <Box marginLeft={-1}>
        <FormControl>
          <RadioGroup
            onChange={handleChange}
            defaultValue={whoCreateProductConst.marketplace.value}
          >
            <FieldInput
              icon={
                <Radio
                  name={whoCreateProductConst.marketplace.name}
                  value={whoCreateProductConst.marketplace.value}
                />
              }
              label={whoCreateProductConst.marketplace.label}
            />
            <FieldInput
              icon={
                <Radio
                  value={whoCreateProductConst.seller.value}
                  name={whoCreateProductConst.seller.name}
                />
              }
              label={whoCreateProductConst.seller.label}
            />
            <FieldInput
              icon={
                <Radio
                  value={whoCreateProductConst.both.value}
                  name={whoCreateProductConst.both.name}
                />
              }
              label={whoCreateProductConst.both.label}
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </>
  );
};

export default memo(CreateProductForm);
