import { ToggleButton } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomToggleButton = styled(({ selectedColor, ...rest }) => (
  <ToggleButton {...rest} />
))`
  color: ${(props) => props.selectedColor};
  border: 1px solid ${(props) => props.selectedColor} !important;
  border-radius: 1rem !important;
  background-color: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  padding: 5px 0;
  width: 90px;
  text-transform: none;
  &.Mui-selected, &.Mui-selected:hover {
    color: white;
    background-color: ${(props) => props.selectedColor};
  },
`;

export default CustomToggleButton;
