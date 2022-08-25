import React, { useEffect, useState } from "react";
import { MANAGE_TAGS_POPUP_DATA, CROSS_ICON } from "../../../Utils/staticData";
import { StyledMUIButton } from "../../General/Helpers";
import TagList from "./TagList";
import styles from "./ManageTags.module.css";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_POPUP_STATE } from "../../../Redux/ActionTypes";

const ManageTags = () => {
  const tags = useSelector((state) => state.user.userData.tags);
  const dispatch = useDispatch();

  const [tagsLocale, setTagsLocale] = useState(tags);
  useEffect(() => {
    setTagsLocale(JSON.parse(JSON.stringify(tags)));
  }, [tags]);

  const closePopup = () => {
    dispatch({
      type: UPDATE_POPUP_STATE,
      payload: {
        open: false,
        component: null,
      },
    });
  };

  const handleDelete = (tagIndex) => {
    setTagsLocale((prevState) => {
      return prevState.filter((tag, index) => index !== tagIndex);
    });
  };
  const handleChange = (e, tabIndex) => {
    setTagsLocale((prevState) => {
      prevState[tabIndex].name = e.target.value;
      return [...prevState];
    }),
      [tabIndex];
  };

  const handleSave = async () => {
    const changedTags = tagsLocale.filter(
      (tag, index) => tag._id && tag.name !== tags[index]?.name
    );
    const newTags = tagsLocale.filter((tag) => tag._id === undefined);
    console.log(changedTags, newTags);
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Header}>
        <p>{MANAGE_TAGS_POPUP_DATA.title}</p>
        <img
          src={CROSS_ICON}
          alt="cross"
          onClick={closePopup}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className={styles.TagsWrapper}>
        {tagsLocale.map((tag, index) => (
          <TagList
            key={tag.id}
            tag={tag}
            tagIndex={index}
            handleDelete={handleDelete}
            handleChange={handleChange}
          />
        ))}
      </div>
      <StyledMUIButton
        color="buttonBlack"
        fullWidth
        style={{
          fontWeight: "400",
          padding: "1rem 2.5rem",
        }}
        onClick={() => {
          setTagsLocale((prevState) => {
            return [...prevState, { name: "" }];
          }),
            [tagsLocale];
        }}
      >
        {MANAGE_TAGS_POPUP_DATA.buttons[0]}
      </StyledMUIButton>
      <div className={styles.LowerButtonWrapper}>
        <StyledMUIButton
          color="buttonGreen"
          fullWidth
          style={{
            fontWeight: "400",
            padding: "1rem 2.5rem",
          }}
          onClick={handleSave}
        >
          {MANAGE_TAGS_POPUP_DATA.buttons[1]}
        </StyledMUIButton>
        <StyledMUIButton
          color="buttonRed"
          fullWidth
          style={{
            fontWeight: "400",
            padding: "1rem 2.5rem",
          }}
          onClick={() => {
            setTagsLocale(tags);
          }}
        >
          {MANAGE_TAGS_POPUP_DATA.buttons[2]}
        </StyledMUIButton>
      </div>
    </div>
  );
};

export default ManageTags;
