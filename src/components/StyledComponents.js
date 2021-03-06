import styled from 'styled-components';

// color: #ebf0f2 // silver
// color: #a4babf; // grey
// color: #f27b50; // fox orange
// color: #d94929; // darker orange
// color: #0d0d0d; // black
// color: #FF8254 // shadow
// color: #D96E48 // shadow
const COLORS = {
  primary: '#f27b50',
  seconday: '#a4babf',
  primaryShadow: '#d96e48',
  white: '#ffffff',
  black: '#0d0d0d',
  incorrect: '#e74c3c',
};

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  font-family: inherit;
  background: ${(props) => (props.primary ? COLORS.primary : COLORS.white)};
  color: ${(props) => (props.primary ? COLORS.white : COLORS.primary)};
  font-size: 1em;
  padding: 0.25em 1em;
  border: 1px solid ${COLORS.primaryShadow};
  border-radius: 100px;
  outline: none;
  cursor: pointer;
`;

const Container = styled.div`
  width: ${(props) => (props.wt ? props.wt : '100%')};
  height: ${(props) => (props.ht ? props.ht : 'auto')};
  margin: ${(props) => (props.mg ? props.mg : '0')};
  padding: ${(props) => (props.pd ? props.pd : '0')};
`;

const FlexContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${(props) => (props.column ? 'column' : 'row')};
  justify-content: ${(props) => (props.jc ? props.jc : 'center')};
  align-items: ${(props) => (props.ai ? props.ai : 'center')};
  margin: ${(props) => (props.mg ? props.mg : '0')};
  padding: ${(props) => (props.pd ? props.pd : '0')};
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
  font-weight: ${(props) => (props.weight ? props.weight : '0')};
  color: ${(props) => (props.color ? COLORS.white : COLORS.black)};
  margin: ${(props) => (props.mg ? props.mg : '0')};
  padding: ${(props) => (props.pd ? props.pd : '0')};
`;

const Icon = styled(BackgroundImage)`
  background-image: url(${(props) => props.imgUrl});
  width: 64px;
  height: 64px;
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
};
