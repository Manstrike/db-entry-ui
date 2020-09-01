import { PAGE_ROUTE_MAPPING } from '../PageRouteMapping'

export function getPageName() {
    const currentPage = window.location.pathname;
    return PAGE_ROUTE_MAPPING[currentPage];
}
