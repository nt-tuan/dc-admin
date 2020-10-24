import React, { useEffect, useState, useRef } from "react";
import { RebatesForm } from "components/organisms";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { RebatesService } from "services";
import { RouteConst } from "commons/consts";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { REBATES_SCHEMA } from "commons/schemas";
import { FormError } from "components/atoms";
import { Helmet } from "react-helmet";

const { FIELDS } = REBATES_SCHEMA;

const CreateRebatesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [data, setData] = useState({});
  const history = useHistory();
  const location = useLocation();
  const routeState = location.state ? location.state : null;
  const rebatesFormRef = useRef();

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const [companies, brands] = await Promise.all([
        RebatesService.getCompanies(),
        RebatesService.getBrands("123456")
      ]);
      if (routeState) {
        const initialCompany = companies.find((com) => com.name === routeState.toCompanyName);
        const data = {
          toCompanyName: initialCompany ? [initialCompany.id] : []
        };
        setData(data);
      }
      setCompanies(companies.filter((com) => com.name !== "DHL Company"));
      setBrands(brands.map(({ brand }) => brand));
      setLoading(false);
    });
  }, [routeState]);

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
        routeState
          ? history.push(
              `${RouteConst.USER_DETAILS}?username=${routeState.username}&companyId=${routeState.companyId}`
            )
          : history.push(RouteConst.REBATES);
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
      <Helmet title="Create Rebates" />
      <RebatesForm
        title="CREATE REBATES"
        companies={companies}
        productBrand={brands}
        onSubmit={handleCreate}
        data={data}
        loading={loading}
        isProcessing={isCreating}
        ref={rebatesFormRef}
        routeState={routeState}
      />
    </div>
  );
};

export default CreateRebatesPage;
