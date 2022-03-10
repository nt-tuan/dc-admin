import React from "react";
import { Box, Divider as MuiDivider } from "@mui/material";
import { styled } from "@mui/system";
import { getMarketplaceFeatures, updateMarketplaceFeatures } from "@/services/preference.service";
import { useAsyncErrorHandler } from "@/utils/error-handler.util";
import Header from "./components/general-header.comp";
import FeaturesToggleForm from "./components/general-feature-toggle.comp";
import CreateProductForm from "./components/general-create-product.comp";
import TrackingUserActivityForm from "./components/general-tracking-user-comp";

const Divider = styled(MuiDivider)({
  margin: "32px -24px 32px -25px"
});

const PreferencesGeneralPage = () => {
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

  const handleChangeWhoCreateProduct = (event) => {
    const { value } = event.target;
    setWhoCanCreateProduct(value);
  };

  const handleTrackUserActivity = (event) => {
    const { checked } = event.target;
    setIsTrackViaHotJar(checked);
    setFeaturesToggleData((prev) => {
      if (prev.registration && isTrackViaHotJar) {
        return { ...prev, staggeredKYC: true, registration: false };
      }
      return { ...prev, staggeredKYC: false, registration: true };
    });
  };

  const handleChangeHotJarId = (event) => {
    const { value } = event.target;
    setHotJarId(value);
  };

  const handleSave = async () => {
    const payload = {
      staggeredKYC: featuresToggleData.staggeredKYC,
      timeConstraint: featuresToggleData.timeConstraint,
      externalPaymentServices: featuresToggleData.paymentServices,
      registrationSkipEmailVerification: featuresToggleData.registration,
      whoCanCreateProduct,
      isTrackViaHotJar,
      hotJarId
    };
    try {
      setLoading(true);
      await asyncErrorHandlerWrapper(async () => {
        await updateMarketplaceFeatures(payload);
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
      setWhoCanCreateProduct(data?.whoCanCreateProduct);
      setHotJarId(data?.hotJarId);
    });
  }, []);

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

      <Divider />

      <Box marginTop={3}>
        <CreateProductForm handleChange={handleChangeWhoCreateProduct} />
      </Box>

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
