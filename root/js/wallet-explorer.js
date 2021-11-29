let mrPixel = "9iPtqBeeTMuAX4rkQqpHti2BKyd8ZXYRUuqynWJm3ShNpoSyowT";
auctionAddress = `5t19JGogcry9DRipPNcLs4mSnHYXQoqazPDMXXcdMixeH2mkgzMvWXjENsHRJzfHAFnTL5FBDHQCzBcnYg4CU1LcJZMmUXAaDcsKdgfBk4sE9BDbLt6Yxkjh6ow65HGCgxkwNAEArMAz8tqZL7GzKx4AvYVkqG3ExKggwDyVrvx7YzN8xeFtEUcnVkDKM8ow7YWW8eee2EidfYArPRd8fxQr5EuZVEiQbzKZ6m4xgtHfhsEptE3pNdt69F94gkytpounxBYpJPqfeZ8hVxLk8qaXTGFiJTDTt2p9D5ue4skZf4AGSLJyuzpMkjdifczQNc784ic1nbTAcjL3FKGHqnkaVwnCxU7go45X9ZFHwdpc6v67vFDoHzAAqypax4UFF1ux84X5G4xK5NFFjMZtvPyjqn2ErNXVgHBs2AkpngBPjnVRiN4sWkhR66NfBNpigU8PaTiB4Rim2FMZSXuyhRySCA1BV8ydVxz45T9VHqHA6WYkXp2ppAHmc29F8MrHX5Ew2x6amraFgvsdgAB3XiiEqEjRc83mhZVL1QgKi5CdeeGNYiXeCkxaRhG3j6r1JdAgzGDAQfN8sdRcEc1aYxbPfbqM1s81NFm7K1UmMUxrfCUp73poGAfV8FvQa2akyascKBaSCqvwuHW2ZP4oMoJHjZjTAgQjQF8cBNF9YLo6wXEtMQT5FYc3bHSgd4xZXCk2oHYjUSACW1Z5e7KZ3Qw1Sa2UvpMdWhbZ5Ncu99WT7v6nHFLJvHEPM7evr41nhCe9Yt3pAq4ee4rKCtEer4vQWq2b5UJSDXDj5VkVepQ5tmeXfXrBc42Yqucy6VeQSE7W66o4hQjwW1iN3yipmdTmpaAEASmbXwCxRSm7g4sNkfA969xo14PZQpBY3QUGqgCWoqJJVFWMhfvD53rzfgJpA4JH5B1fvY99q5iwbsAKdJfZi4fxub9QWZSNQfht4JqXMDmc6XTkWLE4VCxBRQYzF44H2E6mdf5EbZHUrpXj5c2VfC6PZGg9qmrz14aZjafM4M7kRTqMwVB8R9r7kXM1FWidGoprp2fRoJUALAKxKDSTVHX8ejT8zkSKJ5W45dSQjMe3WUDTeKhiy6Fqio2ukV8THaizTp6yZWxMVdu3a15pGBv1kmXZJEnLN9BsxyhnW2iGM7tvwK1jAneXeBH1uVdusR59j5ubCGKeoaS5ToC8Ky6wZ2iCyb2JF5CTvR4sMUg2ksmUm1dk8EoRjJ9i5gkqY`;
auctionAddresses = [auctionAddress];
let auctions = [];

