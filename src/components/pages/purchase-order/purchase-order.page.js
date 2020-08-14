import React, { useState, Fragment, useEffect } from "react";
import { toCurrency } from "utils/general.util";
import dayjs from "dayjs";
import { DATE_FORMAT } from "commons/consts";
import styles from "./styles.module.scss";
import utc from "dayjs/plugin/utc";
import { useLocation } from "react-router-dom";
import qs from "qs";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { CreditService } from "services";
import { LoadingIndicator, ExportPDFButton } from "components/atoms";
import { PurchaseOrderPDF } from "components/molecules";

dayjs.extend(utc);

const info = {
  approvedBy: "seller",
  bidDetails: [
    {
      productDescription: "The Woods Collection TIMELESS SANDS - 100 ML EDP",
      quantity: 3,
      total: 36,
      unitPrice: 12
    }
  ],
  productDescription: "ABERCROMBIE & FITCH FIRST INSTINCT (M) EDT 100ML",
  quantity: 111,
  total: 24642,
  unitPrice: 222,
  buyerBankDetail: [],
  buyerCompanyName: "qa_buyer",
  buyerProcess: "PROVIDE_SHIPPING_DETAILS",
  buyerStatus: "IN_PROGRESS",
  combo: false,
  createdDate: "2020-08-11T14:35:48",
  credit: "ESCROW_ON_DELIVERY",
  destinationAddressLine1: "123 Buyer Address",
  destinationCity: "Dubai",
  destinationCountry: "AE",
  destinationPhone: "123456789",
  destinationPostalCode: "00000",
  originAddressLine1: "456 Seller Address",
  originCity: "Riyadh",
  originCountry: "SA",
  originPhone: "123456789",
  originPostalCode: "11564",
  purchaseOrderNumber: "321597156547843",
  purchasesBy: "buyer",
  salesBy: "seller",
  sellerBankDetail: [],
  sellerCompanyName: "qa_seller",
  sellerProcess: "PROVIDE_SHIPPING_DETAILS",
  sellerStatus: "ACTION_REQUIRED",
  sellerTimezone: "Asia/Riyadh",
  timezone: "Asia/Dubai"
};

