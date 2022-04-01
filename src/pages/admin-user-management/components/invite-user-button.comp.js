import { RouteConst } from "@/commons/consts";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const InviteUserButton = () => {
  return (
    <Link to={RouteConst.ADD_ADMIN_USER}>
      <Button variant="contained">Invite User</Button>
    </Link>
  );
};

export default InviteUserButton;
