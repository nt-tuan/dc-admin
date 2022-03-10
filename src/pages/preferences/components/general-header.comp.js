import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";
import { memo } from "react";

const Header = ({ handleSave, loading }) => {
  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        General
      </Typography>
      <LoadingButton type="submit" onClick={handleSave} loading={loading} variant="contained">
        Save
      </LoadingButton>
    </>
  );
};

export default memo(Header);
