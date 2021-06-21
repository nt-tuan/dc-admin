import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import styles from "./footer-comp.module.scss";
import { isScreensize } from "utils/general.util";
import { getCompanyName } from "utils/config.util";

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
                <strong>{getCompanyName()}</strong>
              </p>
              <p>&copy; 2019 {getCompanyName()}</p>
            </div>
            <div className="col-md-4 text-right">
              <img
                style={{ maxHeight: "3rem" }}
                src={`${process.env.PUBLIC_URL}/images/${
                  isScreensize("sm") ? "logo.png" : "logo-notext.png"
                }`}
                alt={`${getCompanyName()} logo`}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
