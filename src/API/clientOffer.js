const client = require ('./client');
const {OFFERS_API_URL, OFFER_TYPES_API_URL, BASE_OFFERS_API_URL, OFFER_BUSINESS_API_URL, PROVINCE_API_URL, CREATE_OFFER_API_URL, LIKE_OFFER_API_URL, PRICE_RANGES_API_URL, AREA_RANGES_API_URL, SAVE_OFFER_API_URL, MY_OFFERS_API_URL, SAVED_OFFERS_API_URL, RECOMMENDED_OFFERS_API_URL} = require ('../constants/index');
const {SEARCH_API_URL, UPLOAD_IMAGE_API_URL} = require ('../constants/index');
module.exports = {
    get: ()=>
    {
        return client.get(OFFERS_API_URL);
    },
    getSavedOffers: ()=>
    {
        return client.get(SAVED_OFFERS_API_URL);
    },
    getPage: (page)=>
    {
        return client.get(OFFERS_API_URL+"?page="+page);
    },
    getMyOffersPage: (page)=>
    {
        return client.get(MY_OFFERS_API_URL+"?page="+page);
    },
    getRecommendedOffersPage: (page)=>
    {
        return client.get(RECOMMENDED_OFFERS_API_URL+"?page="+page);
    },
    getSearchPage: (body)=>
    {
        return client.post(SEARCH_API_URL+"?page="+body.page,body.offer);
    },
    getbyId: (id)=>
    {
        return client.getbyId(BASE_OFFERS_API_URL,id);
    },
    search: (body)=>
    {
        return client.post(SEARCH_API_URL,body);
    },
    post: async(body)=>
    {
        const data = client.post(CREATE_OFFER_API_URL,body);
        return data;
    },
    put: async(body, id)=>
    {
        const data = client.put(BASE_OFFERS_API_URL,body, id);
        return data;
    },
    patch: async(body, id)=>
    {
        const data = client.patch(BASE_OFFERS_API_URL, body ,id);
        return data;
    },
    like: async(id)=>
    {
        const data = client.put(LIKE_OFFER_API_URL, {} ,id);
        return data;
    },
    save: async(id)=>
    {
        const data = client.put(SAVE_OFFER_API_URL, {} ,id);
        return data;
    },
    delete: async(id)=>
    {
        const data = client.delete(BASE_OFFERS_API_URL, id);
        return data;
    },
    uploadImage: async(image)=>
    {
        const data = client.post(UPLOAD_IMAGE_API_URL,image);
        return data;
    },
    getOfferTypes: async()=>{
        return client.get(OFFER_TYPES_API_URL);
    },
    getBusinessOffer: async()=>{
        return client.get(OFFER_BUSINESS_API_URL);
    },
    getProvince: async()=>{
        return client.get(PROVINCE_API_URL);
    },
    getAreaRanges: async()=>{
        return client.get(AREA_RANGES_API_URL);
    },
    getPriceRanges: async()=>{
        return client.get(PRICE_RANGES_API_URL);
    },
    getRegions: async(id)=>{
        return client.get(PROVINCE_API_URL+"/"+id);
    }
}
