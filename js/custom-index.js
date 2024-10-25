const getImageHero = async () => {
    const heroData = await fetchData(API_HERO);
    if (heroData) {
        let html = ""
        heroData?.slice(1)?.forEach((row, index) => {
            const [slug, h1, h2, image] = row
            html += bannerComponent({ slug, h1, h2, image })
        });
        $("#banner-wrapper").html(`
            <div class="mt-main-slider">
                <div class="slider banner-slider">
                    ${html}
                </div>
            </div>
        `);
        initSlickSlider()
    } else {
        console.log('No hero to display.');
    }
}

const getProductsList = async () => {
    const heroData = await fetchData(API_PRODUCT);
    if (heroData) {
        let html = ""
        // chunkArray(heroData?.slice(1), 2)?.forEach((row, index) => {
        heroData?.slice(1)?.forEach((row, index) => {
            // html += `<div class="slide">`;
            // row.forEach(row2 => {
            const [id, name, desc, price, image, wa, shopee] = row
            html += productComponent({ id, name, desc, price, image, wa, shopee })
            // })
            // html += `</div>`;
        });
        $("#product-wrapper").html(html);

    } else {
        console.log('No product to display.');
    }
}
const get3Item = async () => {
    const heroData = await fetchData(API_3_PRODUCT);
    if (heroData) {
        let html = ""
        heroData?.slice(1)?.forEach((row, index) => {
            const [title, image] = row
            html += threeComponent({ title, image })
        });
        $("#wrap-3-item").html(html);
    } else {
        console.log('No hero to display.');
    }
}

// Run when the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    getImageHero();
    getProductsList()
    get3Item()
});