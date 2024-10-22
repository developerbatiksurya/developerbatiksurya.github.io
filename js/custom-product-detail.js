const getProductsList = async () => {
    const heroData = await fetchData(API_PRODUCT);
    if (heroData) {
        let html = ""
        heroData?.slice(1, 6)?.forEach((row, index) => {
            const [id, name, desc, price, image, wa, shopee] = row
            html += productComponent({ id, name, desc, price, image, wa, shopee })
        });
        $("#product-wrapper").html(html);

        // const fullPath = window.location.pathname;
        // const pathParts = fullPath.split('/');
        // const idParam = pathParts[pathParts.length - 1];
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get('id');   // Output: "30"
        console.log(urlParams, 'urlParams');
        const [id, name, desc, price, image, wa, shopee] = heroData.find(e => e[0] === idParam)
        $("#title-detail").text(name);
        $("#desc-detail").text(desc);
        $("#price-detail").text("Rp" + convertToRupiah(price));
        $("#img-detail").attr("src", image);
        $("#btn-wa").attr("href", wa);
        $("#btn-shopee").attr("href", shopee);
    } else {
        console.log('No product to display.');
    }
}

// Run when the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    getProductsList()
});