const PurchaseOrderPage = () => {
  const [data, setData] = useState(info);
  const [loading, setLoading] = useState(true);
  const buyerBankDetail = data.buyerBankDetail ? data.buyerBankDetail[0] : "";
  const sellerBankDetail = data.sellerBankDetail ? data.sellerBankDetail[0] : "";
  const date = dayjs.utc(data.createdDate).format("YYYY-MM-DD", { timezone: data.timezone });
  const location = useLocation();
  const { oid } = qs.parse(location.search, { ignoreQueryPrefix: true });

  const products = data.bidDetails.map((bid) => ({
    name: bid.productDescription,
    quantity: bid.quantity,
    unitPrice: bid.unitPrice
  }));

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const res = await CreditService.getPurchaseOrder(oid);
      setData(res);
      setLoading(false);
    });
  }, [oid]);

  const renderAddress = (addressLine1, city, postalCode, phone, isSeller) => {
    return (
      <div className="col-12 col-sm-6 py-1 py-md-3">
        <div>
          <strong className="text-uppercase">
            {isSeller ? "TO:" : "SHIP TO:"}{" "}
            {isSeller ? data.sellerCompanyName : data.buyerCompanyName}
          </strong>
        </div>
        <Fragment>
          <div>
            <strong>{addressLine1}</strong>
          </div>
          <div>
            <strong>
              {city}, {postalCode}
            </strong>
          </div>
          <div>
            <strong>{phone}</strong>
          </div>
        </Fragment>
      </div>
    );
  };

  const renderBankDetail = (bankDetail) => {
    return (
      <div>
        <div>
          <strong>Account Holder:</strong> {bankDetail.accountHolder}
        </div>
        <div>
          <strong>Account Number:</strong> {bankDetail.accountNumber}
        </div>
        <div>
          <strong>Bank Name:</strong> {bankDetail.name}
        </div>
        <div>
          <strong>Iban:</strong> {bankDetail.iban}
        </div>
        <div>
          <strong>Nationality:</strong> {bankDetail.nationality}
        </div>
        <div>
          <strong>Swift Code:</strong> {bankDetail.swiftCode}
        </div>
      </div>
    );
  };

  const renderProductDetails = (products) => {
    return (
      <Fragment>
        {products.map((product, index) => (
          <tr key={product.name}>
            <td>{index + 1}</td>
            <td>{product.name}</td>
            <td>{product.quantity}</td>
            <td>{toCurrency(product.unitPrice)}</td>
            <td>{toCurrency(product.quantity * product.unitPrice)}</td>
          </tr>
        ))}
      </Fragment>
    );
  };

  const calculateTotalPrice = (products) => {
    return products.reduce((total, product) => {
      return (total += product.quantity * product.unitPrice);
    }, 0);
  };
  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10">
      {loading ? (
        <div className="d-flex justify-content-center">
          <LoadingIndicator />
        </div>
      ) : (
        <Fragment>
          <div className="d-flex justify-content-end">
            <ExportPDFButton
              fileName={`Purchass-order-${data.purchaseOrderNumber}.pdf`}
              docComp={<PurchaseOrderPDF data={data} products={products} />}
            />
          </div>
          <div className="mx-3 mx-md-5 my-3 my-md-5 " style={{}}>
            {/* Header */}
            <div className="row">
              <div className="col-12">
                <img
                  className="w-100 h-100"
                  src={`${process.env.PUBLIC_URL}/images/purchase-order/po-header.PNG`}
                  alt="dtc-po"
                />
              </div>
            </div>
            {/* Body */}
            <section className="px-3 px-md-5 my-3 my-md-5">
              <div>
                <div className="row py-1 py-md-3 text-dark">
                  <div className="pl-3 mb-3">
                    The following number must appear on all related correspondence, shipping papers,
                    and invoices:
                  </div>
                  <div className="col-12 col-sm-6 col-md-5">
                    <div>
                      <strong>P.O. NUMBER: </strong>
                      <span>{data.purchaseOrderNumber}</span>
                    </div>
                    <div>
                      <strong>P.O. DATE: </strong>
                      <span>
                        {dayjs(new Date(date)).format(DATE_FORMAT)} (
                        {dayjs(new Date(date)).format("Z")})
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row text-dark">
                  {renderAddress(
                    data.originAddressLine1,
                    data.originCity,
                    data.originPostalCode,
                    data.originPhone,
                    true
                  )}

                  {renderAddress(
                    data.destinationAddressLine1,
                    data.destinationCity,
                    data.destinationPostalCode,
                    data.destinationPhone,
                    false
                  )}
                </div>
                <div className="row py-1 py-md-3 text-dark">
                  <div className="col-12">
                    <div className="table-responsive" style={{ overflow: "auto" }}>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">DESTINATION COUNTRY</th>
                            <th scope="col"> DESTINATION CITY</th>
                            <th scope="col">ORIGIN COUNTRY</th>
                            <th scope="col">ORGIN CITY</th>
                            <th scope="col">CREDIT TERMS</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <span>{data.destinationCountry}</span>
                            </td>
                            <td>
                              <span>{data.destinationCity}</span>
                            </td>
                            <td>
                              <span>{data.originCountry}</span>
                            </td>
                            <td>
                              <span>{data.originCity}</span>
                            </td>
                            <td>
                              <span>{data.credit}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row py-1 py-md-3 text-dark">
                  <div className="col-12">
                    <div className="table-responsive" style={{ overflow: "auto" }}>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">SL NO</th>
                            <th scope="col-2">PRODUCT DESCRIPTION</th>
                            <th scope="col">QTY</th>
                            <th scope="col">UNIT PRICE</th>
                            <th scope="col">TOTAL</th>
                          </tr>
                        </thead>
                        <tbody>
                          {renderProductDetails(products)}
                          <tr>
                            <td className={styles.borderNone} colSpan="3"></td>
                            <td className={styles.subtotal}>SUBTOTAL</td>
                            <td>{toCurrency(0)}</td>
                          </tr>
                          <tr>
                            <td className={styles.borderNone} colSpan="3"></td>
                            <td className={styles.total}>TOTAL</td>
                            <td>{toCurrency(calculateTotalPrice(products))}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row py-1 py-md-3 text-dark">
                  <div className="col-12">
                    <div className="table-responsive" style={{ overflow: "auto" }}>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">SALES COMPANY BANK ACCOUNT DETAILS</th>
                            <th scope="col">PURCHASING COMPANY BANK ACCOUNT DETAILS</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{sellerBankDetail && renderBankDetail(sellerBankDetail)}</td>
                            <td>{buyerBankDetail && renderBankDetail(buyerBankDetail)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row py-1 py-md-3 text-dark">
                  <div className="col-12">
                    <div>
                      <strong>Terms and Conditions:</strong>
                    </div>
                  </div>
                </div>
                <div className="row my-3 my-md-5 text-dark">
                  <div className="col-6 col-sm-6 col-md-4 offset-md-4 text-center pr-0 pr-sm-3">
                    <div>
                      <strong>Sales/Purchased by</strong>
                    </div>
                    <div className="mt-4 mb-4">{data.salesBy}</div>
                    <hr />
                  </div>
                  <div className="col-6 col-sm-6 col-md-4 text-center pr-0 pr-sm-3">
                    <div>
                      <strong>Approved By</strong>
                    </div>
                    <div className="mt-4 mb-4">{data.approvedBy}</div>
                    <hr />
                  </div>
                </div>
              </div>
            </section>
            {/* Footer */}
            <div className="row">
              <div className="col-12">
                <img
                  className="w-100 h-100"
                  src={`${process.env.PUBLIC_URL}/images/purchase-order/po-footer.PNG`}
                  alt="dtc-po"
                />
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default PurchaseOrderPage;
