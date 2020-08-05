import React, { useState, useEffect } from "react";
import { RebatesForm } from "components/organisms";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import qs from "qs";
import { useLocation, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { RebatesService } from "services";
import { RouteConst } from "commons/consts";
import { REBATES_SCHEMA } from "commons/schemas";

const { FIELDS } = REBATES_SCHEMA;

const EditRebatesPage = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [isEditting, setIsEditting] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { id } = qs.parse(location.search, { ignoreQueryPrefix: true });
  const routeState = location.state ? location.state : null;

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const { brand, toCompanyName, value } = await RebatesService.getRebatesDetails(id);
      const data = {
        [FIELDS.buyerCompanyName]: [toCompanyName],
        [FIELDS.productBrand]: brand,
        [FIELDS.rebatePercentage]: `${value}`
      };
      setData(data);
      setLoading(false);
    });
  }, [id, routeState]);

  const handleEdit = (values) => {
    setIsEditting(true);
    asyncErrorHandlerWrapper(async () => {
      const data = {
        value: values[FIELDS.rebatePercentage]
      };
      await RebatesService.editRebates(id, data);
      routeState ? history.push(routeState.pathname) : history.push(RouteConst.REBATES);
    });
  };

  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10">
      <RebatesForm
        title="EDIT REBATES"
        // isEdit={true}
        data={data}
        id={id}
        onSubmit={handleEdit}
        loading={loading}
        isProcessing={isEditting}
      />
    </div>
  );
};

export default EditRebatesPage;
