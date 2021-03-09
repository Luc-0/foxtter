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
  incorrect: '#e74c3c',
  username: 'rgb(91, 112, 131)',
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
  padding: 0.25em 1.5em;
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
  margin: ${(props) => (props.mg ? props.mg : '0')};
  padding: ${(props) => (props.pd ? props.pd : '0')};
  background-color: ${(props) => (props.bgc ? props.bgc : '')};
  border-radius: ${(props) => (props.br ? props.br : '')};

  &.fweet-container {
    background-color: ${COLORS.white};
    border-bottom: 1px solid ${COLORS.lightGray};
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
  border-right: 1px solid ${COLORS.lightGray};
  width: 270px;
  height: 100vh;
  min-height: 400px;
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
`;

const Title = styled.h1`
  font-size: ${(props) => (props.size ? props.size : '2em')};
  color: ${(props) => (props.color ? props.color : COLORS.black)};
  font-weight: bold;
`;

const Text = styled.span`
  display: block;
  font-family: inherit;
  font-size: ${(props) => (props.size ? props.size : '1em')};
  font-weight: ${(props) => (props.weight ? props.weight : '')};
  color: ${(props) => (props.color ? COLORS.white : COLORS.black)};
  margin: ${(props) => (props.mg ? props.mg : '0')};
  padding: ${(props) => (props.pd ? props.pd : '0')};
`;

const NavText = styled(Text)`
  color: inherit;
  margin: ${(props) => (props.mg ? props.mg : '0 15px')};
`;

const UsernameText = styled(Text)`
  color: ${COLORS.username};
`;

const Icon = styled(BackgroundImage)`
  width: ${(props) => (props.wt ? props.wt : '64px')};
  height: ${(props) => (props.ht ? props.ht : '64px')};
  background-image: url(${(props) => props.imgUrl});
  margin: ${(props) => (props.mg ? props.mg : '0')};
`;

const Input = styled.input`
  display: block;
  width: ${(props) => (props.wt ? props.wt : '100%')};
  height: ${(props) => (props.ht ? props.ht : '45px')};

  font-size: ${(props) => (props.size ? props.size : '1.2em')};
  margin: ${(props) => (props.mg ? props.mg : '0')};
  padding: ${(props) => (props.pd ? props.pd : '5px')};
  border: 1px solid
    ${(props) => (props.incorrect ? COLORS.incorrect : COLORS.seconday)};
  border-radius: 3px;
  outline: none;

  &:focus {
    border: 2px solid ${COLORS.primary};
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
`;

const HelperText = styled(Text)`
  display: inline-block;
  cursor: pointer;
  color: ${(props) => (props.color ? props.color : COLORS.primary)};
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
  UsernameText,
};
