import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as CONFIGS_DUCK from "@/redux/configs/configs.duck";
import { selectBrandingAssetsData } from "@/redux/configs/configs.duck";

const Content = ({ logo, children }) => {
  return (
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
            src={logo}
            alt="logo"
          />
        </Box>
        {children}
      </Box>
    </Box>
  );
};
export const PublicLayout = React.memo(({ children }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: CONFIGS_DUCK.LOAD_ASSETS });
    dispatch({ type: CONFIGS_DUCK.LOAD_MARKETPLACE_NAME });
  }, [dispatch]);

  const brandingAssets = useSelector(selectBrandingAssetsData);

  return (
    <section>
      <Grid justifyContent="stretch" container sx={{ height: "100vh" }} columns={12}>
        <Grid item xs={12} md={6}>
          <Content logo={brandingAssets.logo}>{children}</Content>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundImage: `url(${brandingAssets.landing})`,
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
