import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import { getAssetURL } from "utils/config.util";

export const PublicLayout = React.memo(({ children }) => {
  return (
    <section>
      <Grid justifyContent="stretch" container sx={{ height: "100vh" }} columns={12}>
        <Grid item xs={12} md={6}>
          <Box
            paddingLeft={(theme) => (theme.breakpoints.down("md") ? "15px" : "10%")}
            paddingRight="15px"
            position="relative"
            height="100%"
            display="flex"
            flexDirection="column"
            paddingBottom="rem(135)"
          >
            <Box flexGrow={1}>
              <Box sx={{ marginTop: "3rem" }} display="flex" justifyContent="center">
                <Box
                  component="img"
                  ml={-1}
                  mb={3}
                  maxHeight="7rem"
                  mt={(theme) => (theme.breakpoints.down("md") ? 5 : 1)}
                  src={getAssetURL("/images/logo.png")}
                  alt="logo"
                />
              </Box>
              {children}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundImage: `url(${getAssetURL("/images/login/tradekey.png")})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "right center",
              height: "100%"
            }}
          />
        </Grid>
      </Grid>
    </section>
  );
});
