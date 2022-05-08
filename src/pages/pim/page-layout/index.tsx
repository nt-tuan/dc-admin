import Box from "@mui/material/Box";
import { Loader } from "@/components/commons";
import Stack from "@mui/material/Stack";
import PageHeader from "@/components/commons/page-header";
import { Helmet } from "react-helmet";

interface Props {
  parentPage?: string;
  title: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  loading?: boolean;
}
const PageContentLayout = ({ parentPage, title, actions, children, loading }: Props) => {
  return (
    <>
      <Helmet title="Product" />
      <Stack spacing={3} height="100%" pb={3}>
        <Stack direction="row" justifyContent="space-between">
          <PageHeader title={title} parentPage={parentPage} />
          {actions}
        </Stack>
        <Box height={0} flexGrow={1}>
          {loading ? <Loader /> : children}
        </Box>
      </Stack>
    </>
  );
};
export default PageContentLayout;
