
const cheerio = require('cheerio-without-node-native');

function amazonUrlBuilder(keywords) {
    let amazonBaseURL = 'https://www.amazon.ca/s?k=';
    const keywordArray = keywords.split(' ');
    for (let i = 0; i < keywordArray.length; i++) {
        amazonBaseURL += keywordArray[i];
        if (i < keywordArray.length - 1) {
            amazonBaseURL += '+'
        }
      }
    return amazonBaseURL;
}

export async function performSearch(keywords) {
    let searchData = [];
    console.log("keywords", keywords);
    let amazonBaseURL = amazonUrlBuilder(keywords);
    // console.log(amazonBaseURL)
    try {
        const response = await fetch(amazonBaseURL);      // fetch page 
        const htmlString = await response.text();  // get response text
        const $ = cheerio.load(htmlString);
        
        $('div.s-result-item').each((idx, node) => {
            if ($('span.a-price-whole', node).text()) {
                // console.log($("img.s-image", node)["0"]["attribs"]["src"]);
                searchData.push({
                    key: idx,
                    title: $('span.a-text-normal', node).text(),
                    description: $('div.a-color-secondary', node).text(),
                    priceInt: $('span.a-price-whole', node).text(),
                    priceDec: $('span.a-price-fraction', node).text(),
                    imageURL: $("img.s-image", node)["0"]["attribs"]["src"],
                    ASIN: node.attribs['data-asin']
                })
            }                                        
        });

        return searchData;
    } catch (e) {
        console.log("Error searching for new product", e);
    }
}

export function ASINUrlBuilder(ASIN) {
     return 'https://www.amazon.ca/dp/' + ASIN;
}

export async function fetchPriceByASIN(ASIN) {
    const ASINUrl = ASINUrlBuilder(ASIN);

    try {
        const response = await fetch(ASINUrl); // fetch page 
        const htmlString = await response.text(); // get response text
        // console.log(htmlString);
        const $ = cheerio.load(htmlString);
        
        if ($('span.a-price-whole') && $('span.a-price-fraction')) {
                const priceInt = $('span.a-price-whole').first().text()
                const priceDec = $('span.a-price-fraction').first().text();
                const fullPrice = priceInt + '' + priceDec;
                console.log(fullPrice);
                return fullPrice
        } else {
            console.log("Was not able to find the price from website for item " + ASIN);
        }                                      
    } catch (e) {
        console.log("Error searching for new product", e);
    }

}



