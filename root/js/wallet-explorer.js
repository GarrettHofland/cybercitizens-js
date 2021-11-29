  let mrPixel = "9iPtqBeeTMuAX4rkQqpHti2BKyd8ZXYRUuqynWJm3ShNpoSyowT";

  document.onload = function() {
    // getAuctionsRaw(mrPixel);
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
    await httpClient.get(`https://api.ergoplatform.com/api/v0/assets/${tokenId}/issuingBox`)
    .toPromise()
    .then(response => JSON.parse(JSON.stringify(response)))
    .then(res => {
      auctions.push(createNFTObject(res));
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
        return this.getRequest(`/boxes/unspent/byAddress/${addr}?limit=500`, this.explorerApiV1)
            .then(res => res.items)
            .then((boxes) => boxes.filter((box) => box.assets.length > 0));
    }

    // Get all active auctions from the supplied address
    async function getAllActiveAuctions() {
        const spending = (await this.getUnconfirmedTxsFor(this.auctionAddress)).filter((s) => s.inputs.length > 1)
        let idToNew = {};
        spending.forEach((s) => {
            let curId = s.inputs[s.inputs.length - 1].boxId;
            if (idToNew[curId] === undefined || idToNew[curId].value < s.value)
                idToNew[curId] = s.outputs[0]
        })
        const all = this.auctionAddresses.map((addr) => this.getActiveAuctions(addr));
        return Promise.all(all)
            .then((res) => [].concat.apply([], res))
            .then(res => {
                return res.map(r => {
                    if (idToNew[r.boxId] !== undefined) return idToNew[r.boxId]
                    else return r
                })
            })
    }