//Explorer Vars
explorerApi = 'https://api.ergoplatform.com/api/v0'
explorerApiV1 = 'https://api.ergoplatform.com/api/v1'

  window.onload = function() {
    console.log("T");
    getAuctionsRaw(mrPixel);
  }

  document.querySelector("#explorerToHome").onclick = function(event) {
    window.location = "../index.html";
}

  // Scrolls user to the top of the page
 function scrollToTop() {
    window.scrollTo(0,0);
}

  // Get every NFT able to be auctioned from the wallet 
  async function getAuctionsRaw(walletAddress) {
      await getActiveAuctions(walletAddress)
      .then(res => {
        auctionsRaw = res;
        buildAuctions();
      });
  }

  // Get every single NFT that is currently able to be auctioned
  async function getAllAuctionsRaw() {
    await getAllActiveAuctions()
    .then(res => {
      auctionsRaw = res;
      buildAuctions();
    });
  }

  // Build the list of NFTs currently able to be auctioned from the wallet, from the raw wallet data
  async function buildAuctions() {
    for( let i = 0; i < auctionsRaw.length - 1; i++){
      auctionsRaw[i].assets.forEach(async (i) => {
        await getMetaData(i.tokenId);
      });
    }
    nftsLoaded = true;

    setTimeout(buildPage, 1000);
  }

  // Build the html
  function buildPage() {
    let container = document.getElementById("nft-container");
    for(let i = 0; i < auctions.length; i++) {
        let auctionCard = document.createElement('div');
        let assetName = document.createElement('h2');
        let assetImage = document.createElement('img');

        assetImage.src = auctions[i].image;
        assetName.innerText = auctions[i].name;

        auctionCard.classList.add("auction-card");
        console.log(auctionCard.className);

        auctionCard.append(assetName);
        auctionCard.append(assetImage);
        document.querySelector("body").append(auctionCard);
    }  
  }

  // Build an object from the res, used to clean up the getMetaData function
  function createNFTObject(res) {
    return {
      "image" : res.map((token) => {
        return resolveIpfs(toUtf8String(token.additionalRegisters.R9).substr(2)); 
      }),
      "name" : res.map((token) => {
        return token.assets[0].name;
      }),
      "description": res.map((token) => {
        return toUtf8String(token.additionalRegisters.R5).substr(2);
      })
    };
  }

  // Get the NFT's metadata by using the ergoplatform explorer API
  async function getMetaData(tokenId) {
    await fetch(`https://api.ergoplatform.com/api/v0/assets/${tokenId}/issuingBox`)
    .then(res => res.json())
    .then(res => {
      auctions.push(createNFTObject(res));
      console.log(auctions);
    })
    .catch(error => console.log(error));
  }

  // Get the NFT's image from ipfs
  function resolveIpfs(url) {
		const ipfsPrefix = 'ipfs://'
		if (!url.startsWith(ipfsPrefix)) return url
		else return url.replace(ipfsPrefix, 'https://cloudflare-ipfs.com/ipfs/')
	}

  // Convert hex to utf8
  function toUtf8String(hex) {
		if(!hex){
			hex = ''
		}
		var str = '';
		for (var i = 0; i < hex.length; i += 2) {
			str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
		}
		return str;
	}

    // Get active auctions from supplied address
    function getActiveAuctions(addr) {
        return getRequest(`/boxes/unspent/byAddress/${addr}?limit=500`, explorerApiV1)
            .then(res => res.items)
            .then((boxes) => boxes.filter((box) => box.assets.length > 0));
    }

    // Get all active auctions from the supplied address
    async function getAllActiveAuctions() {
        const spending = (await getUnconfirmedTxsFor(auctionAddress)).filter((s) => s.inputs.length > 1)
        let idToNew = {};
        spending.forEach((s) => {
            let curId = s.inputs[s.inputs.length - 1].boxId;
            if (idToNew[curId] === undefined || idToNew[curId].value < s.value)
                idToNew[curId] = s.outputs[0]
        })
        const all = auctionAddresses.map((addr) => getActiveAuctions(addr));
        return Promise.all(all)
            .then((res) => [].concat.apply([], res))
            .then(res => {
                return res.map(r => {
                    if (idToNew[r.boxId] !== undefined) return idToNew[r.boxId]
                    else return r
                })
            })
    }

    function getUnconfirmedTxsFor(addr) {
        return getRequest(
            `/mempool/transactions/byAddress/${addr}`, explorerApiV1
        ).then((res) => res.items);
    }

    function getRequest(url, api = explorerApi) {
        console.log(api + url);
        return fetch(api + url).then(res => res.json())
    }