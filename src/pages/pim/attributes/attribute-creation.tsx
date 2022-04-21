import Box from "@mui/material/Box";
import { Loader } from "@/components/commons";
import PropertiesForm from "./properties-form";

const AttributesCreation = ({ isLoading }) => {
  if (isLoading)
    return (
      <Box height={200}>
        <Loader />
      </Box>
    );

  return <PropertiesForm />;
};

export default AttributesCreation;
