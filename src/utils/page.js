export const getCurPageRoute = () => {
  const curPage = getCurrentPages();
  return curPage[curPage.length - 1]?.route;
}
