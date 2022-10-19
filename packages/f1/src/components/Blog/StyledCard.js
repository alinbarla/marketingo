import Card from "@material-ui/core/Card";
import { styled } from "frontity";

const StyledCard = styled(Card)`
  margin: 0 auto 3.5rem;
  border: none !important;
  border-radius: 10px !important;
  box-shadow: 0 100px 80px rgb(70 125 249 / 4%),
    0 41.7776px 33.4221px rgb(70 125 249 / 3%),
    0 22.3363px 17.869px rgb(70 125 249 / 2%),
    0 12.5216px 10.0172px rgb(70 125 249 / 2%),
    0 6.6501px 5.32008px rgb(70 125 249 / 2%),
    0 2.76726px 2.21381px rgb(70 125 249 / 1%) !important;
  transition: box-shadow 0.25s !important;
  cursor: pointer;
  .postExcerptCard p {
    font-size: 18px !important;
    line-height: 1.4rem !important;
  }
  .postTitleCard {
    font-size: 1.5rem !important;
    font-weight: 800 !important;
    line-height: normal !important;
  }
  &:hover {
    box-shadow: 0 100px 80px rgb(0 0 0 / 6%),
      0 41.7776px 33.4221px rgb(0 0 0 / 5%),
      0 22.3363px 17.869px rgb(0 0 0 / 4%),
      0 12.5216px 10.0172px rgb(0 0 0 / 4%),
      0 6.6501px 5.32008px rgb(0 0 0 / 4%),
      0 2.76726px 2.21381px rgb(0 0 0 / 3%) !important;
  }
`;

export default StyledCard;
