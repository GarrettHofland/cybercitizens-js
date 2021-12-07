let mrPixel = "9iPtqBeeTMuAX4rkQqpHti2BKyd8ZXYRUuqynWJm3ShNpoSyowT";
auctionAddress = `5t19JGogcry9DRipPNcLs4mSnHYXQoqazPDMXXcdMixeH2mkgzMvWXjENsHRJzfHAFnTL5FBDHQCzBcnYg4CU1LcJZMmUXAaDcsKdgfBk4sE9BDbLt6Yxkjh6ow65HGCgxkwNAEArMAz8tqZL7GzKx4AvYVkqG3ExKggwDyVrvx7YzN8xeFtEUcnVkDKM8ow7YWW8eee2EidfYArPRd8fxQr5EuZVEiQbzKZ6m4xgtHfhsEptE3pNdt69F94gkytpounxBYpJPqfeZ8hVxLk8qaXTGFiJTDTt2p9D5ue4skZf4AGSLJyuzpMkjdifczQNc784ic1nbTAcjL3FKGHqnkaVwnCxU7go45X9ZFHwdpc6v67vFDoHzAAqypax4UFF1ux84X5G4xK5NFFjMZtvPyjqn2ErNXVgHBs2AkpngBPjnVRiN4sWkhR66NfBNpigU8PaTiB4Rim2FMZSXuyhRySCA1BV8ydVxz45T9VHqHA6WYkXp2ppAHmc29F8MrHX5Ew2x6amraFgvsdgAB3XiiEqEjRc83mhZVL1QgKi5CdeeGNYiXeCkxaRhG3j6r1JdAgzGDAQfN8sdRcEc1aYxbPfbqM1s81NFm7K1UmMUxrfCUp73poGAfV8FvQa2akyascKBaSCqvwuHW2ZP4oMoJHjZjTAgQjQF8cBNF9YLo6wXEtMQT5FYc3bHSgd4xZXCk2oHYjUSACW1Z5e7KZ3Qw1Sa2UvpMdWhbZ5Ncu99WT7v6nHFLJvHEPM7evr41nhCe9Yt3pAq4ee4rKCtEer4vQWq2b5UJSDXDj5VkVepQ5tmeXfXrBc42Yqucy6VeQSE7W66o4hQjwW1iN3yipmdTmpaAEASmbXwCxRSm7g4sNkfA969xo14PZQpBY3QUGqgCWoqJJVFWMhfvD53rzfgJpA4JH5B1fvY99q5iwbsAKdJfZi4fxub9QWZSNQfht4JqXMDmc6XTkWLE4VCxBRQYzF44H2E6mdf5EbZHUrpXj5c2VfC6PZGg9qmrz14aZjafM4M7kRTqMwVB8R9r7kXM1FWidGoprp2fRoJUALAKxKDSTVHX8ejT8zkSKJ5W45dSQjMe3WUDTeKhiy6Fqio2ukV8THaizTp6yZWxMVdu3a15pGBv1kmXZJEnLN9BsxyhnW2iGM7tvwK1jAneXeBH1uVdusR59j5ubCGKeoaS5ToC8Ky6wZ2iCyb2JF5CTvR4sMUg2ksmUm1dk8EoRjJ9i5gkqY`;
auctionAddresses = [auctionAddress];
let auctions = [];

