import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import { getAssetURL } from "utils/config.util";

export const PublicLayout = React.memo(({ children }) => {
  return (
    <section>
      <Grid justifyContent="stretch" container sx={{ height: "100vh" }} columns={12}>
        <Grid item xs={0} md={5}>
          <Box
            sx={{
              backgroundImage: `url(${getAssetURL("/images/login/login-left.png")})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "right center",
              height: "100%"
            }}
          />
        </Grid>
        <Grid item xs={12} md={7}>
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
              <Box sx={{ marginTop: "3rem" }}>
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
            <Box
              component="img"
              height="100px"
              width="100%"
              src={getAssetURL("/images/login/login-right.png")}
              alt="logo"
            />
          </Box>
        </Grid>
      </Grid>
    </section>
  );
});
