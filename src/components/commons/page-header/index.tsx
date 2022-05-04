import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";

interface Props {
  parentPage?: string;
  onBack?: () => void;
  title: React.ReactNode;
}

const BackButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <IconButton sx={{ color: "common.black" }} onClick={onClick}>
      <ArrowBack sx={{ color: (theme) => theme.palette.action.active }} />
    </IconButton>
  );
};
const PageHeader = ({ parentPage, title, onBack }: Props) => (
  <Stack direction="row" alignItems="center">
    {parentPage && (
      <Link to={parentPage}>
        <BackButton />
      </Link>
    )}
    {onBack && <BackButton onClick={onBack} />}
    <Typography component="div" variant="h5">
      {title}
    </Typography>
  </Stack>
);
export default PageHeader;
