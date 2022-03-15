import { getMarketplaceFeatures, updateMarketplaceFeatures } from "@/services/preference.service";
import { useAsyncErrorHandler } from "@/utils/error-handler.util";
import Box from "@mui/material/Box";
import MuiDivider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import React from "react";

import FeaturesToggleForm from "./components/general-feature-toggle.comp";
import Header from "./components/general-header.comp";
// import CreateProductForm from "./components/general-create-product.comp";
import TrackingUserActivityForm from "./components/general-tracking-user-comp";
import { RegexConst } from "@/commons/consts";
import { updateFeatureToggleSuccess, whoCreateProductConst } from "./constant/general-data";
import { useMessage } from "hooks/use-message";

const Divider = styled(MuiDivider)({
  margin: "32px -24px 32px -25px"
});

const PreferencesGeneralPage = () => {
  const message = useMessage();
  const asyncErrorHandlerWrapper = useAsyncErrorHandler();
  const [featuresToggleData, setFeaturesToggleData] = React.useState({
    paymentServices: false,
    registration: false,
    staggeredKYC: true,
    timeConstraint: false
  });
  const [whoCanCreateProduct, setWhoCanCreateProduct] = React.useState("");
  const [isTrackViaHotJar, setIsTrackViaHotJar] = React.useState(false);
  const [hotJarId, setHotJarId] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleChangeFeaturesAndModules = (event) => {
    const { name, checked } = event.target;
    setFeaturesToggleData((prev) => ({ ...prev, [name]: checked }));
  };

  // const handleChangeWhoCreateProduct = (event) => {
  //   const { value } = event.target;
  //   setWhoCanCreateProduct(value);
  // };

  const handleTrackUserActivity = (event) => {
    const { checked } = event.target;
    setIsTrackViaHotJar(checked);
  };

  const handleChangeHotJarId = (event) => {
    const { value } = event.target;
    const convertedValue = value?.trim();
    const isValid = new RegExp(RegexConst.ONLY_NUMBER_REGEX).test(convertedValue);
    setHotJarId(() => (isValid ? convertedValue : ""));
  };

  const handleSave = async () => {
    const payload = {
      staggeredKYC: featuresToggleData.staggeredKYC,
      timeConstraint: featuresToggleData.timeConstraint,
      externalPaymentServices: featuresToggleData.paymentServices,
      registrationSkipEmailVerification: featuresToggleData.registration,
      whoCanCreateProduct,
      hotJarId
    };
    try {
      setLoading(true);
      await asyncErrorHandlerWrapper(async () => {
        await updateMarketplaceFeatures(payload);
        message.success(updateFeatureToggleSuccess);
      });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const data = await getMarketplaceFeatures();
      setFeaturesToggleData({
        paymentServices: data?.externalPaymentServices,
        registration: data?.registrationSkipEmailVerification,
        staggeredKYC: data?.staggeredKYC,
        timeConstraint: data?.timeConstraint
      });
      setWhoCanCreateProduct(whoCreateProductConst.marketplace.value);
      setHotJarId(data?.hotJarId);
    });
  }, [asyncErrorHandlerWrapper]);

  React.useEffect(() => {
    if (hotJarId?.trim()?.length > 0) {
      setIsTrackViaHotJar(true);
    }
  }, [hotJarId]);

  React.useEffect(() => {
    if (!isTrackViaHotJar) {
      setHotJarId("");
    }
  }, [isTrackViaHotJar]);

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Header handleSave={handleSave} loading={loading} />
      </Box>

      <Box marginTop={3}>
        <FeaturesToggleForm
          handleChange={handleChangeFeaturesAndModules}
          data={featuresToggleData}
        />
      </Box>

      {/* <Divider /> */}

      {/* <Box marginTop={3}>
        <CreateProductForm handleChange={handleChangeWhoCreateProduct} value={whoCanCreateProduct} />
      </Box> */}

      <Divider />

      <Box>
        <TrackingUserActivityForm
          handleChangeHotJarId={handleChangeHotJarId}
          handleTrackUserActivity={handleTrackUserActivity}
          isTrackViaHotJar={isTrackViaHotJar}
          hotJarId={hotJarId}
        />
      </Box>
    </>
  );
};

PreferencesGeneralPage.propTypes = {};

export default PreferencesGeneralPage;
