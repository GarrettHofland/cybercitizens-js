let req = {
    "address": "9ep7QhRWxW1meuqbAYWm1AqQv4qQY4smu2nL3ryqUNrbf3zHHmK", // New wallet
    "returnTo": "9gujoVSoLbhLrSyEkQNHsWLpGR4zneZ9MedF5R45t1zmEAdXeuZ", // Old wallet
    "startWhen": {
        "erg": 1000000000
    },
    "txSpec": {
        "requests": [
            {
            "value":200000000,
            "address":"9ep7QhRWxW1meuqbAYWm1AqQv4qQY4smu2nL3ryqUNrbf3zHHmK",
            'assets': [
                {
                    "tokenId":"e7e878b3cdb279826ce5824401af9d72b6fe9229f5fddacc3a06b51505ee9120",
                    "amount":1
                }
            ]
            }
        ],
        "inputs": [
            "$userIns",
            ""
        ]
    }
}