import { Button, Dropdown, Empty } from "antd";
import { LoadingOutlined, MoreOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { animated, useTransition } from "react-spring";

import Box from "@mui/material/Box";
import { DTCSection } from "components/commons";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

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
      <DTCSection sx={{ height: "100%" }}>
        <DTCSection.Content>
          <Stack>
            {transition.map(({ item, key, props }) => {
              return (
                item && (
                  <animated.div key={key} style={props}>
                    <LoadingOutlined />
                  </animated.div>
                )
              );
            })}
            <div>
              <div>
                {image ? (
                  <img
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    src={image}
                    alt={name}
                  />
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Image" />
                )}
              </div>
            </div>
            <Stack direction="row" justifyContent="space-between" pt={3}>
              <Typography>{name}</Typography>
              <Box>
                <Dropdown
                  getPopupContainer={() => document.getElementsByClassName("lagecy")[0]}
                  trigger={["click"]}
                  overlay={renderMenu({ data, setLoading, setHidden })}
                >
                  <Button shape="circle" size="small" type="text" icon={<MoreOutlined />} />
                </Dropdown>
              </Box>
            </Stack>
          </Stack>
        </DTCSection.Content>
      </DTCSection>
    </Link>
  );
});
