import { Divider, List, ListSubheader } from "@mui/material";

import { DTCSection } from "components/commons";
import FeatureItem from "./feature-item.comp";
import React from "react";

export const FeatureToggles = ({ featureFlags }) => {
  if (featureFlags == null) return null;
  return (
    <DTCSection>
      <DTCSection.Content>
        <List
          subheader={
            <React.Fragment>
              <ListSubheader component="div">
                You can control the specific features in your marketplace by providing appropriate
                selection.
              </ListSubheader>
              <Divider />
            </React.Fragment>
          }
        >
          {featureFlags.length > 0 ? (
            featureFlags.map((item, index) => (
              <React.Fragment key={index}>
                <FeatureItem featureFlag={item} />
                {index !== featureFlags.length - 1 && <Divider />}
              </React.Fragment>
            ))
          ) : (
            <div>No Data</div>
          )}
        </List>
      </DTCSection.Content>
    </DTCSection>
  );
};
