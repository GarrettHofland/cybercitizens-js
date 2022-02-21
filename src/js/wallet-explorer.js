/*
  Attributes Rarities for the Search Functionality
*/
const rarities = [{
  "traits": {
    "Gender": {
      "Male": "73.18%",
      "Female": "26.38%",
      "Robot": "0.432%"
    },
    "Background": {
      "Cyber Sunrise": "21.14%",
      "Indigo Night": "20.03%",
      "Oasis": "19.50%",
      "Pink Fever": "19.46%",
      "Black Pearl": "19.41%",
      "Bloody Night": "0.432%"
    },
    "Skin tone": {
      "Tanned White": "25.70%",
      "White": "24.46%",
      "Black": "23.64%",
      "Brown": "21.91%",
      "Monkey": "3.84%",
      "Silver": "0.24%",
      "Golden": "0.144%",
      "Diamond": "0.048%"
    },
    "Eyebrows": {
      "Black": "30.42%",
      "Dark purple": "16.24%",
      "Red": "10.38%",
      "Green": "9.03%",
      "Purple": "8.84%",
      "Dark Green": "7.88%",
      "Dark blue": "6.15%",
      "Brown": "6.00%",
      "None": "4.28%",
      "Blue": "0.72%",
      "Gray": "0.048%"
    },
    "Eyes": {
      "Brown": "39.64%",
      "Lime green": "6.20%",
      "Dark green": "5.91%",
      "Orange": "5.34%",
      "Blue": "5.29%",
      "Classic blue ": "5.29%",
      "Purple": "4.86%",
      "Light Blue": "4.86%",
      "Dark blue": "4.66%",
      "Black": "3.85%",
      "Ocean blue": "3.75%",
      "BlackBrown": "3.75%",
      "Ruby": "3.46%",
      "Red": "1.87%",
      "Weird blue": "1.30%"
    },
    "Scar": {
      "None": "92.98%",
      "Left": "3.8%",
      "Right": "3.22%"
    },
    "Left earring": {
      "None": "76.31%",
      "Silver": "12.30%",
      "Gold": "7.64%",
      "Diamond": "3.75%"
    },
    "Right earring": {
      "None": "74.58%",
      "Silver": "12.78%",
      "Gold": "8.41%",
      "Diamond": "4.23%"
    },
    "Lipstick": {
      'None': "12.9%",
      'Cotton candy': "2.8%",
      'Purple': "2.7%",
      'Dark pink': "2.6%",
      'Pink': "2.5%",
      'Red': "2.5%"
    },
    "Robotic face": {
      "None": "78.14%",
      "Left half Silver": "5.39%",
      "Right half Silver": "5.34%",
      "Left half Golden": "4.62%",
      "Right half Golden": "4.08%",
      "Right half Diamond": "1.35%",
      "Left half Diamond": "1.11%"
    },
    "Hair": {
      "Blue buzzcut": "5.62%",
      "Dark blue crew cut": "5.48%",
      "Brown buzzcut": "4.86%",
      "Black crew cut": "4.81%",
      "Blond crew cut": "4.76%",
      "Green short hair": "4.62%",
      "Black buzzcut": "4.57%",
      "Pink crew cut": "4.52%",
      "None": "4.23%",
      "Purple buzzcut": "3.89%",
      "Blue short hair": "3.60%",
      "Bald": "3.51%",
      "Purple short hair": "3.51%",
      "Dark blue short hair": "3.32%",
      "Purple Mullet": "1.25%",
      "Brown afro": "1.20%",
      "Black Mullet": "1.20%",
      "Blonde Mullet": "1.06%",
      "Pink wicks dreads": "1.06%",
      "Pink short dreads": "1%",
      "Green afro": "1%",
      "Red Mullet": "1%",
      "Green slanted sweep": "0.96%",
      "White short dreads": "0.91%",
      "Black long hair": "0.86%",
      "Pink afro": "0.86%",
      "Blue afro": "0.86%",
      "Dark blue slanted sweep": "0.82%",
      "Black wicks dreads": "0.82%",
      "Blue short dreads": "0.82%",
      "Green long hair": "0.77%",
      "Pink fluffy hair": "0.77%",
      "Light blue long spike": "0.72%",
      "Purple slanted sweep": "0.72%",
      "Red punk": "0.72%",
      "Green long spike": "0.72%",
      "Green punk": "0.67%",
      "Blue wicks dreads": "0.67%",
      "Black afro": "0.62%",
      "Red long hair": "0.62%",
      "Green short dreads": "0.62%",
      "Blonde fluffy hair": "0.58%",
      "Blonde pigtails": "0.58%",
      "Black medium hair arched bangs": "0.58%",
      "Purple long hair": "0.58%",
      "Blue Mullet": "0.53%",
      "Purple punk": "0.53%",
      "Dark blue long hair": "0.53%",
      "Brown short hair curtain bangs": "0.53%",
      "Blonde punk": "0.53%",
      "Black pigtails": "0.53%",
      "Light pink space buns": "0.48%",
      "Black medium hair": "0.48%",
      "Black Wicks dreads": "0.48%",
      "Black short dreads": "0.48%",
      "Purple pigtails": "0.43%",
      "Dark blue space buns": "0.43%",
      "Black long spike": "0.43%",
      "Light blue punk": "0.43%",
      "Dark blue Mullet": "0.38%",
      "Blue fluffy hair": "0.38%",
      "Blue Wicks dreads": "0.38%",
      "Galaxy purple long spike": "0.38%",
      "Blonde medium hair": "0.38%",
      "Red short hair curtain bangs": "0.34%",
      "Purple short hair curtain bangs": "0.34%",
      "Blone space buns": "0.34%",
      "Blue medium hair arched bangs": "0.29%",
      "Green pigtails": "0.29%",
      "Blonde medium hair arched bangs": "0.29%",
      "Green short hair curtain bangs": "0.29%",
      "Blue pigtails": "0.29%",
      "Purple medium hair arched bangs": "0.24%",
      "Light pink short hair arched bangs": "0.24%",
      "Purple short hair arched bangs": "0.19%",
      "Black punk": "0.19%",
      "Pink Wicks dreads": "0.19%",
      "Blue short hair arched bangs": "0.19%",
      "Purple long spike ": "0.19%",
      "Black space buns": "0.19%",
      "White medium hair": "0.14%",
      "Red short hair arched bangs": "0.096%"
    },
    "Glasses": {
      "None": "61.22%",
      "Classic": "3.60%",
      "Classic black VR": "3.36%",
      "Purple": "3.08%",
      "Luxury": "2.84%",
      "Eye Patch": "2.79%",
      "3D": "2.79%",
      "Modern white VR": "2.64%",
      "Classic white VR": "2.64%",
      "Golden": "2.50%",
      "Ruby": "2.40%",
      "Emerald": "2.31%",
      "Golden VR": "2.11%",
      "Rainbow": "2.02%",
      "Double VR": "1.87%",
      "Diamond": "1.49%",
      "Diamond VR": "0.34%"
    },
    "Hat": {
      "None": "69.29%",
      "Pink beanie": "5.00%",
      "White beanie": "4.81%",
      "Purple-blue beanie": "3.65%",
      "Police hat": "3.41%",
      "Detective hat": "2.98%",
      "Beret": "2.74%",
      "Black cap": "2.59%",
      "Luxury hat": "1.87%",
      "Brown cowboy hat": "1.82%",
      "Black cowboy hat ": "1.68%",
      "Crown": "0.14%"
    },
    "Neck": {
      "None": "79.53%",
      "Silver": "9.75%",
      "Golden": "7.35%",
      "Diamond": "3.36%"
    },
    "Beard": {
      "None": "56.61%",
      "Goatee": "3.56%",
      "Mustache": "2.35%",
      "Blue short": "1.87%",
      "Purple short": "1.25%",
      "Black short": "1.25%",
      "Brown long": "1.20%",
      "Purple long": "1.20%",
      "Blue long ": "1.11%",
      "Dark blue short": "1.06%",
      "Black long": "0.96%",
      "Dark green short": "0.72%",
      "Gray long": "0.048%"
    },
    "Mask": {
      "None": "0.74%",
      "Black": "3.60%",
      "Red": "3.27%",
      "White": "3.08%",
      "Cigarette ": "3.03%",
      "Electric cigarette": "2.79%",
      "Galaxy": "2.69%",
      "Striped blue": "1.78%",
      "Striped pink": "1.68%",
      "Luxury": "1.63%",
      "Pipe": "1.20%",
      "Golden Pipe": "1.11%"
    },
    "Left arm": {
      "None": "90.68%",
      "Silver ": "3.94%",
      "Golden": "3.60%",
      "Diamond ": "2.26%"
    },
    "Right arm": {
      "None": "90.77%",
      "Silver": "3.99%",
      "Golden": "3.80%",
      "Diamond": "1.44%"
    },
    "Shirt": {
      "None": "30.99%",
      "Black T-shirt": "4.18%",
      "Pink T-shirt": "3.94%",
      "Dark green T-shirt": "3.89%",
      "Light blue T-shirt": "3.80%",
      "Light blue off shoulder t-shirt": "3.75%",
      "Doppler T-shirt": "3.75%",
      "Light green T-shirt": "3.65%",
      "Purple T-shirt": "3.60%",
      "Blue off shoulder t-shirt": "3.46%",
      "Space blue T-shirt": "3.41%",
      "Space blue tank top": "3.32%",
      "Dark blue T-shirt": "3.32%",
      "Green off shoulder t-shirt ": "3.2%",
      "Dark purple T-shirt": "3.17%",
      "Turquoise T-shirt": "3.12%",
      "Black tank top": "3.08%",
      "White tank top": "3.03%",
      "Gold Shirt": "2.74%",
      "Wine tank top": "2.69%",
      "Blue Shirt": "1.92%",
      "White Shirt": "1.87%",
      "White": "0.048%"
    },
    "Chain": {
      "None": "82.84%",
      "Silver": "7.16%",
      "Golden": "5.05%",
      "Diamond": "3.17%",
      "Galaxy": "1.78%"
    },
    "Clothes": {
      "Black tank top": "12.83%",
      "Wine coat": "10.17%",
      "Green coat": "10.17%",
      "White coat": "10.17%",
      "Black coat": "10.17%",
      "Blue coat": "10.17%",
      "Blue hoodie": "11.58%",
      "Purple hoodie": "11.58%",
      "Pink hoodie": "11.58%",
      "Dark blue hoodie": "11.58%",
      "Red hoodie": "11.58%",
      "Luxury pimp": "21.82%",
      "Orange pimp": "21.82%",
      "Purple pimp": "21.82%",
      "Pink pimp": "21.82%",
      "None": "10.67%",
      "Vest": "7.98%",
      "Black smoking": "7.30%",
      "Blue smoking": "6.73%",
      "Blue tank top": "5.62%",
      "Golden smoking": "2.98%",
      "Green robe": "1.35%",
      "Hooded sweatshirt": "1%"
    }
  }
}];


