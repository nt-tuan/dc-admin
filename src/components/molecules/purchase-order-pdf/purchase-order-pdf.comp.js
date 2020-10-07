import { Document, Page, StyleSheet, Text, View, Font, Image } from "@react-pdf/renderer";
import font from "assets/styles/font-pdf/Roboto-Light.ttf";
import React from "react";
import { toCurrency } from "utils/general.util";
import { DATE_FORMAT, PHONE_CREDIT_TYPE_LABELS } from "commons/consts";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

dayjs.extend(utc);

Font.register({
  family: "Roboto",
  src: font,
  fontWeight: "thin"
});

const sanitize_block = (block) => {
  if (typeof block === "string" || typeof block === "number") {
    return <Text>{block}</Text>;
  } else {
    return block;
  }
};

const tstyles = StyleSheet.create({
  table: {
    display: "table",
    width: "auto"
  },
  row: {
    flexDirection: "row"
  },
  cell: {
    padding: "3px"
  }
});

const pageStyles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    padding: "20px",
    fontWeight: "thin",
    fontSize: 11
  }
});

const style = {
  paddingBottom: "30px"
};
const style_function = (rowIndex, colIndex) => {
  return {
    width: "20%",
    borderWidth: 1,
    borderStyle: "solid",
    margin: -0.5,
    fontWeight: rowIndex === 0 ? "normal" : "thin"
  };
};

