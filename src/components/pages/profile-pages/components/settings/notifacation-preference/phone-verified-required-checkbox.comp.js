import { MESSAGES, RouteConst, USER_TABS_NAME } from "commons/consts";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectUsers } from "redux/user/user.duck";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import InfoIcon from "@mui/icons-material/Info";
import { Popconfirm } from "components/commons/pop-confirm";

export const PhoneVerifiedRequiredCheckbox = ({ name, value, label, checked, onChange }) => {
  const history = useHistory();
  const user = useSelector(selectUsers);
  const { phoneVerified } = user;
  const confirmPhone = () => {
    history.push({
      pathname: `${RouteConst.PROFILE}/${USER_TABS_NAME.profileInfo}`,
      state: { isVerified: true }
    });
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          disabled={!phoneVerified}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
        />
      }
      label={
        <Stack direction="row" alignItems="center" spacing={1}>
          <span>{label}</span>
          {!phoneVerified && (
            <Popconfirm
              title={MESSAGES.VERIFY_PHONE_TO_USE_THIS_FEATURE}
              onConfirm={confirmPhone}
              okText="Yes"
              cancelText="No"
            >
              <InfoIcon sx={{ color: "grey.600" }} />
            </Popconfirm>
          )}
        </Stack>
      }
    />
  );
};
