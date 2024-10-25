const getProductsList = async () => {
    const heroData = await fetchData(API_PRODUCT);
    if (heroData) {
        let html = ""
        heroData?.slice(1, 5)?.forEach((row, index) => {
            const [id, name, desc, price, image, wa, shopee] = row
            html += productComponent({ id, name, desc, price, image, wa, shopee })
        });
        $("#product-wrapper").html(html);

        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get('id')
        const detail = heroData.find(e => e[0] === idParam)
        if (!!detail) {
            const [id, name, desc, price, image, wa, shopee] = detail
            $("#title-detail").text(name);
            $("#desc-detail").text(desc);
            $("#price-detail").text("Rp" + convertToRupiah(price));
            $("#img-detail").attr("src", image);
            $("#btn-wa").attr("href", wa);
            $("#btn-shopee").attr("href", shopee);
        } else {
            $("#product-info-wrapper").html(emptyComponent());
        }
    } else {
        console.log('No product to display.');
    }
}

// Run when the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    getProductsList()
});