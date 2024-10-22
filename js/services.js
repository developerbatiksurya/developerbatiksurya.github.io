const API_HERO = 'https://sheets.googleapis.com/v4/spreadsheets/1iJqfkCYlP-W1SFD9HgqfW2L-h3JNAb9euwI4M8gPRG8/values/HERO!A:D?key=AIzaSyDy-U4dxapqvqdpJYtAXfeEtQzcMT3eOK8'
const API_PRODUCT = 'https://sheets.googleapis.com/v4/spreadsheets/1iJqfkCYlP-W1SFD9HgqfW2L-h3JNAb9euwI4M8gPRG8/values/PRODUCTS!A:G?key=AIzaSyDy-U4dxapqvqdpJYtAXfeEtQzcMT3eOK8'

const fetchData = async (apiUrl) => {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.values; // Assuming 'values' is where the data resides
    } catch (error) {
        console.error('Fetch error:', error);
        return null; // Return null or handle it in some other way
    }
}


function chunkArray(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
}

function convertToRupiah(angka) {
    if (!angka) {
        return '0'
    }
    var rupiah = ''
    var angkarev = parseInt(angka.toString(), 0).toString().split('').reverse().join('')
    for (var i = 0; i < angkarev.length; i++) {
        if (i % 3 == 0) {
            rupiah += angkarev.substr(i, 3) + '.'
        }
    }
    return rupiah
        .split('', rupiah.length - 1)
        .reverse()
        .join('')
}

const productComponent = ({ id, name, desc, price, image, wa, shopee }) => {
    const onDetail = () => `product-detail.html?id=${id}`
    return `<div class="mt-product1 mt-paddingbottom20" style="margin-right: 8px;margin-left: 8px;">
                        <div class="box">
                            <div class="b1">
                                <div class="b2">
                                    <a href="${onDetail()}"><img
                                            src="${image}"
                                            style="width: 215px; height: 215px;"
                                            alt="image description"></a>
                                    <ul class="links">
                                        <li><a href="${onDetail()}"><i class="icon-handbag"></i><span>Buy Now</span></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="txt">
                            <strong class="title"><a href="${onDetail()}">${name}</a></strong>
                            <span class="price">Rp${convertToRupiah(price)}</span>
                        </div>
                    </div>`
}

const bannerComponent = ({ slug, h1, h2, image }) => {
    return `<div class="holder text-center" style="background-image: url(${image});">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="text centerize">
                                <strong class="title">FURNITURE DESIGNS IDEAS</strong>
                                <h1>${slug}</h1>
                                <h2>${h1}</h2>
                                <div class="txt">
                                    <p>${h2}</p>
                                </div>
                                <!--  <a href="product-detail.html" class="shop">shop now</a> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
}
