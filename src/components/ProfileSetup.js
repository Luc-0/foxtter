import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../redux/actions';

import { validateName, isEqualString } from '../helpers/validation';
import { uploadImage } from '../helpers/storage';

import ProfilePicture from './ProfilePicture';
import {
  BackgroundImage,
  FlexContainer,
  Container,
  Button,
  Text,
  Input,
  Textarea,
} from './StyledComponents';

function ProfileSetup({ currentUser, close, ...props }) {
  const [background, setBackground] = useState();
  const [backgroundImageFile, setBackgroundImageFile] = useState();
  const [picture, setPicture] = useState();
  const [pictureImageFile, setPictureImageFile] = useState();
  const [isHandlingSave, setIsHandlingSave] = useState();
  const [inputs, setInputs] = useState({
    name: {
      name: 'name',
      value: '',
      border: false,
      incorrect: true,
    },
    description: {
      name: 'description',
      value: '',
    },
  });
  const fileInputPicture = useRef(null);
  const fileInputBackground = useRef(null);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.name) {
        updateInput(inputs.name.name, currentUser.name);
      }

      if (currentUser.description) {
        updateInput(inputs.description.name, currentUser.description);
      }
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      setIsHandlingSave(false);
    }
  }, [currentUser]);

  return (
    <FlexContainer className="profile-setup-container" column>
      <FlexContainer>
        <FlexContainer wt="100%">
          <Text weight="500" size="1.3em">
            Set up Profile
          </Text>
        </FlexContainer>

        <Container onClick={close} wt="auto" className="pointer" mg="0 10px">
          X
        </Container>
      </FlexContainer>
      <Container mg="10px 0" wt="100%" ht="200px">
        <BackgroundImage
          className="profile-background"
          alt="header-image"
          src={
            background
              ? background
              : currentUser.backgroundUrl ||
                '/images/foxtter-landing-page-background.jfif'
          }
        >
          <Container className="profile-page-picture-container">
            <ProfilePicture
              imgUrl={picture ? picture : currentUser.pictureUrl}
              width="135px"
              height="135px"
              border={true}
            />
          </Container>
        </BackgroundImage>
      </Container>

      <FlexContainer mg="10px 0" jc="flex-end">
        <Button wt="auto" onClick={handleOpenPictureFileWindow}>
          Change picture
        </Button>
        <Input
          className="hide"
          type="file"
          ref={fileInputPicture}
          onChange={handlePictureSelect}
        />

        <Button mg="0 5px" wt="auto" onClick={handleOpenBackgroundFileWindow}>
          Change background
        </Button>
        <Input
          className="hide"
          type="file"
          ref={fileInputBackground}
          onChange={handleBackgroundSelect}
        />
      </FlexContainer>

      <FlexContainer mg="10px 0" column>
        <Container>
          <Text
            as="label"
            htmlFor="profile-setup-name"
            size="1.1em"
            weight="500"
            mg="5px 0"
          >
            Name
          </Text>
          <Input
            id="profile-setup-name"
            value={inputs.name.value}
            onChange={handleInputChange}
            name={inputs.name.name}
            border={inputs.name.border}
            incorrect={inputs.name.incorrect}
          />
        </Container>

        <Container mg="10px">
          <Text
            as="label"
            htmlFor="profile-setup-description"
            size="1.1em"
            weight="500"
            mg="5px 0"
          >
            Description
          </Text>
          <Textarea
            id="profile-setup-description"
            className="profile-setup"
            value={inputs.description.value}
            onChange={handleInputChange}
            name={inputs.description.name}
          />
        </Container>
      </FlexContainer>

      <FlexContainer jc="flex-end">
        <Button onClick={handleSave} wt="auto" mg="0 10px" primary>
          {isHandlingSave ? 'Saving...' : 'Save'}
        </Button>
      </FlexContainer>
    </FlexContainer>
  );

  async function handleSave() {
    try {
      if (isHandlingSave || !currentUser) {
        return;
      }
      setIsHandlingSave(true);

      const currentName = currentUser.name;
      const currentDescription = currentUser.description || '';
      const inputNameValue = inputs.name.value;
      const inputDescriptionValue = inputs.description.value;

      if (!validateName(inputNameValue)) {
        showInputBorder(inputs.name.name);
        return;
      }

      const userUpdate = {};

      if (
        !isEqualString(currentName, inputNameValue) &&
        validateName(inputNameValue)
      ) {
        userUpdate.name = inputNameValue;
      }
      if (!isEqualString(currentDescription, inputDescriptionValue)) {
        userUpdate.description = inputDescriptionValue;
      }

      if (pictureImageFile) {
        await uploadImage(currentUser.id, pictureImageFile)
          .then((pictureUploadUrl) => {
            userUpdate.pictureUrl = pictureUploadUrl;
          })
          .catch((reject) =>
            console.log('Error uploading picture image', reject)
          );
      }
      if (backgroundImageFile) {
        await uploadImage(currentUser.id, backgroundImageFile)
          .then((backgroundUploadUrl) => {
            userUpdate.backgroundUrl = backgroundUploadUrl;
          })
          .catch((reject) =>
            console.log('Error uploading background image', reject)
          );
      }

      // does not have any update;
      if (Object.keys(userUpdate).length === 0) {
        setIsHandlingSave(false);
        return;
      }

      props.updateUser(currentUser.id, userUpdate);
    } catch (error) {
      console.log('saving profile changes error', error);
      return;
    }
  }

  function handleInputChange(e) {
    const value = e.target.value;
    const inputName = e.target.name;
    updateInput(inputName, value);
  }

  function updateInput(name, value) {
    setInputs((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value: value,
        border: false,
      },
    }));
  }

  function showInputBorder(inputName) {
    setInputs((prevState) => ({
      ...prevState,
      [inputName]: {
        ...prevState[inputName],
        border: true,
      },
    }));
  }

  function handleOpenPictureFileWindow() {
    fileInputPicture.current.click();
  }

  function handleOpenBackgroundFileWindow() {
    fileInputBackground.current.click();
  }

  function handlePictureSelect(e) {
    const target = e.target;
    const file = target.files[0];

    if (!isValidFileSize(file.size, 5048) || !isImageFile(file)) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imgUrl = e.target.result;
      setPicture(imgUrl);
      setPictureImageFile(file);
    };
    reader.readAsDataURL(file);
  }
  function handleBackgroundSelect(e) {
    const target = e.target;
    const file = target.files[0];

    if (!isValidFileSize(file.size, 5048) || !isImageFile(file)) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imgUrl = e.target.result;
      setBackground(imgUrl);
      setBackgroundImageFile(file);
    };
    reader.readAsDataURL(file);
  }

  function isValidFileSize(bytes, maxKilobytesSize) {
    const kylobytes = bytes / 1024;
    return kylobytes <= maxKilobytesSize;
  }

  function isImageFile(file) {
    return file.type.startsWith('image/');
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
  };
};

export default connect(mapStateToProps, { updateUser })(ProfileSetup);
