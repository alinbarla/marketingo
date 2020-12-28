import breakpoints from "../../../constants/breakpoints";

export const flexBreakpoint = breakpoints.md;

export const columnWidthStyles = `
@media (min-width: ${flexBreakpoint}) {
  flex-basis: calc(50% - 1rem);
}
`;
