export const collectionHostedCaseStudy = (collectionsApi) => {
  return collectionsApi.getFilteredByTag('case study').filter((el) => {
    return el.page.outputPath;
  });
};
