import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import styles from "./footer-comp.module.scss";
import { isScreensize } from "utils/general.util";

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
                <strong>{process.env.REACT_APP_COMPANY_NAME}</strong>
              </p>
              <p>&copy; 2019 {process.env.REACT_APP_COMPANY_NAME}</p>
            </div>
            <div className="col-md-4 text-right">
              <img
                style={{ maxHeight: "3rem" }}
                src={`${process.env.PUBLIC_URL}/images/${
                  isScreensize("sm") ? "logo.png" : "logo-notext.png"
                }`}
                alt={`${process.env.REACT_APP_COMPANY_NAME} logo`}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
