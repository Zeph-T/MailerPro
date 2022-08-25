import React, { useEffect, useState } from "react";
import { UPLOAD_FILE_POPUP_DATA, CROSS_ICON } from "../../../Utils/staticData";
import styles from "./FileUpload.module.css";
import { useDispatch, useSelector } from "react-redux";
import notify from "../../../Utils/helper/notifyToast";
import { UPDATE_POPUP_STATE } from "../../../Redux/ActionTypes";
import { FileUploader } from "react-drag-drop-files";
import { StyledMUIButton } from "../../General/Helpers";
import { uploadContacts } from "../../../Services/imports.service";

const fileTypes = ["CSV", "XLSX", "XLS"];

const FileUpload = ({}) => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  console.log(file);
  const closePopup = () => {
    dispatch({
      type: UPDATE_POPUP_STATE,
      payload: {
        open: false,
        component: null,
      },
    });
  };

  const handleChange = (file) => {
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      await uploadContacts(userData.accessToken, file);
      notify("Contacts uploaded successfully", "success");
    } else {
      notify("Please select a file", "warning");
    }
  };

  return (
    <form className={styles.Wrapper} onSubmit={handleSubmit}>
      <div className={styles.Header}>
        <p>{UPLOAD_FILE_POPUP_DATA.title}</p>
        <img
          src={CROSS_ICON}
          alt="cross"
          onClick={closePopup}
          style={{
            cursor: "pointer",
          }}
        />
      </div>
      <FileUploader
        multiple={false}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />

      <StyledMUIButton type="submit" color="buttonGreen" fullWidth>
        {UPLOAD_FILE_POPUP_DATA.buttons.upload}
      </StyledMUIButton>
    </form>
  );
};

export default FileUpload;