const mrPixel = "9iPtqBeeTMuAX4rkQqpHti2BKyd8ZXYRUuqynWJm3ShNpoSyowT";
const newAddr = "9hfNCyqJsCSku8HXrV17Y6AaQciCAwkwx4M49imdWjRaTX22Mvz";
const auctionAddress = `5t19JGogcry9DRipPNcLs4mSnHYXQoqazPDMXXcdMixeH2mkgzMvWXjENsHRJzfHAFnTL5FBDHQCzBcnYg4CU1LcJZMmUXAaDcsKdgfBk4sE9BDbLt6Yxkjh6ow65HGCgxkwNAEArMAz8tqZL7GzKx4AvYVkqG3ExKggwDyVrvx7YzN8xeFtEUcnVkDKM8ow7YWW8eee2EidfYArPRd8fxQr5EuZVEiQbzKZ6m4xgtHfhsEptE3pNdt69F94gkytpounxBYpJPqfeZ8hVxLk8qaXTGFiJTDTt2p9D5ue4skZf4AGSLJyuzpMkjdifczQNc784ic1nbTAcjL3FKGHqnkaVwnCxU7go45X9ZFHwdpc6v67vFDoHzAAqypax4UFF1ux84X5G4xK5NFFjMZtvPyjqn2ErNXVgHBs2AkpngBPjnVRiN4sWkhR66NfBNpigU8PaTiB4Rim2FMZSXuyhRySCA1BV8ydVxz45T9VHqHA6WYkXp2ppAHmc29F8MrHX5Ew2x6amraFgvsdgAB3XiiEqEjRc83mhZVL1QgKi5CdeeGNYiXeCkxaRhG3j6r1JdAgzGDAQfN8sdRcEc1aYxbPfbqM1s81NFm7K1UmMUxrfCUp73poGAfV8FvQa2akyascKBaSCqvwuHW2ZP4oMoJHjZjTAgQjQF8cBNF9YLo6wXEtMQT5FYc3bHSgd4xZXCk2oHYjUSACW1Z5e7KZ3Qw1Sa2UvpMdWhbZ5Ncu99WT7v6nHFLJvHEPM7evr41nhCe9Yt3pAq4ee4rKCtEer4vQWq2b5UJSDXDj5VkVepQ5tmeXfXrBc42Yqucy6VeQSE7W66o4hQjwW1iN3yipmdTmpaAEASmbXwCxRSm7g4sNkfA969xo14PZQpBY3QUGqgCWoqJJVFWMhfvD53rzfgJpA4JH5B1fvY99q5iwbsAKdJfZi4fxub9QWZSNQfht4JqXMDmc6XTkWLE4VCxBRQYzF44H2E6mdf5EbZHUrpXj5c2VfC6PZGg9qmrz14aZjafM4M7kRTqMwVB8R9r7kXM1FWidGoprp2fRoJUALAKxKDSTVHX8ejT8zkSKJ5W45dSQjMe3WUDTeKhiy6Fqio2ukV8THaizTp6yZWxMVdu3a15pGBv1kmXZJEnLN9BsxyhnW2iGM7tvwK1jAneXeBH1uVdusR59j5ubCGKeoaS5ToC8Ky6wZ2iCyb2JF5CTvR4sMUg2ksmUm1dk8EoRjJ9i5gkqY`;
const auctionAddresses = [auctionAddress];
let auctions = [];
let nftStartIndex = 0;
let nftEndIndex = 12;
let loadMoreStep = 8;
const loadMore = document.createElement("button");
let popupObj;
loadMore.innerText = "More";
loadMore.classList.add("button", "even-button");
loadMore.id = "load-more";

