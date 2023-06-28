import { TextField, styled } from '@mui/material';

const CustomInput = styled(({ ...rest }) => (
  <TextField
    variant="standard"
    InputProps={{ disableUnderline: true }}
    {...rest}
  />
))`
  disableunderline: true;
  border: 1px solid #d8e0f0;
  border-radius: 15px;
  box-shadow: 0 1px 2px rgb(184 200 224 / 22%);
  font-family: monospace;
  font-weight: 400;
  padding: 5px 10px;
  width: 100%;
`;

export default CustomInput;