export const PurchaseOrderPDF = ({ data, isSeller, products }) => {
  const date = dayjs.utc(data.createdDate).format("YYYY-MM-DD", { timezone: data.timezone });
  const sellerBankDetail = data.sellerBankDetail[0] || {};
  const buyerBankDetail = data.buyerBankDetail[0] || {};

  const calculateTotalPrice = (products) => {
    return products.reduce((total, product) => {
      return (total += product.quantity * product.unitPrice);
    }, 0);
  };

  const parseProductDetails = (product, index) => {
    return [
      index + 1,
      product.name,
      product.quantity,
      toCurrency(product.unitPrice),
      toCurrency(product.quantity * product.unitPrice)
    ];
  };

  const renderPOInfo = () => {
    return (
      <View style={{ width: "70%", marginBottom: "25px", marginTop: -50 }}>
        <Text>
          The following number must appear on all related correspondence, shipping papers, and
          invoices:
        </Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={{ fontWeight: "normal" }}>P.O. NUMBER: </Text>
          <Text>{data.purchaseOrderNumber}</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={{ fontWeight: "normal" }}>P.O. DATE: </Text>
          <Text>
            {dayjs(new Date(date)).format(DATE_FORMAT)} ({dayjs(new Date(date)).format("Z")})
          </Text>
        </View>
      </View>
    );
  };

  const renderAddress = (addressLine1, city, postalCode, phone, isSeller) => {
    return (
      <View style={{ fontWeight: "normal" }}>
        <Text>
          {isSeller ? "TO:" : "SHIP TO:"}{" "}
          {isSeller ? data.sellerCompanyName : data.buyerCompanyName}
        </Text>
        <View>
          <Text>{addressLine1}</Text>
          <Text>
            {city}, {postalCode}
          </Text>
          <Text>{phone}</Text>
        </View>
      </View>
    );
  };

  const getDestinationData = () => {
    return [
      ["DESTINATION COUNTRY", "DESTINATION CITY", "ORIGIN COUNTRY", "ORIGIN CITY", "CREDIT TERMS"],
      [
        data.destinationCountry,
        data.destinationCity,
        data.originCountry,
        data.originCity,
        PHONE_CREDIT_TYPE_LABELS[data.credit]
      ]
    ];
  };

  const getProductData = () => {
    const productData = products.map((product, index) => parseProductDetails(product, index));
    return [["SL NO", "PRODUCT DESCRIPTION", "QTY", "UNIT PRICE", "TOTAL"], ...productData];
  };

  const renderBankDetail = (bankDetail) => {
    return (
      <View>
        <Text>Account Holder: {bankDetail.accountHolder}</Text>
        <Text>Account Number: {bankDetail.accountNumber}</Text>
        <Text>Bank Name: {bankDetail.name}</Text>
        <Text>Iban: {bankDetail.iban}</Text>
        <Text>Nationality: {bankDetail.nationality}</Text>
        <Text>Swift Code: {bankDetail.swiftCode}</Text>
      </View>
    );
  };

  const getBankData = () => {
    return [
      ["SALES COMPANY BANK ACCOUNT DETAILS", "PURCHASING COMPANY BANK ACCOUNT DETAILS"],
      [renderBankDetail(sellerBankDetail), renderBankDetail(buyerBankDetail)]
    ];
  };

  const renderTableFooter = (text, value) => {
    return (
      <View style={tstyles.row} wrap={false}>
        <View
          style={{
            ...tstyles.cell,
            borderRightWidth: 0.5,
            width: "80%",
            textAlign: "right",
            paddingRight: 30,
            marginRight: -0.5,
            marginLeft: -3.5,
            fontWeight: "normal"
          }}
        >
          {sanitize_block(text)}
        </View>
        <View style={{ ...tstyles.cell, ...style_function(1), width: "20%" }}>
          {sanitize_block(value)}
        </View>
      </View>
    );
  };

  return (
    <Document>
      <Page style={{ paddingTop: 150, paddingBottom: 100 }}>
        <View fixed style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
          <Image src={`${process.env.PUBLIC_URL}/images/purchase-order/po-header.PNG`}></Image>
        </View>
        <View style={{ ...pageStyles.page }}>
          {renderPOInfo()}
          <View
            wrap={false}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "50%",
              marginBottom: "25px"
            }}
          >
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
          </View>

          <View style={[tstyles.table, style]}>
            {getDestinationData().map((row, row_index) => (
              <View key={row_index} style={tstyles.row} wrap={false}>
                {row.map((cell, col_index) => (
                  <View
                    key={col_index}
                    style={[tstyles.cell, style_function(row_index, col_index)]}
                  >
                    {sanitize_block(cell)}
                  </View>
                ))}
              </View>
            ))}
          </View>

          <View style={[tstyles.table, style]}>
            {getProductData().map((row, row_index) => (
              <View key={row_index} style={tstyles.row} wrap={false}>
                {row.map((cell, col_index) => (
                  <View
                    key={col_index}
                    style={[tstyles.cell, style_function(row_index, col_index)]}
                  >
                    {sanitize_block(cell)}
                  </View>
                ))}
              </View>
            ))}
            {renderTableFooter("SubTotal", toCurrency(0))}
            {renderTableFooter("Total", toCurrency(calculateTotalPrice(products)))}
          </View>

          <View style={[tstyles.table, style]}>
            {getBankData().map((row, row_index) => (
              <View key={row_index} style={tstyles.row} wrap={false}>
                {row.map((cell, col_index) => (
                  <View
                    key={col_index}
                    style={{
                      ...tstyles.cell,
                      ...style_function(row_index, col_index),
                      width: "50%"
                    }}
                  >
                    {sanitize_block(cell)}
                  </View>
                ))}
              </View>
            ))}
          </View>

          <Text style={{ marginBottom: 20, fontWeight: "normal" }}>Terms and Conditions:</Text>

          <View
            style={{
              flexDirection: "row",
              paddingLeft: 0,
              justifyContent: "flex-end"
            }}
          >
            <View
              style={{
                marginRight: 100,
                borderBottomWidth: 0.5,
                paddingBottom: 20,
                width: 100,
                textAlign: "center"
              }}
            >
              <Text>Sales/Purchased by</Text>
              <Text style={{ fontSize: 10, marginTop: 15 }}>
                {isSeller ? data.salesBy : data.purchasesBy}
              </Text>
            </View>
            <View
              style={{
                marginRight: 30,
                borderBottomWidth: 0.5,
                paddingBottom: 20,
                width: 100,
                textAlign: "center"
              }}
            >
              <Text>Approved By</Text>
              <Text style={{ fontSize: 10, marginTop: 15 }}>
                {isSeller ? data.approvedBy : data.purchasesBy}
              </Text>
            </View>
          </View>
        </View>
        <View fixed style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <Image src={`${process.env.PUBLIC_URL}/images/purchase-order/po-footer.PNG`}></Image>
        </View>
      </Page>
    </Document>
  );
};
