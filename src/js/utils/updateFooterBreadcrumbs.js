export const updateFooterBreadcrumbs = () => {
  const pageNavData = JSON.parse(
    document.querySelector('#page-nav-data').textContent
  );
  const footerLinks = pageNavData?.footerLinks;
  const footerBreadcrumbSection = document.querySelector(
    '.footer__section--breadcrumb'
  );
  if (footerLinks && footerLinks.length > 1) {
    footerBreadcrumbSection.classList.remove('footer__section--collapsed');
    const footerBreadcrumbSlot = document.querySelector('.footer__breadcrumbs');
    const footerTemplate = (links) => {
      return links
        .map(
          (link) =>
            `<a class="footer__breadcrumb${
              link.isTitle ? ' footer__breadcrumb--title' : ''
            }" href="${link.url}">${link.name}</a>`
        )
        .join('');
    };
    footerBreadcrumbSlot.innerHTML = footerTemplate(footerLinks);
  } else {
    footerBreadcrumbSection.classList.add('footer__section--collapsed');
  }
};
