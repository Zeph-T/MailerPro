import React from "react";
import { useSelector } from "react-redux";
import styles from "./UnsubscribePage.module.css";
import StyledMUIButton from "./../../Components/General/Helpers/StyledMUIButton";
import { unsubscribeForm } from "../../Services/contact.service";
import { useParams } from "react-router-dom";

const UnsubscribePage = () => {
  const userData = useSelector((state) => state.user?.userData);
  const [headerLine, setHeaderLine] = React.useState(
    userData?.unSubscriptionForm
  );
  const params = useParams();

  const handleClick = async () => {
    try {
      await unsubscribeForm(params.contactId);
      setHeaderLine("Hope we will se you again");
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.UnsubscribeText}>{headerLine}</div>
      {headerLine === userData?.unSubscriptionForm && (
        <StyledMUIButton onClick={handleClick}>Unsubscribe</StyledMUIButton>
      )}
    </div>
  );
};

export default UnsubscribePage;
