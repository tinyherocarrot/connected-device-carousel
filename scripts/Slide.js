class Slide {
    // constructor(container, { headline, description, img, altText }) {
    constructor({ headline, description, img, altText }) {
        const newSlideItem = document.createElement("span");
        newSlideItem.classList.add("slide__item");

        this.container = newSlideItem;
        this.headline = headline;
        this.description = description;
        this.img = img;
        this.altText = altText;

        this.render();
    }
    render() {
        this.container.innerHTML = `
            <h3 class="slide__headline">${this.headline.toUpperCase()}</h3>
            <img src="${this.img}" alt="${this.altText}" class="slide__img">
            <p class="slide__description">${this.description.slice(0, 60)}...</p>
        `;
    }

    get html() {
        return this.container
    }
}

export default Slide;
