import { renderHook } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";
import { usePhoneField } from "./phone-field.comp";
import * as mockFormik from "formik";

jest.mock("formik");

test("usePhoneField should work", async () => {
  const values = {
    phone: "+84 123",
    country: "VN"
  };
  mockFormik.useField = ({ name }) => {
    return [{ value: values[name] }];
  };
  const setFieldValue = jest.fn();
  mockFormik.useFormikContext = () => ({ setFieldValue });
  const { result } = renderHook(() =>
    usePhoneField({ name: "phone", countryFieldName: "country" })
  );
  expect(result.current.countryCode).toEqual("+84");

  result.current.changeCountryCode("+12");
  waitFor(() => expect(result.current.countryCode).toEqual("+12"));

  result.current.changeLocalNumber({ target: { value: "456" } });
  waitFor(() => expect(result.current.localNumber).toEqual("456"));
});
