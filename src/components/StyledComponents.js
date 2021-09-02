import styled from 'styled-components';

// color: #ebf0f2 // silver
// color: #a4babf; // grey
// color: #f27b50; // fox orange
// color: #d94929; // darker orange
// color: #0d0d0d; // black
// color: #FF8254 // shadow
// color: #D96E48 // shadow

/* Color Theme Swatches in RGBA */
// .Foxtter-color-theme-1-rgba { color: rgba(235, 240, 242, 1); }
// .Foxtter-color-theme-2-rgba { color: rgba(164, 186, 191, 1); }
// .Foxtter-color-theme-3-rgba { color: rgba(242, 123, 80, 1); }
// .Foxtter-color-theme-4-rgba { color: rgba(217, 73, 41, 1); }
// .Foxtter-color-theme-5-rgba { color: rgba(13, 13, 13, 1); }

const COLORS = {
  primary: '#f27b50',
  seconday: '#a4babf',
  primaryShadow: '#d96e48',
  white: '#ffffff',
  black: '#0d0d0d',
  lightGray: '#d3d3d3',
  valid: '#2ecc71',
  invalid: '#e74c3c',
  invalidBackground: '#f8d7da',
  invalidShadow: '#f5c6cb',
  invalidText: '#721c24',
  lightText: 'rgb(91, 112, 131)',
  borderColor: 'rgb(235, 238, 240)',
  spaceContainer: 'rgb(247, 249, 250)',
};

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.wt ? props.wt : '100%')};
  height: ${(props) => (props.ht ? props.ht : '48px')};
  font-family: inherit;
  background: ${(props) => (props.primary ? COLORS.primary : COLORS.white)};
  color: ${(props) => (props.primary ? COLORS.white : COLORS.primary)};
  font-size: ${(props) => (props.size ? props.size : '1em')};
  font-weight: ${(props) => (props.weight ? props.weight : '')};
  margin: ${(props) => (props.mg ? props.mg : '')};
  padding: 0.25em 1em;
  border: 1px solid ${COLORS.primaryShadow};
  border-radius: 100px;
  outline: none;
  cursor: pointer;
`;

const NavButton = styled(Button)`
  border: none;
  color: ${COLORS.black};
  font-size: ${(props) => (props.size ? props.size : '1.3em')};
  width: ${(props) => (props.wt ? props.wt : 'auto')};
  font-weight: 700;

  &:hover {
    background-color: rgba(242, 123, 80, 0.1);
    color: ${COLORS.primary};
  }

  &.selected {
    color: ${COLORS.primary};
  }

  & * {
    pointer-events: none;
  }
`;

const Container = styled.div`
  width: ${(props) => (props.wt ? props.wt : '100%')};
  height: ${(props) => (props.ht ? props.ht : 'auto')};
  min-width: ${(props) => (props.mwt ? props.mwt : '')};
  min-height: ${(props) => (props.mht ? props.mht : '')};
  margin: ${(props) => (props.mg ? props.mg : '0')};
  padding: ${(props) => (props.pd ? props.pd : '0')};
  background-color: ${(props) => (props.bgc ? props.bgc : '')};
  border-radius: ${(props) => (props.br ? props.br : '')};

  &.app-container {
    max-width: 1400px;
    min-width: 940px;
    margin: 0 auto;
  }

  &.page-name-container {
    border-bottom: 1px solid ${COLORS.borderColor};
    width: 100%;
    height: 55px;
    min-height: 55px;

    justify-content: flex-start;
  }

  &.fweet-container {
    background-color: ${COLORS.white};
    border-bottom: 1px solid ${COLORS.lightGray};
  }

  &.space-container {
    background-color: ${COLORS.spaceContainer};
    width: 100%;
    height: 12px;
  }

  &.fweets-container {
    border-top: 1px solid ${COLORS.borderColor};
  }

  &.fweet-card {
    border-bottom: 1px solid ${COLORS.borderColor};
  }

  &.fweet-card-text-container {
    min-height: 50px;
  }

  &.page-container {
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;

    width: 100%;
    height: 100%;
    min-height: 100vh;
    min-width: 600px;
    border-right: 1px solid ${COLORS.borderColor};
  }

  &.border-up {
    border-top: 1px solid ${COLORS.borderColor};
  }

  &.profile-picture-container {
    background-color: white;
    border-radius: 50%;
    overflow: hidden;
    border: ${(props) => (props.border ? '3px solid white' : 'none')};
    min-width: ${(props) => (props.wt ? props.wt : '64px')};
    min-height: ${(props) => (props.ht ? props.ht : '64px')};
  }

  &.profile-page-picture-container {
    position: absolute;
    top: 65%;
    left: 2%;
  }

  &.profile-setup-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;

    height: auto;
    width: 100%;
    max-width: 600px;

    background-color: #fff;
    padding: 10px;
    border-radius: 20px;
    box-shadow: 0 0 10px 1px ${COLORS.primaryShadow};
  }

  &.profile-card {
    width: 100%;
    height: 73px;
    min-width: 338px;
    min-height: 73px;
    background-color: white;
    border-bottom: 1px solid ${COLORS.borderColor};
    cursor: pointer;
  }

  &.reply {
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: auto;
    height: auto;
    background-color: #fff;
    border: 1px solid ${COLORS.spaceContainer};
    box-shadow: ${COLORS.primaryShadow} 0 0 10px;
    border-radius: 20px;
    padding: 1%;
  }

  &.relative {
    position: relative;
  }

  &.pointer {
    cursor: pointer;
  }

  &.form {
    width: 33%;
    height: auto;
    min-width: 300px;
    max-width: 400px;
    z-index: 2;
  }

  &.signup .signup-warning {
    font-size: 1rem;
    color: ${COLORS.black};
    padding: 0 10px;
    list-style: inside;
  }
  &.signup .signup-label {
    position: relative;
  }

  &.signup .signup-label .signup-length {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 0.9rem;
    font-weight: bold;
  }

  &.signup .signup-label .signup-length .invalid {
    color: ${COLORS.invalid};
  }