//Explorer Vars
const explorerApi = 'https://api.ergoplatform.com/api/v0'
const explorerApiV1 = 'https://api.ergoplatform.com/api/v1'

window.onload = function () {
  getNFTsRaw(newAddr);
}

document.querySelector("#explorerToHome").onclick = function (event) {
  window.location = "../index.html";
};

document.querySelector("#searchButton").onclick = function (event) {
  getMetaData(document.querySelector("#searchBar").value);
};

// Scrolls user to the top of the page
const scrollToTop = () => {
  window.scrollTo(0, 0);
}

// Get every NFT able to be auctioned from the wallet 
const getNFTsRaw = async (walletAddress) => {
  await getActiveAuctions(walletAddress)
    .then(res => {
      nftsRaw = res;
      buildNFTList();
    });
}

// Get every single NFT that is currently able to be auctioned
const getAllNFTsRaw = async () => {
  await getAllActiveAuctions()
    .then(res => {
      nftsRaw = res;
      buildNFTList();
    });
}

// Build the list of NFTs currently able to be auctioned from the wallet, from the raw wallet data
const buildNFTList = async () => {
  for (let i = 0; i < nftsRaw.length - 1; i++) {
    nftsRaw[i].assets.forEach(async (i) => {
      await getMetaDataAll(i.tokenId);
    });
  }
  nftsLoaded = true;
  setTimeout(buildPage, 3000);
}

