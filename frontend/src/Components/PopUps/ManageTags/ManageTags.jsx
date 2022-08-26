import React, { useEffect, useState } from "react";
import { MANAGE_TAGS_POPUP_DATA, CROSS_ICON } from "../../../Utils/staticData";
import { StyledMUIButton } from "../../General/Helpers";
import TagList from "./TagList";
import styles from "./ManageTags.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  UPDATE_POPUP_STATE,
  UPDATE_USER_DATA,
} from "../../../Redux/ActionTypes";
import {
  updateTag,
  createTag,
  removeTag,
  getAllTags,
} from "../../../Services/tags.service";
import notify from "../../../Utils/helper/notifyToast";

const ManageTags = () => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);

  const [tagsLocale, setTagsLocale] = useState(userData.tags);
  useEffect(() => {
    setTagsLocale(JSON.parse(JSON.stringify(userData.tags)));
  }, [userData.tags]);

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
    setIsProcessing(true);
    const changedTags = tagsLocale.filter(
      (tag, index) => tag._id && tag.name !== userData.tags[index]?.name
    );
    const newTags = tagsLocale.filter((tag) => tag._id === undefined);
    const deleteTags = userData.tags.filter(
      (tag, index) => tagsLocale.findIndex((t) => t._id === tag._id) === -1
    );

    const changeMap = changedTags.map(async (tag) => {
      try {
        await updateTag(userData.accessToken, tag);
      } catch (err) {
        notify("Error in updating tag" + tag.name, "error");
      }
    });

    const createMap = newTags.map(async (tag) => {
      try {
        await createTag(userData.accessToken, tag);
      } catch (err) {
        notify("Error in adding tag" + tag.name, "error");
      }
    });

    const deleteMap = deleteTags.map(async (tag) => {
      try {
        await removeTag(userData.accessToken, tag._id);
      } catch (err) {
        notify("Error in deleting tag" + tag.name, "error");
      }
    });

    await Promise.all([...changeMap, ...createMap, ...deleteMap]);
    notify("Tags updated successfully", "success");
    try {
      const resp = await getAllTags(userData.accessToken);
      dispatch({
        type: UPDATE_USER_DATA,
        data: {
          ...userData,
          tags: resp.data.tags,
        },
      });
    } catch (err) {
      console.log(err);
      notify("Error in updating tags", "error");
    }
    setIsProcessing(false);
    closePopup();
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
        disabled={isProcessing}
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
          disabled={isProcessing}
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
            setTagsLocale(userData.tags);
          }}
          disabled={isProcessing}
        >
          {MANAGE_TAGS_POPUP_DATA.buttons[2]}
        </StyledMUIButton>
      </div>
    </div>
  );
};

export default ManageTags;
