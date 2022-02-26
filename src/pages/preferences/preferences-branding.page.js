import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import UploadImage from "./components/upload-image.comp";
import { asyncErrorHandlerWrapper } from "@/utils/error-handler.util";
import { getOrganization, updateOrganization } from "@/services/preference.service";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMessage } from "@/hooks/use-message";
import MuiTextField from "@mui/material/TextField";
import { SETTINGS_MESSAGE } from "@/commons/consts";
import { useDispatch } from "react-redux";
import * as CONFIGS_DUCK from "@/redux/configs/configs.duck";
const ImageUploadList = [
  {
    label: "Marketplace Logo",
    required: true,
    type: "LOGO",
    shortName: "logo",
    messageField: "Logo",
    description:
      "The main logo is required as it appears on all pages of your marketplace and email notifications. ",
    note: "(Recommended logo dimensions is 280x100 px in PNG, transparent background)"
  },
  {
    label: "Marketplace Landing Page Image",
    required: true,
    type: "MARKETPLACE_LANDING_PAGE_IMAGE",
    shortName: "image",
    messageField: "Landing Page Image",
    description:
      "First impressions count, choose a landing page image that reflects your Marketplace. You may choose to upload any image created by your design team.",
    note: "(Recommended dimensions is 720x900 px)"
  },
  {
    label: "Marketplace Favicon",
    required: true,
    type: "FAVICON",
    shortName: "favicon",
    messageField: "Favicon",
    description:
      "The favicon is the icon image that will appear in the address bar of web browsers. Favicons are always square in shape.",
    note:
      "Recommended dimension 16 x 16px. Accepted formats: .ico, .png, .jpeg,). Your picture should be in a square ratio for optimal results."
  }
];

function FormHeader({ loading, formik }) {
  const name = "marketplaceName";

  return (
    <Box display={"flex"} justifyContent={"space-between"}>
      <Box>
        <Typography variant="h3" fontWeight={"bold"} style={{ marginBottom: 20 }}>
          Branding
        </Typography>
        <MuiTextField
          label={"Marketplace Name"}
          disabled={loading}
          style={{ minWidth: 350 }}
          placeholder={"Marketplace Name *"}
          value={formik.values[name]}
          name={name}
          onChange={formik.handleChange}
          error={formik.touched[name] && !!formik.errors[name]}
          helperText={formik.touched[name] && formik.errors[name]}
        />
      </Box>
      <LoadingButton
        disabled={loading}
        loading={loading}
        type={"submit"}
        variant="contained"
        style={{ height: 42 }}
      >
        Save
      </LoadingButton>
    </Box>
  );
}
function FormBody() {
  return (
    <Box>
      {ImageUploadList.map((u, index) => (
        <UploadImage key={index} {...u} />
      ))}
    </Box>
  );
}
function PreferencesBrandingPage() {
  const [organization, setOrganization] = useState();
  const [loading, setLoading] = useState(false);
  const message = useMessage();
  const dispatch = useDispatch();

  const initialValues = {
    marketplaceName: ""
  };
  const validationSchema = yup.object({
    marketplaceName: yup
      .string("Marketplace Name is required")
      .max(30, "30 max characters")
      .required("Marketplace Name is required")
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const res = await getOrganization();
      setOrganization(res);
      if (res && res.marketplaceName) {
        await formik.setFieldValue("marketplaceName", res.marketplaceName || "");
      }
    });
  }, []);

  async function onSubmit() {
    const body = {
      ...formik.values,
      organizationName: organization?.organizationName || ""
    };
    asyncErrorHandlerWrapper(async () => {
      setLoading(true);
      try {
        await updateOrganization(body);
        message.success(SETTINGS_MESSAGE.updateSuccess("branding"));
        dispatch({ type: CONFIGS_DUCK.LOAD_MARKETPLACE_NAME });
      } catch (e) {
        message.error(SETTINGS_MESSAGE.updateFail("branding"));
      } finally {
        setLoading(false);
      }
    });
  }
  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <FormHeader loading={loading} formik={formik} />
        <FormBody />
      </form>
    </Box>
  );
}

PreferencesBrandingPage.propTypes = {};

export default PreferencesBrandingPage;