const displaySearchResults = (token) => {
  //00e1d1829103ebd7f875c07a8da8934583d1914fbf22960ff165019638a81def
  //c64c63c47c34a93f27fb2df2d79ed5df80b0a3e60e83269340bc1ade78442a66

  let container = document.getElementById("search-result");

  while (container.firstChild)
    container.removeChild(container.firstChild);


  if (token === "Error") {
    let errorMsg = document.createElement('h1');
    errorMsg.innerHTML = "NFT with TokenID not found or NFT does not belong to the CyberCitizens drop!";
    container.append(errorMsg);
  }

  let resultCard = document.createElement('div');
  let assetName = document.createElement('h2');
  let assetImage = document.createElement('img');
  let assetMetaData = JSON.parse(token.description[0].slice(1, token.description[0].length));

  let citizenNumber = Object.keys(assetMetaData['721']);
  let attributesRaw = assetMetaData['721'][citizenNumber]['traits'];
  let attributesKeys = Object.keys(assetMetaData['721'][citizenNumber]['traits']);
  let attributesComplete = [];

  attributes = buildAttributeArray(attributesKeys, attributesRaw);

  let attributeContainer = buildAttributeDisplay(attributes);

  assetImage.src = token.image;
  assetName.innerText = token.name;

  attributeContainer.classList.add("attribute-container"); // Add attribute class to individual attribute

  resultCard.classList.add("search-card");

  resultCard.append(assetName, assetImage, attributeContainer);
  container.append(resultCard);
}

