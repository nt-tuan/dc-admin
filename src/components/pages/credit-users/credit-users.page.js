import React, { useState, useEffect, useCallback } from "react";
import { DTCTable } from "components/atoms";
import { creditUserSchema } from "commons/schemas";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";
import { UserService, CreditService } from "services";

const CreditUsersPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getListUsers = useCallback(() => {
    asyncErrorHandlerWrapper(async () => {
      const res = await getAllRecordsFromAPI(CreditService.getCreditUser);
      setData(
        res.map((user) => ({
          ...user,
          id: user.companyId,
          status: user.status ? "Enabled" : "Disabled"
        }))
      );
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getListUsers();
  }, [getListUsers]);

  const handleMarketplaceCredit = (id, isEnable) => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      await UserService.manageMarketplaceCredit(id, isEnable);
      getListUsers();
    });
  };

  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10 mt-3">
      <DTCTable
        showSettings={false}
        loading={loading}
        dataSource={data}
        schema={creditUserSchema(handleMarketplaceCredit)}
      />
    </div>
  );
};

export default CreditUsersPage;
