import React, { useEffect, useState } from "react";
import { RebatesForm } from "components/organisms";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { RebatesService } from "services";
import { RouteConst } from "commons/consts";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { REBATES_SCHEMA } from "commons/schemas";

const { FIELDS } = REBATES_SCHEMA;

const CreateRebatesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const history = useHistory();

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const [companies, brands] = await Promise.all([
        RebatesService.getCompanies(),
        RebatesService.getBrands("123456")
      ]);
      setCompanies(companies);
      setBrands(brands.map(({ brand }) => brand));
      setLoading(false);
    });
  }, []);

  const handleCreate = (values) => {
    setIsCreating(true);
    asyncErrorHandlerWrapper(async () => {
      const data = {
        brand: values[FIELDS.productBrand],
        categoryName: "Perfume",
        toCompanyIdList: values[FIELDS.buyerCompanyName],
        value: values[FIELDS.rebatePercentage]
      };
      await RebatesService.createRebates(data);
      history.push(RouteConst.REBATES);
    });
  };

  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10">
      <RebatesForm
        title="CREATE REBATES"
        companies={companies}
        productBrand={brands}
        onSubmit={handleCreate}
        loading={loading}
        isProcessing={isCreating}
      />
    </div>
  );
};

export default CreateRebatesPage;
