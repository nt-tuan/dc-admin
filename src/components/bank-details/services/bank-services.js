import { backendAPI } from "utils/httpAPI.util";
import { getAccessToken } from "utils";
import { ApiPathConsts } from "commons/consts";

export const getCompanyInfo = () => {
  return backendAPI.get(ApiPathConsts.GET_COMPANY_ME);
};

export const updateCompanyInfo = async (values) => {
  const accessToken = await getAccessToken();
  await backendAPI.put(accessToken)(ApiPathConsts.COMPANY_INFO, values);
};

export const uploadCompanyLogo = async (imgFile) => {
  const accessToken = await getAccessToken();
  const formData = new FormData();
  formData.append("file", imgFile);
  await backendAPI.postFile(accessToken)(ApiPathConsts.COMPANY_LOGO, formData);
};

/*
 * COMPANY ADDRESSES
 */

export const getCompanyAddresses = async () => {
  const accessToken = await getAccessToken();
  const addresses = await backendAPI.get(accessToken)(ApiPathConsts.COMPANY_ADDRESSES);
  return addresses;
};

export const createCompanyAddresses = async (values) => {
  const accessToken = await getAccessToken();
  await backendAPI.post(accessToken)(ApiPathConsts.COMPANY_ADDRESSES, values);
};

export const updateCompanyAddresses = async (id, values) => {
  const accessToken = await getAccessToken();
  await backendAPI.put(accessToken)(`${ApiPathConsts.COMPANY_ADDRESSES}/${id}`, values);
};

export const deleteCompanyAddresses = async (id) => {
  const accessToken = await getAccessToken();
  await backendAPI.delete(accessToken)(`${ApiPathConsts.COMPANY_ADDRESSES}/${id}`);
};

export const getCompanyMe = async () => {
  const res = await backendAPI.get(`${ApiPathConsts.GET_COMPANY_ME}`);
  return res;
};

/*
 * BANK DETAILS
 */

export const getBankDetails = async () => {
  const result = await backendAPI.get(ApiPathConsts.BANK_DETAILS);
  return result;
};

export const createBankDetails = async (values) => {
  await backendAPI.post(`${ApiPathConsts.BANK_DETAILS}/many`, values);
  const result = await getBankDetails();
  return result[0];
};

export const updateBankDetails = async (id, values) => {
  await backendAPI.put(`${ApiPathConsts.BANK_DETAILS}/${id}`, values);
};

export const deleteBankDetails = async (id) => {
  await backendAPI.delete(`${ApiPathConsts.BANK_DETAILS}/${id}`);
};

export const submitBankDetails = async (data) => {
  await backendAPI.post(`${ApiPathConsts.BANK_DETAILS}/submit`, data);
};

/*
 * DOCUMENTS
 */

export const getDocuments = async () => {
  const accessToken = await getAccessToken();
  const result = await backendAPI.get(accessToken)(ApiPathConsts.DOCUMENTS);
  return result;
};

export const uploadDocuments = async (fileList) => {
  const accessToken = await getAccessToken();
  const uploadPromises = fileList.map(({ file, type, url }) => {
    if (typeof file === "string") {
      return null;
    }
    const formData = new FormData();
    formData.append("file", file);
    const promise = backendAPI.postFile(accessToken)(
      `${url ? url : ApiPathConsts.DOCUMENTS}`,
      formData,
      {
        type
      }
    );
    return promise;
  });
  const result = await Promise.all(uploadPromises);
  return result;
};

export const deleteDocuments = async (id) => {
  const accessToken = await getAccessToken();
  await backendAPI.delete(accessToken)(`${ApiPathConsts.DOCUMENTS}/${id}`);
};

export const getAuditLogs = async (params) => {
  const { page, size } = params;
  const accessToken = await getAccessToken();
  const result = await backendAPI.get(accessToken)(`${ApiPathConsts.GET_AUDIT_LOGS}`, {
    page,
    size
  });
  return result;
};

export const sendEmailConfirmBank = async () => {
  const accessToken = await getAccessToken();
  await backendAPI.get(accessToken)(ApiPathConsts.COMPANY_SEND_VERIFICATION_CODE);
};

export const verifyBankConfirmCode = async (code) => {
  const accessToken = await getAccessToken();
  await backendAPI.post(accessToken)(
    `${ApiPathConsts.COMPANY_SEND_VERIFICATION_CODE}?code=${code}`
  );
};
