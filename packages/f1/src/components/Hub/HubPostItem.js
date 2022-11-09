import React from "react";
import { connect, styled } from "frontity";

import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import { useTheme } from "@material-ui/core/styles";
import { toggle } from "slidetoggle";

import StyledCard from "../StyledCard";
import StyledLink from "../StyledLink";
import { AddIcon } from "./HubIcons";
import noMedia from "../images/no-photo-available.png";

const colorArr = [
  "linear-gradient(135deg, #CE9FFC 0%,#7367F0 100%);",
  "linear-gradient(135deg, #13f1fc 0%,#0470dc 100%);",
  "linear-gradient(135deg, #FF57B9 0%,#A704FD 100%);",
  "linear-gradient(135deg, #fad961 0%,#f76b1c 100%);",
  "linear-gradient(135deg, #42e695 0%,#3bb2b8 100%);",
  "linear-gradient(135deg, #C56CD6 0%,#3425AF 100%);",
];

const getRandomColor = () => {
  return colorArr[Math.floor(Math.random() * colorArr.length)];
};

const HubPostItem = ({ state, actions, id }) => {
  const excerptRef = React.useRef(null);
  const [isCloseRotate, setIsCloseRotate] = React.useState(false);
  const hubPost = state.source.hub[id];
  if (!hubPost) return null;
  const media = state.source.attachment[hubPost.featured_media];
  const srcset =
    media &&
    Object.values(media.media_details.sizes)
      // Get the url and width of each size.
      .map((it) => [it.source_url, it.width])
      // Recude them to a string with the format required by `srcset`.
      .reduce(
        (final, current, index, array) =>
          final.concat(
            `${current.join(" ")}w${index !== array.length - 1 ? ", " : ""}`
          ),
        ""
      );

  const theme = useTheme();
  const currentColor = React.useMemo(() => getRandomColor(), []);

  const handleCardClick = (e, link) => {
    e.preventDefault();
    actions.router.set(link);
    window.scrollTo(0, 0);
    document.body.focus();
  };

  const handleClickExpand = (e) => {
    e.preventDefault();
    toggle(excerptRef.current);
    setIsCloseRotate((i) => !i);
  };

  return (
    <RandomColorStyledCard
      variant="outlined"
      bgColor={currentColor}
      // onClick={(e) => handleCardClick(e, hubPost.link)}
    >
      <Box
        sx={{ cursor: "pointer" }}
        onClick={(e) => handleCardClick(e, hubPost.link)}
      >
        <CardMediaOverlay>
          <h2>Leggi</h2>
        </CardMediaOverlay>
        <CardMedia
          component="img"
          alt={media.title.rendered}
          height="200"
          src={media ? media.source_url : noMedia}
          srcSet={media && srcset}
        />
      </Box>
      <CardContent>
        <Box display={"flex"} justifyContent={"center"}>
          <CardFab
            className={`close${isCloseRotate && " closeRotate"}`}
            color="primary"
            aria-label="add"
            onClick={handleClickExpand}
          >
            <AddIcon />
          </CardFab>
        </Box>
        <Box ref={excerptRef} className="MarketingoCardMore">
          <Typography
            variant="body2"
            dangerouslySetInnerHTML={{ __html: hubPost.excerpt.rendered }}
          />
          <Divider />
        </Box>
      </CardContent>
      <CardActions style={{ justifyContent: "center" }}>
        <Title gutterBottom variant="h5" component="h2">
          <Link href={hubPost.link} underline="none" color="inherit">
            {hubPost.title.rendered}
          </Link>
        </Title>
      </CardActions>
    </RandomColorStyledCard>
  );
};

export default connect(HubPostItem);

const RandomColorStyledCard = styled(StyledCard, {
  shouldForwardProp: (prop) => prop !== "bgColor",
})`
  background: ${(props) => props.bgColor} !important;
  text-align: center !important;
  margin-bottom: 1rem !important;
  min-height: 300px !important;
  max-width: 250px !important;
  cursor: auto !important;
  .MarketingoCardMore {
    display: none;
    color: white !important;
    .MuiTypography-body2 p {
      font-size: 0.875rem !important;
      line-height: 1.43 !important;
    }
  }
  .close {
    transition: transform 400ms ease !important;
  }
  .closeRotate {
    transform: translate(0px, -50px) rotate(45deg) !important;
  }
  .MuiDivider-root {
    background-color: white !important;
  }
`;

const CardFab = styled(Fab)`
  position: absolute !important;
  transform: translate(0px, -50px) !important;
  transition: all 300ms ease !important;
  z-index: 12 !important;
  color: white !important;
`;

const Title = styled(Typography)`
  font-size: 16px !important;
  line-height: 24px !important;
  font-weight: 700 !important;
  opacity: 0.95 !important;
  color: white;

  a {
    font-size: 16px !important;
    line-height: 24px !important;
    font-weight: 700 !important;
    opacity: 0.95 !important;
  }
`;

const CardMediaOverlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 200px;
  width: 250px;
  z-index: 10;
  color: white;
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
  background: rgba(0, 0, 0, 0.55);
  transition: all 700ms ease;
  opacity: 0;

  &:hover {
    opacity: 1;
  }
`;
