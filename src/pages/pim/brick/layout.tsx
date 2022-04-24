import React from "react";
import PageContentLayout from "../page-layout";
import Button from "@mui/lab/LoadingButton";
import { BrickFormTabsContext } from "@/entities/product/ui/brick-form-tabs";
import { pimRoutePaths } from "@/commons/consts/system/routes/pim-route-paths.const";
import { WarningAmber } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useFormikContext } from "formik";

const Layout = ({
  children,
  loading,
  isSaving,
  title
}: React.PropsWithChildren<{ loading?: boolean; isSaving: boolean; title: string }>) => {
  const { triggerSubmit, hasAttributesChanged } = React.useContext(BrickFormTabsContext);
  const context = useFormikContext();
  return (
    <>
      <PageContentLayout
        title={title}
        loading={loading}
        parentPage={pimRoutePaths.PRODUCT_BRICK}
        actions={
          <Stack alignItems="flex-end">
            {(context?.dirty || hasAttributesChanged()) && (
              <Stack direction="row" justifyContent="flex-end">
                <WarningAmber color="warning" />
                <Typography sx={{ color: "warning.main" }} variant="caption">
                  There are unsaved changes
                </Typography>
              </Stack>
            )}
            <Button loading={isSaving} onClick={triggerSubmit} variant="contained">
              Save
            </Button>
          </Stack>
        }
      >
        {children}
      </PageContentLayout>
    </>
  );
};
export default Layout;
