import React from "react";
import PageContentLayout from "../page-layout";
import Button from "@mui/lab/LoadingButton";
import { BrickFormTabsContext } from "@/entities/product/ui/brick-form-tabs";

const Layout = ({
  children,
  loading,
  isSaving,
  title
}: React.PropsWithChildren<{ loading?: boolean; isSaving: boolean; title: string }>) => {
  const { triggerSubmit } = React.useContext(BrickFormTabsContext);
  return (
    <PageContentLayout
      title={title}
      loading={loading}
      actions={
        <Button loading={isSaving} onClick={triggerSubmit} variant="contained">
          Save
        </Button>
      }
    >
      {children}
    </PageContentLayout>
  );
};
export default Layout;
