export const getPostsFetchUrl = (currentPage) => {
  if (currentPage === "/blog/") {
    return "/";
  }
  return currentPage;
};
