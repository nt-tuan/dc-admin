import React, { useState } from "react";
import { animated, useTransition } from "react-spring";
import { Card, Empty } from "antd";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

export const ProductCard = React.memo(
  ({ data = {}, renderHoverContent, disableNavigation = false }) => {
    const { image, name, link, numberOfSales, combo } = data;
    const [showDetails, setShowDetails] = useState(false);
    const transition = useTransition(showDetails, null, {
      from: { position: "absolute", opacity: 0, zIndex: 2 },
      enter: { opacity: 1, zIndex: 2 },
      leave: { opacity: 0, zIndex: 0 }
    });

    const handleMouseMove = () => {
      renderHoverContent && setShowDetails(true);
    };
    const handleMouseLeave = () => {
      renderHoverContent && setShowDetails(false);
    };

    return (
      <Link to={link} title={name} onClick={(e) => disableNavigation && e.preventDefault()}>
        <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <Card hoverable className="mb-3 dtc-br-10 overflow-hidden">
            {renderHoverContent &&
              transition.map(({ item, key, props }) => {
                return (
                  item && (
                    <animated.div key={key} style={props} className={styles["product-details"]}>
                      <div className={styles["product-details-content"]}>
                        {renderHoverContent(data)}
                      </div>
                      <div className={styles["product-details-background"]}></div>
                    </animated.div>
                  )
                );
              })}
            <div className={`${showDetails ? styles["background-blur"] : ""}`}>
              <div
                hidden={combo === false || combo === undefined || showDetails}
                title="A seller is selling this product as a combo"
                className={styles["combo"]}
              >
                Combo
              </div>
              <div>
                <div className={`${styles["image"]} height-250 pb-4`}>
                  {image ? (
                    <img className="img-fluid mb-3" src={image} alt={name} />
                  ) : (
                    <Empty
                      className="w-100"
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description="No Image"
                    />
                  )}
                </div>
                <div className="mb-2 font-weight-bold text-center text-primary text-nowrap text-truncate">
                  {name}
                </div>
                {numberOfSales !== undefined ? (
                  <div className="text-center font-weight-bold">
                    Being Sold by {numberOfSales} {numberOfSales > 1 ? "users" : "user"}
                  </div>
                ) : null}
              </div>
            </div>
          </Card>
        </div>
      </Link>
    );
  }
);
