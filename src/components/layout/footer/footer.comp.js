import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import styles from "./footer-comp.module.scss";
import logoImg from "../../../assets/images/logo.png";

const mapStateToProps = ({ settings }) => ({ settings });

@connect(mapStateToProps)
class Footer extends React.Component {
  render() {
    const {
      settings: { isContentNoMaxWidth }
    } = this.props;
    return (
      <div
        className={classNames(styles.footer, {
          [styles.footerFullWidth]: isContentNoMaxWidth
        })}
      >
        <div className={styles.inner}>
          <div className="d-flex align-items-center">
            <div className="col-md-8">
              <p className="mb-0">
                <strong>Distichain</strong>
              </p>
              <p>&copy; 2019 Distichain</p>
            </div>
            <div className="col-md-4 text-right">
              <img style={{ maxHeight: "3rem" }} src={logoImg} alt="Air UI" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
