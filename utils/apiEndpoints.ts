import type { ApiEndpoint } from "./interface";


// ~/utils/apiEndpoints.ts
export const apiEndpoints: Record<string, ApiEndpoint> = {
    getCampaign: {
        url: 'api/queryCampaign',
        method: 'POST',
    },
    importClick: {
        url: 'api/importClick',
        method: 'POST',
    },
    getDiscount: {
        url: 'api/orderCoupon',
        method: 'POST',
    },
    importLead: {
        url: 'api/importLead',
        method: 'POST',
    },
    importOrder: {
        url: 'api/importOrder',
        method: 'POST',
    },
    ipInfo: {
        url: 'https://ipinfo.io/json',
        method: 'GET',
    },
    importUpsell: {
        url: 'api/importUpsell',
        method: 'POST',
    },
    orderSalesTax: {
        url: 'api/orderSalesTax',
        method: 'POST',
    },
    confirmPaypal: {
        url: 'api/confirmPaypal',
        method: 'POST'
    },
    fbCAPI: {
        url: 'api/facebookApi',
        method: 'POST'
    },
    getProduct: {
        url: '/get/shopify/product',
        method: 'POST'
    },
    getCCProduct: {
        url: 'api/shopifyApi',
        method: 'POST'
    },
    getSearchProducts: {
        url: '/get/shopify/products',
        method: 'POST'
    }
    // Add more endpoints as needed
};


export function getUrl(endpoint:string): ApiEndpoint {
    const apiBaseUrl=useRuntimeConfig().public.apiBaseUrl;
    return {url:apiBaseUrl+apiEndpoints[endpoint].url,method:apiEndpoints[endpoint].method};
}
