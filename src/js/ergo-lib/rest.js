//From: https://github.com/ThierryM1212/ergo-pay/blob/main/ergo-payment-portal/src/ergo-related/rest.js

export async function post(url, body = {}, apiKey = '') {
    return await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            api_key: apiKey,
        },
        body: JSON.stringify(body),
    });
}
export async function get(url, apiKey = '') {
    return await fetch(url, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            api_key: apiKey,
        },
    }).then(res => res.json());
}