`;

const FlexContainer = styled(Container)`
  width: ${(props) => (props.wt ? props.wt : '100%')};
  height: ${(props) => (props.ht ? props.ht : '100%')};
  display: flex;
  flex-direction: ${(props) => (props.column ? 'column' : 'row')};
  justify-content: ${(props) => (props.jc ? props.jc : 'center')};
  align-items: ${(props) => (props.ai ? props.ai : 'center')};
`;

const NavbarContainer = styled(FlexContainer)`
  position: fixed;
  border-right: 1px solid ${COLORS.borderColor};
  height: 100%;
  width: 300px;
  min-height: 400px;
`;

const NavbarHeader = styled.header`
  position: relative;
  min-width: 300px;
`;

const HomeContainer = styled(FlexContainer)`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  min-width: 600px;
  border-right: 1px solid ${COLORS.borderColor};
`;

const TransparentBackground = styled(Container)`
  position: ${(props) => (props.pos ? props.pos : 'absolute')};
  background-color: ${(props) =>
    props.rgba ? props.rgba : 'rgba(0, 0, 0, 0.5)'};
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  pointer-events: none;

  &.profile-background {
    position: relative;
  }
`;

const Title = styled.h1`
  font-size: ${(props) => (props.size ? props.size : '2em')};
  color: ${(props) => (props.color ? props.color : COLORS.black)};
  font-weight: bold;
`;

const Text = styled.span`
  display: block;
  font-family: 'Roboto', sans-serif;
  font-size: ${(props) => (props.size ? props.size : '1em')};
  font-weight: ${(props) => (props.weight ? props.weight : '')};
  color: ${(props) => (props.color ? COLORS.white : COLORS.black)};
  margin: ${(props) => (props.mg ? props.mg : '0')};
  padding: ${(props) => (props.pd ? props.pd : '0')};
  line-height: 1.1em;

  &.fweet-text {
    line-height: 1.3em;
    word-wrap: break-word;
  }

  &.break-anywhere {
    word-wrap: anywhere;
  }
`;

const NavText = styled(Text)`
  color: inherit;
  margin: ${(props) => (props.mg ? props.mg : '0 15px')};
`;

const LightText = styled(Text)`
  color: ${COLORS.lightText};
`;

const Icon = styled(BackgroundImage)`
  width: ${(props) => (props.wt ? props.wt : '64px')};
  height: ${(props) => (props.ht ? props.ht : '64px')};
  min-width: ${(props) => (props.wt ? props.wt : '64px')};
  min-height: ${(props) => (props.ht ? props.ht : '64px')};
  background-image: url(${(props) => props.imgUrl});
  margin: ${(props) => (props.mg ? props.mg : '0')};
  pointer-events: none;

  &.fweet {
    width: 24px;
    height: 24px;
    min-width: 24px;
    min-height: 24px;
  }

  &.fweet-card {
    width: 16px;
    height: 16px;
    min-width: 16px;
    min-height: 16px;
  }
