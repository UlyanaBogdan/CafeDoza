const DrinkDiv = {
    render: (title, image) => {
        return `
        <div class="drink-container wow animate__zoomIn animate__slow">
            <h3 class="drink-title lng">${title}</h3>
            <img src="${image}" class="drink-img lng" alt="${title}">
        </div>
        `;
    }
}

export default DrinkDiv;