//Explorer Vars
explorerApi = 'https://api.ergoplatform.com/api/v0'
explorerApiV1 = 'https://api.ergoplatform.com/api/v1'

  window.onload = function() {
    getAuctionsRaw(mrPixel);
  }

  document.querySelector("#explorerToHome").onclick = function(event) {
    window.location = "../index.html";
  }

  if(document.querySelector("#searchButton") && document.querySelector("#searchBar")){
    document.querySelector("#searchButton").onclick = function(event) {
      getMetaData(document.querySelector("#searchBar").value);
    }
  }

  // Scrolls user to the top of the page
 function scrollToTop() {
    window.scrollTo(0,0);
}

  // Get every NFT able to be auctioned from the wallet 
  async function getAuctionsRaw(walletAddress) {
      await getActiveAuctions(walletAddress)
      .then(res => {
        console.log(res);
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
    for(let i = 0; i < auctionsRaw.length - 1; i++){
      auctionsRaw[i].assets.forEach(async (i) => {
        await getMetaDataAll(i.tokenId);
      });
    }
    nftsLoaded = true;

    setTimeout(buildPage, 1000);
  }

  function displaySearchResults(token) {
    //04ebbd14f9dcf138ef11f037743abb5f21a70f804107eaacee807d0657864e34

    let container = document.getElementById("search-result");

    while(container.firstChild)
      container.removeChild(container.firstChild);


    if(token === "Error") {
      let errorMsg = document.createElement('h1');
      errorMsg.innerHTML = "NFT with TokenID not found or NFT does not belong to the CyberCitizens drop!";
      container.append(errorMsg);
    }

    let resultCard = document.createElement('div');
    let assetName = document.createElement('h2');
    let assetImage = document.createElement('img');
    let assetMetaData = JSON.parse(token.description[0].slice(1, token.description[0].length));

    let attributeContainer = document.createElement('div');
    let background = "Background: " + assetMetaData['721']['0']['traits:']['Background'];
    let clothes = "Clothes: " + assetMetaData['721']['0']['traits:']['Clothes'];
    let eyes = "Eyes: " + assetMetaData['721']['0']['traits:']['Eyes'];
    let gender = "Gender: " + assetMetaData['721']['0']['traits:']['Gender'];
    let neck = "Neck: " + assetMetaData['721']['0']['traits:']['Neck'];
    let skintone = "Skintone: " + assetMetaData['721']['0']['traits:']['Skintone'];

    assetImage.src = token.image;
    assetName.innerText = token.name;

    let backgroundEl = document.createElement('div');
    let clothesEl = document.createElement('div');
    let eyesEl = document.createElement('div');
    let genderEl = document.createElement('div');
    let neckEl = document.createElement('div');
    let skintoneEl = document.createElement('div');

    backgroundEl.classList.add("attribute");
    clothesEl.classList.add("attribute");
    eyesEl.classList.add("attribute");
    genderEl.classList.add("attribute");
    neckEl.classList.add("attribute");
    skintoneEl.classList.add("attribute");

    backgroundEl.innerHTML = background;
    clothesEl.innerHTML = clothes;
    eyesEl.innerHTML = eyes;
    genderEl.innerHTML = gender;
    neckEl.innerHTML = neck;
    skintoneEl.innerHTML = skintone;

    attributeContainer.append(backgroundEl, clothesEl, eyesEl, genderEl, neckEl, skintoneEl);

    attributeContainer.classList.add("attribute-container");

    resultCard.classList.add("auction-card");
    resultCard.classList.add("search-card");

    resultCard.append(assetName, assetImage, attributeContainer);
    // resultCard.append(assetImage);
    // resultCard.append(assetMetaData);
    container.append(resultCard);
  }

  // Build the html
  function buildPage() {
    let container = document.getElementById("nft-container");
    for(let i = 0; i < auctions.length; i++) {
        let auctionCard = document.createElement('div');
        let assetName = document.createElement('h2');
        let assetImage = document.createElement('img');
        let assetMetaData = auctions[i].description;

        assetImage.src = auctions[i].image;
        assetName.innerText = auctions[i].name;
        

        auctionCard.classList.add("auction-card");
        auctionCard.classList.add("popupNFT"+i);

        auctionCard.append(assetName);
        auctionCard.append(assetImage);
        container.append(auctionCard);

        document.querySelector(".popupNFT"+i).onclick = function() {
          showNFTModal(auctions[i].image, auctions[i].name);
        }
    }  
  }

  // Show a popup of the NFT
  function showNFTModal(image, name, metadata) {
    if(metadata === undefined)
      metadata = "No metadata available.";

    var modal = document.getElementById("explorerModal");
    let auctionCard = document.createElement("div");
    let assetName = document.createElement('h2');
    let assetImage = document.createElement('img');
    let assetMetadata = document.createElement("p");
    let otherCards = document.getElementsByClassName("auction-card");
    let exploreHeader = document.getElementById("explore-header");
    let searchContainer = document.querySelector(".search-container");
    let searchResult = document.querySelector("#search-result");
    let footer = document.querySelector('footer');
    let userY = window.screenY;
    let userX = window.screenX;

    exploreHeader.style.display = "none";
    searchContainer.style.display = "none";
    searchResult.style.display = "none";
    footer.style.display = "none";

    while(modal.firstChild)
      modal.removeChild(modal.firstChild);

    for(let i = 0; i < otherCards.length; i++){
      otherCards.item(i).style.display = "none";
    }

    assetImage.src = image;
    assetName.innerText = name;
    assetMetadata.innerText = metadata;

    auctionCard.classList.add("auction-card-modal");

    auctionCard.append(assetName);
    auctionCard.append(assetImage);
    auctionCard.append(assetMetadata);

    modal.append(auctionCard);

    modal.style.display = "block";

    modal.onclick = function() {
      modal.style.display = "none";
      for(let i = 0; i < otherCards.length; i++){
        otherCards.item(i).style.display = "block";
      }
      exploreHeader.style.display = "block";
      searchContainer.style.display = "flex";
      searchResult.style.display = "flex";
      footer.style.display = "flex";
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

  // Get the NFTs' metadata by using the ergoplatform explorer API
  async function getMetaDataAll(tokenId) {
    await fetch(`https://api.ergoplatform.com/api/v0/assets/${tokenId}/issuingBox`)
    .then(res => res.json())
    .then(res => {
      auctions.push(createNFTObject(res));
    })
    .catch(error => console.log(error));
  }

    // Get the NFT's metadata by using the ergoplatform explorer API
    async function getMetaData(tokenId) {
      await fetch(`https://api.ergoplatform.com/api/v0/assets/${tokenId}/issuingBox`)
      .then(res => res.json())
      .then(res => {
        displaySearchResults(createNFTObject(res));
      })
      .catch(error => {
        console.log(error);
        displaySearchResults("Error");
      });
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

    // Get the unspent box
    function getUnconfirmedTxsFor(addr) {
        return getRequest(
            `/mempool/transactions/byAddress/${addr}`, explorerApiV1
        ).then((res) => res.items);
    }

    // Function for appending requests to the exploreAPI URL
    function getRequest(url, api = explorerApi) {
        return fetch(api + url).then(res => res.json())
    }
