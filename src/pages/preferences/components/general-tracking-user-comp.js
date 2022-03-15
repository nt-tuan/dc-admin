import React, { memo } from "react";
import { Box, Checkbox, TextField, Link } from "@mui/material";
import { hotJarLink } from "../constant/general-data";
import FieldInput from "./general-field-input.comp";

const TrackingUserActivityForm = ({
  isTrackViaHotJar,
  handleTrackUserActivity,
  handleChangeHotJarId,
  hotJarId
}) => {
  return (
    <>
      <FieldInput
        marginLeft={-1.5}
        icon={<Checkbox onChange={handleTrackUserActivity} checked={isTrackViaHotJar} />}
        label={
          <>
            Would you like to track user activity through Heatmaps and Recordings via
            <Box component="span" paddingLeft={0.5}>
              <Link href={hotJarLink} target="_blank" style={{ textDecoration: "none" }}>
                Hotjar
              </Link>
            </Box>
            ?
          </>
        }
      />

      {isTrackViaHotJar && (
        <Box marginTop={3} maxWidth={300}>
          <TextField onChange={handleChangeHotJarId} value={hotJarId} label="Hotjar Id" fullWidth />
        </Box>
      )}
    </>
  );
};

export default memo(TrackingUserActivityForm);
