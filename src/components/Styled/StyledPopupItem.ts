import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

const StyledPopupItem = styled(Typography)`
  padding-inline: 1rem;
  padding-block: 0.7rem;
  letter-spacing: 1px;
  font-weight: 900;
  font-size: 12px;
  font-size: 1.4rem;
  background: #0e194697;
  color: #fbf9f9;
  text-shadow: 0 0 0.1rem #eedada;
  border-bottom: 1px solid #e6e4e4;
  &:last-child {
    border-bottom: none;
  }
  & > span {
    text-decoration: underline;
  }
`;
export default StyledPopupItem;
