import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowBack from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";

interface Props {
  parentPage?: string;
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}
const PageContentLayout = ({ parentPage, title, actions, children }: Props) => {
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
        {children}
      </Box>
    </Stack>
  );
};
export default PageContentLayout;
