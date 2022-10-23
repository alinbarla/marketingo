import React, { useEffect, useState, useMemo } from "react";
import { styled } from "frontity";
import Card from "@material-ui/core/Card";
import isPropValid from "@emotion/is-prop-valid";

const StackedCard = ({
  childCount,
  raised,
  variant,
  children,
  className,
  ...props
}) => {
  const [cardHeight, setCardHeight] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const cardRef = React.useRef(null);

  const handleResize = React.useCallback(
    (e) => {
      if (cardRef.current) {
        setCardHeight(cardRef.current.offsetHeight);
        setCardWidth(cardRef.current.offsetWidth);
      }
    },
    [cardRef]
  );

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cardRef, handleResize]);

  const cardCommonProps = useMemo(() => {
    return { variant, raised };
  }, [variant, raised]);

  return (
    <StackedCardContainer
      height={cardHeight}
      width={cardWidth}
      childCount={childCount}
      {...props}
    >
      <StackedCardMain ref={cardRef} className={className} {...cardCommonProps}>
        {children}
      </StackedCardMain>
      {childCount &&
        childCount > 1 &&
        generateChild(childCount - 1, cardHeight, cardWidth, cardCommonProps)}
    </StackedCardContainer>
  );
};

const generateChild = (count, height, width, props) => {
  if (count > 4) count = 4;
  const arrElements = [];
  let offset = 0;
  let zIndex = 4;

  for (let i = 0; i < count; i++) {
    offset++;
    zIndex--;
    arrElements.push(
      <StackedCardChild
        key={`stacked-card-child-${height + width}-${offset}-${zIndex}`}
        height={height}
        width={width}
        offset={offset}
        zindex={zIndex}
        {...props}
      />
    );
  }
  return arrElements;
};

const StackedCardContainer = styled("div", {
  shouldForwardProp: (prop) =>
    isPropValid(prop) &&
    prop !== "height" &&
    prop !== "width" &&
    prop !== "cardCount",
})`
  position: relative !important;
  --offset-multiplier: 4px !important;
  transition: transform 0.6s ease !important;
  --translate: 0 !important;
  transform: translate(var(--translate), var(--translate)) !important;
  height: ${(props) => props.height}px !important;
  width: ${(props) => props.width}px !important;

  &:hover {
    --offset-multiplier: 6px !important;
    --translate: calc(
      -1px * (var(${(props) => props.childCount}) - 1)
    ) !important;
    transition: transform 0.3s ease !important;
  }
`;

const StackedCardMain = styled(Card)`
  position: absolute !important;
  padding: 0 16px !important;
  box-sizing: border-box !important;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1),
    0px -4px 8px rgba(255, 255, 255, 0.8) !important;
  transition: inherit !important;
  --translate: calc(var(--offset) * var(--offset-multiplier)) !important;
  transform: translate(var(--translate), var(--translate)) !important;
  --offset: 0 !important;
  z-index: 4 !important;
  border-radius: 6px !important;
  background: #eef2ff;
`;

const StackedCardChild = styled(StackedCardMain, {
  shouldForwardProp: (prop) =>
    prop !== "height" &&
    prop !== "width" &&
    prop !== "offset" &&
    prop !== "zindex",
})`
  --offset: ${(props) => props.offset} !important;
  z-index: ${(props) => props.zindex} !important;
  height: ${(props) => props.height}px !important;
  width: ${(props) => props.width}px !important;
  border: none !Important;
  background: #eef2ff;
`;

export default StackedCard;