const buildAttributeDisplay = (attributes) => {
  let container = document.createElement('div');

  attributes.forEach(att => {
    let attr = document.createElement('div');
    let content = document.createElement('p');

    if (att.rarity == undefined) att.rarity = "Not found";

    content.innerText = att.name + ":\n" + att.value + "\n(" + att.rarity + ")";

    attr.classList.add('attribute');
    attr.append(content);

    container.append(attr);
  });

  return container;
}

const buildAttributeArray = (keys, values) => {
  let arr = [];
  keys.forEach(key => {
    arr.push(createAttribute(key, values[key]));
  });
  return arr;
}

const createAttribute = (key, value) => {
  let rarity = getRarity(key, value);
  return {
    "name": key,
    "value": value,
    "rarity": rarity
  }
}

// Get the rarities of the attributes bg, clothes, eyes, gender, neck, skintone
const getRarity = (field, trait) => {
  try {
    return rarities['0']['traits'][field][trait];
  } catch {
    return undefined;
  }
}

// Build the html
const buildPage = () => {
  let container = document.getElementById("nft-container");

  if (container.contains(loadMore)) {
    container.removeChild(loadMore);
  }

  if (nftEndIndex > auctions.length) {
    nftEndIndex = auctions.length;
  }

  for (let i = nftStartIndex; i < nftEndIndex; i++) {
    let auctionCard = document.createElement('div');
    let assetName = document.createElement('h2');
    let assetImage = document.createElement('img');

    let metadata = "";
    getMetaDataForPopup(auctions[i].tokenId[0]).then(res => {
      document.querySelector(".popupNFT" + i).onclick = function () {
        showNFTModal(auctions[i].image, auctions[i].name, auctions[i].tokenId);
      }
    });

    assetImage.src = auctions[i].image;
    assetName.innerText = auctions[i].name;

    auctionCard.classList.add("auction-card");
    auctionCard.classList.add("popupNFT" + i);

    auctionCard.append(assetName);
    auctionCard.append(assetImage);
    container.append(auctionCard);

  }
  if (nftEndIndex != auctions.length) {
    nftStartIndex = nftEndIndex;
    nftEndIndex = nftStartIndex + loadMoreStep;

    container.append(loadMore);
    loadMore.addEventListener('click', loadMoreExplore);
  }
}

// Load the next section of NFTs
const loadMoreExplore = () => {
  buildPage(nftStartIndex, nftEndIndex);
}