`;

const Input = styled.input`
  display: block;
  width: ${(props) => (props.wt ? props.wt : '100%')};
  height: ${(props) => (props.ht ? props.ht : '45px')};

  font-size: ${(props) => (props.size ? props.size : '1.2em')};
  margin: ${(props) => (props.mg ? props.mg : '0')};
  padding: ${(props) => (props.pd ? props.pd : '5px')};
  border: ${(props) => {
    if (props.border) {
      return `2px solid ${props.valid ? COLORS.valid : COLORS.invalid}`;
    }

    return `2px solid ${COLORS.seconday}`;
  }};
  border-radius: 3px;
  outline: none;

  &:focus {
    border: 2px solid ${COLORS.primary};
  }

  &.hide {
    display: none;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 64px;
  padding: 5px;
  font-size: 1.3em;

  resize: none;
  outline: none;
  border: none;
  border-bottom: 1px solid ${COLORS.lightGray};

  &.profile-setup {
    border: 1px solid ${COLORS.lightGray};
  }
`;

const Searchbar = styled.input`
  width: 100%;
  height: auto;
  padding: 5px 2%;
  font-size: 1.2em;

  resize: none;
  outline: none;
  border: 1px solid ${COLORS.borderColor};
  border-radius: 20px;
`;

const SearchbarResult = styled.div`
  position: absolute;
  top: 100%;
  min-height: 20px;
  width: 95%;

  padding: 20px;
  background-color: #fff;

  border: 1px solid ${COLORS.borderColor};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const HelperText = styled(Text)`
  display: inline-block;
  cursor: pointer;
  color: ${(props) => (props.color ? props.color : COLORS.primary)};
`;

const Span = styled(Text)`
  display: inline;
`;

const HighlightCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.wt ? props.wt : '40px')};
  height: ${(props) => (props.ht ? props.ht : '40px')};
  margin: ${(props) => (props.mg ? props.mg : '0')};
  border-radius: 50%;
  border: ${(props) => (props.border ? '1px solid' + COLORS.primary : 'none')};

  &:hover {
    background-color: rgba(242, 123, 80, 0.1);
    color: ${COLORS.primary};
  }

  &.load-more {
    cursor: pointer;
  }

  &.fweet {
    width: 50px;
    height: 50px;
  }
`;

const TabItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 52px;
  min-height: 52px;

  color: ${COLORS.black};
  border: 3px solid rgba(0, 0, 0, 0);
  flex: 1 1 0px;
  cursor: pointer;

  &:hover {
    background-color: rgba(242, 123, 80, 0.1);
    color: ${COLORS.primary};
  }

  &.selected {
    color: ${COLORS.primary};
    border-bottom: 3px solid ${COLORS.primary};
  }
`;

const AlertMessage = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  justify-content: center;
  align-items: center;

  width: auto;
  height: 38px;

  font-size: 1.2em;
  padding: 0 10px;
  background-color: ${COLORS.invalid};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: white;
`;

const WrongBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${(props) => (props.wt ? props.wt : '100%')};
  height: ${(props) => (props.ht ? props.ht : 'auto')};
  min-width: ${(props) => (props.mwt ? props.mwt : '')};
  min-height: ${(props) => (props.mht ? props.mht : '38px')};
  margin: ${(props) => (props.mg ? props.mg : '0')};
  padding: 10px;

  border-radius: 10px;
  background-color: ${COLORS.invalidBackground};
  border: 1px solid ${COLORS.invalidShadow};
  color: ${COLORS.invalidText};
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  border: 1px solid ${COLORS.borderColor};
  margin: ${(props) => (props.mg ? props.mg : '0')};
`;

const StyledSvg = styled.svg`
  & line {
    stroke: ${COLORS.lightGray};
    stroke-width: 2;
  }

  &.reply {
    width: 100px;
    height: 50px;
  }
`;

export {
  Button,
  Container,
  FlexContainer,
  BackgroundImage,
  Title,
  Icon,
  Text,
  Input,
  HelperText,
  TransparentBackground,
  NavButton,
  NavText,
  NavbarContainer,
  LightText,
  HomeContainer,
  Span,
  Textarea,
  HighlightCircle,
  TabItem,
  AlertMessage,
  WrongBox,
  NavbarHeader,
  Line,
  StyledSvg,
  Searchbar,
  SearchbarResult,
};
