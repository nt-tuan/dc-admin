import ArrowBack from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { Loader } from "@/components/commons";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface Props {
  parentPage?: string;
  title: string | React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  loading?: boolean;
}
const PageContentLayout = ({ parentPage, title, actions, children, loading }: Props) => {
  return (
    <Stack spacing={4} height="100%">
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center">
          {parentPage && (
            <Link to={parentPage}>
              <IconButton>
                <ArrowBack />
              </IconButton>
            </Link>
          )}
          <Typography variant="h5">{title}</Typography>
        </Stack>
        {actions}
      </Stack>
      <Box height={0} flexGrow={1}>
        {loading ? <Loader /> : children}
      </Box>
    </Stack>
  );
};
export default PageContentLayout;