// Show a popup of the NFT
const showNFTModal = (image, name, tokenId) => {
  let rawData;

  var modal = document.getElementById("explorerModal");
  let auctionCard = document.createElement("div");
  let assetName = document.createElement('h2');
  let assetImage = document.createElement('img');
  let otherCards = document.getElementsByClassName("auction-card");
  let exploreHeader = document.getElementById("explore-header");
  let searchContainer = document.querySelector(".search-container");
  let searchResult = document.querySelector("#search-result");
  let nftTokenId = document.createElement('h3');
  let exitButton = document.createElement('button');
  let footer = document.querySelector('footer');
  let userY = window.screenY;
  let userX = window.screenX;

  getMetaDataForPopup(tokenId).then(() => {
    rawData = toUtf8String(popupObj[0].additionalRegisters.R5).substr(2);

    let metadata = JSON.parse(rawData.slice(1, rawData.length));
    let citizenNumber = Object.keys(metadata['721']);
    let attributesRaw = metadata['721'][citizenNumber]['traits'];
    let attributesKeys = Object.keys(metadata['721'][citizenNumber]['traits']);

    let attributes = buildAttributeArray(attributesKeys, attributesRaw);

    let attributeContainer = buildAttributeDisplay(attributes);

    exploreHeader.style.display = "none";
    searchContainer.style.display = "none";
    searchResult.style.display = "none";
    footer.style.display = "none";
    loadMore.style.display = "none";

    while (modal.firstChild)
      modal.removeChild(modal.firstChild);

    for (let i = 0; i < otherCards.length; i++) {
      otherCards.item(i).style.display = "none";
    }


    assetImage.src = image;
    assetName.innerText = name;
    nftTokenId.innerText = tokenId;
    exitButton.innerText = "Close";
    exitButton.classList.add("button");
    exitButton.classList.add("exitButton");

    auctionCard.classList.add("auction-card-modal");
    attributeContainer.classList.add("auction-attribute-container")

    auctionCard.append(assetName);
    auctionCard.append(assetImage);
    auctionCard.append(nftTokenId);
    auctionCard.append(attributeContainer);
    auctionCard.append(exitButton);

    modal.append(auctionCard);

    modal.style.display = "block";

    nftTokenId.onclick = () => {
      copyToClipboard(tokenId);
    }

    exitButton.onclick = function () {
      modal.style.display = "none";
      for (let i = 0; i < otherCards.length; i++) {
        otherCards.item(i).style.display = "block";
      }
      exploreHeader.style.display = "block";
      searchContainer.style.display = "flex";
      searchResult.style.display = "flex";
      footer.style.display = "flex";
      loadMore.style.display = "block";
    }
  });
}

// Build an object from the res, used to clean up the getMetaData function
const createNFTObject = (res) => {
  return {
    "image": res.map((token) => {
      return resolveIpfs(toUtf8String(token.additionalRegisters.R9).substr(2));
    }),
    "name": res.map((token) => {
      return token.assets[0].name;
    }),
    "description": res.map((token) => {
      return toUtf8String(token.additionalRegisters.R5).substr(2);
    }),
    "tokenId": res.map((token) => {
      return token.assets[0].tokenId;
    })
  };
}

// Get the NFTs' metadata by using the ergoplatform explorer API
const getMetaDataAll = async (tokenId) => {
  await fetch(`https://api.ergoplatform.com/api/v0/assets/${tokenId}/issuingBox`)
    .then(res => res.json())
    .then(res => {
      auctions.push(createNFTObject(res));
    })
    .catch(error => console.log(error));
}

const getMetaDataForPopup = async (tokenId) => {
  await fetch(`https://api.ergoplatform.com/api/v0/assets/${tokenId}/issuingBox`)
    .then(res => res.json())
    .then(res => {
      popupObj = res;
    })
    .catch(error => console.log(error));
}

// Get the NFT's metadata by using the ergoplatform explorer API
const getMetaData = async (tokenId) => {
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
const resolveIpfs = (url) => {
  const ipfsPrefix = 'ipfs://'
  if (!url.startsWith(ipfsPrefix)) return url
  else return url.replace(ipfsPrefix, 'https://cloudflare-ipfs.com/ipfs/')
}

// Convert hex to utf8
const toUtf8String = (hex) => {
  if (!hex) {
    hex = ''
  }
  var str = '';
  for (var i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}

// Get active auctions from supplied address
const getActiveAuctions = (addr) => {
  return getRequest(`/boxes/unspent/byAddress/${addr}?limit=500`, explorerApiV1)
    .then(res => res.items)
    .then((boxes) => boxes.filter((box) => box.assets.length > 0));
}

// Get all active auctions from the supplied address
const getAllActiveAuctions = async () => {
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
const getUnconfirmedTxsFor = (addr) => {
  return getRequest(
    `/mempool/transactions/byAddress/${addr}`, explorerApiV1
  ).then((res) => res.items);
}

const getRequest = (url, api = explorerApi) => {
  return fetch(api + url).then(res => res.json())
}

const copyToClipboard = toCopy => {
  navigator.clipboard.writeText(toCopy);
  alert("Token ID copied to clipboard!");
}