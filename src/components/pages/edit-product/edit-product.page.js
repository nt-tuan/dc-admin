import { ProductMutationTemplate } from "components/templates";
import React, { useEffect, useState } from "react";
import qs from "qs";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { ProductService } from "services";
import { Helmet } from "react-helmet";

const EditProductPage = () => {
  const { uid: productId, requestedProduct: isDisabled } = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const [productDetails, setProductDetails] = useState(undefined);

  const handleMapProductDetails = (productDetails) => {
    if (productDetails === undefined) {
      return {};
    }
    const isManualAdded = productDetails.importImages && productDetails.importImages.length > 0;
    const images = isManualAdded ? productDetails.importImages : productDetails.images;
    const vitalInfoData = {
      brand: productDetails.brand,
      productName: productDetails.name,
      typeId: productDetails.typeId,
      type: productDetails.type,
      salesChannel: productDetails.salesChannel,
      categoryId: productDetails.categoryId,
      category: productDetails.category,
      keyword: productDetails.keyword ? productDetails.keyword.split(",") : []
    };
    const variantData = productDetails.variants.reduce((acc, cur) => {
      acc[cur.name] = cur.value;
      return acc;
    }, {});
    const imagesData = {
      productImageName: images.length
        ? images.map((img) => ({
            name: img.fileName,
            url: img.url,
            uid: img.id,
            status: "done"
          }))
        : []
    };
    return { vitalInfoData, variantData, imagesData };
  };

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const productDetails = await ProductService.getProductDetails(productId);
      setProductDetails(productDetails);
    });
  }, [productId]);

  return (
    <>
      <Helmet title="Edit Product" />
      <ProductMutationTemplate />F
    </>
  );
};

export default EditProductPage;
