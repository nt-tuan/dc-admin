import React, { useState } from "react";
import { Card, Empty, Button, Dropdown, Tooltip } from "antd";
import { animated, useTransition } from "react-spring";
import { MoreOutlined, LoadingOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

export const ProductCard = React.memo(({ data = {}, renderMenu, disableNavigation = false }) => {
  const { image, name, link } = data;
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(false);
  const transition = useTransition(loading, null, {
    from: { position: "absolute", opacity: 0, zIndex: 2 },
    enter: { opacity: 1, zIndex: 2 },
    leave: { opacity: 0, zIndex: 0 }
  });

  return (
    <Link
      to={link}
      title={name}
      onClick={(e) => disableNavigation && e.preventDefault()}
      hidden={hidden}
    >
      <Card className={`${styles["card"]} dtc-br-10 h-100`}>
        <div className="d-flex flex-column h-100">
          {transition.map(({ item, key, props }) => {
            return (
              item && (
                <animated.div key={key} style={props} className={`${styles["overlay"]} dtc-br-10`}>
                  <div className={styles["loading"]}>
                    <LoadingOutlined />
                  </div>
                </animated.div>
              )
            );
          })}
          <div className={styles["card-image"]}>
            {image ? (
              <img className="img-fluid" src={image} alt={name} />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Image" />
            )}
          </div>
          <div className={`${styles["card-footer"]} pt-3`}>
            <div className={`${styles["card-name"]} text-secondary`}>{name}</div>
            <div className={styles["card-more"]}>
              <Tooltip title="More">
                <Dropdown trigger={["click"]} overlay={renderMenu({ data, setLoading, setHidden })}>
                  <Button shape="circle" type="text" icon={<MoreOutlined />} />
                </Dropdown>
              </Tooltip>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
});
