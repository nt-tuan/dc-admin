import { Layout } from "antd";
import classNames from "classnames";
import { Footer, MenuLeft, SubBar, TopBar } from "components";
import React from "react";
import { connect } from "react-redux";

const AuthLayout = ({
  children,
  settings: {
    menuLayoutType,
    isContentNoMaxWidth,
    isAppMaxWidth,
    isGrayBackground,
    isSquaredBorders,
    isCardShadow,
    isBorderless,
    isTopbarFixed,
    isGrayTopbar
  }
}) => {
  return (
    <Layout
      className={classNames({
        air__layout__contentNoMaxWidth: isContentNoMaxWidth,
        air__layout__appMaxWidth: isAppMaxWidth,
        air__layout__grayBackground: isGrayBackground,
        air__layout__squaredBorders: isSquaredBorders,
        air__layout__cardsShadow: isCardShadow,
        air__layout__borderless: isBorderless
      })}
    >
      {/* <Sidebar />
        <SupportChat /> */}
      {menuLayoutType === "left" && <MenuLeft />}
      <Layout>
        <Layout.Header
          className={classNames("air__layout__header", {
            air__layout__fixedHeader: isTopbarFixed,
            air__layout__headerGray: isGrayTopbar
          })}
        >
          <TopBar />
        </Layout.Header>
        <Layout.Content style={{ height: "100%", position: "relative" }}>
          <SubBar />
          <section className="pl-3 pr-3 pt-1">{children}</section>
        </Layout.Content>
        <Layout.Footer>
          <Footer />
        </Layout.Footer>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = ({ settings }) => ({ settings });

export default connect(mapStateToProps)(AuthLayout);
