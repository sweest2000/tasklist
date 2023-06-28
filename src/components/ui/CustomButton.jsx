import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomButton = styled(({ mainColor, ...rest }) => <Button {...rest} />)`
  background-color: ${(props) => props.mainColor};
  border-radius: 1rem;
  box-shadow: 0 6px 12px ${(props) => props.mainColor}75;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  padding: 10px 30px;
  text-transform: capitalize;
  &:disabled {
    background-color: #7d8592;
    cursor: not-allowed;
  }
  &:hover {
    background-color: ${(props) => props.mainColor};
  }
`;

export default CustomButton;
