import React from "react";
import { Helmet } from "react-helmet";
import { Stepper } from "components/atoms";

const ProductDatabase = () => {
  return (
    <article>
      <Helmet title="Add product" />
      <Stepper title="Product Creation" />
    </article>
  );
};

export default ProductDatabase;
