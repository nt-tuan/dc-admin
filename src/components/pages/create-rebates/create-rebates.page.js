import React, { useEffect, useState, useRef } from "react";
import { RebatesForm } from "components/organisms";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { RebatesService } from "services";
import { RouteConst } from "commons/consts";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { REBATES_SCHEMA } from "commons/schemas";
import { FormError } from "components/atoms";

const { FIELDS } = REBATES_SCHEMA;

const CreateRebatesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const history = useHistory();
  const rebatesFormRef = useRef();

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
      try {
        const data = {
          brand: values[FIELDS.productBrand],
          categoryName: "Perfume",
          toCompanyIdList: values[FIELDS.buyerCompanyName],
          value: values[FIELDS.rebatePercentage]
        };
        await RebatesService.createRebates(data);
        history.push(RouteConst.REBATES);
      } catch (error) {
        const err = error.errors;
        if (err.length) {
          const companies = err[0][1];
          const brand = err[1][1];
          const msg = `Error in creating the Rebate. There is an existing rebate set for ${companies.join(
            ", "
          )} and ${brand}`;
          rebatesFormRef.current.setFields([
            {
              name: "toCompanyName",
              value: rebatesFormRef.current.getFieldValue("toCompanyName"),
              errors: [<FormError msg={msg} />]
            }
          ]);
          setIsCreating(false);
        } else {
          throw error;
        }
      }
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
        ref={rebatesFormRef}
      />
    </div>
  );
};

export default CreateRebatesPage;
