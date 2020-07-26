import { Button } from "antd";
import { DTCSection, ProductCard, SearchBar } from "components/atoms";
import { withListItem } from "HOCs/withListItem";
import React from "react";
import { Helmet } from "react-helmet";

const ListProductCard = withListItem({ xxl: 6, xl: 6, lg: 8, md: 12, sm: 12, xs: 24, gutter: 30 })(
  ProductCard
);

const ProductDatabase = () => {
  return (
    <article>
      <Helmet id="Product database" />
      <DTCSection className="d-flex justify-content-between align-items-center">
        <SearchBar />
        <Button type="primary">Add Product</Button>
      </DTCSection>
      <section>
        <ListProductCard
          renderHoverContent={(data) => {
            return (
              <div className="d-flex justify-content-between align-items-center">
                <Button onClick={(e) => e.preventDefault()} style={{ width: 80 }}>
                  Edit
                </Button>
                <Button onClick={(e) => e.preventDefault()} style={{ width: 80 }}>
                  Delete
                </Button>
              </div>
            );
          }}
          data={[
            {
              image:
                "https://hoanghamobile.com/Uploads/Originals/2019/11/05/201911051610300966_%C4%91een.png;width=820;height=550;watermark=logo;crop=auto;format=jpg",
              name: "IPhone 11",
              link: "",
              id: "1"
            },
            {
              image:
                "https://hoanghamobile.com/Uploads/Originals/2019/11/05/201911051610300966_%C4%91een.png;width=820;height=550;watermark=logo;crop=auto;format=jpg",
              name: "IPhone 11",
              link: "",
              id: "2"
            },
            {
              image:
                "https://hoanghamobile.com/Uploads/Originals/2019/11/05/201911051610300966_%C4%91een.png;width=820;height=550;watermark=logo;crop=auto;format=jpg",
              name: "IPhone 11",
              link: "",
              id: "3"
            },
            {
              image:
                "https://hoanghamobile.com/Uploads/Originals/2019/11/05/201911051610300966_%C4%91een.png;width=820;height=550;watermark=logo;crop=auto;format=jpg",
              name: "IPhone 11",
              link: "",
              id: "4"
            },
            {
              image:
                "https://hoanghamobile.com/Uploads/Originals/2019/11/05/201911051610300966_%C4%91een.png;width=820;height=550;watermark=logo;crop=auto;format=jpg",
              name: "IPhone 11",
              link: "",
              id: "5"
            }
          ]}
        />
      </section>
    </article>
  );
};

export default ProductDatabase;
