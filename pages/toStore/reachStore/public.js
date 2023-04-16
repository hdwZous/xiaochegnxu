import { clickBuriedV2_ } from "../../../common/util/BI";
export function maidian(clickId, clickPar, buriedObj) {
  let { pageIdFirstPage, currentPageName, prePageName } = buriedObj || {};
  clickBuriedV2_({
    click_id: clickId,
    click_par: clickPar,
    pageId: pageIdFirstPage || "",
    currentPageName: currentPageName,
    prePageName: prePageName,
  })
}