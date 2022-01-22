const auctionUrl = "";
const auctionIdTest = "";

const getRequest = async (url, api = explorerApi) => {
    return fetch(api+url).then(res => res.json);
};