import React, { memo } from "react";
import { Card, Avatar } from "antd";
import PropTypes from "prop-types";
//** Components */

//** Utils */
import { toCurrency } from "utils";
import "./styles/userProfileCard.scss";

const ProfileCard = memo((props) => {
  const { title, avatarSrc, successfulTransactions, largestTransactionValue, company } = props;

  return (
    <>
      <Card
        title={<h4 className="font-size-24 text-uppercase text-light">{title}</h4>}
        className="air__utils__shadow header-card"
      >
        {/* Avatar section */}
        <div className="text-center">
          <Avatar size={150} icon={avatarSrc || <i className="fe fe-user" />} />
        </div>

        {/* Transaction sections */}
        <div className="d-flex justify-content-around">
          <span className="text-center">
            <h4>{successfulTransactions}</h4>
            <span className="text-dark text-center">
              <b>Successful Transactions</b>
            </span>
          </span>
          <span className="text-center">
            <h4>{toCurrency(largestTransactionValue)}</h4>
            <span className="text-dark">
              <b>Largest Transaction Value</b>
            </span>
          </span>
        </div>
      </Card>
    </>
  );
});

ProfileCard.propTypes = {
  title: PropTypes.string,
  avatarSrc: PropTypes.string,
  successfulTransactions: PropTypes.number,
  largestTransactionValue: PropTypes.number,
  company: PropTypes.string
};

ProfileCard.defaultProps = {
  title: null, // define title
  avatarSrc: null,
  successfulTransactions: 0,
  largestTransactionValue: 0,
  company: null
};

export default ProfileCard;
