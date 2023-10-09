const CoffeeShops = {
    render: () => {
        return `
        <section class="locations">
          <h2 class="lng">Our coffee-shop</h2>
          <div class="container-locations-slider">
            <div class="location wow animate__fadeInUp animate__slow">
              <div class="shop-name">
                <img src="./img/coffeshopicon.png">
                <p class="lng">Cafe Doza</p>
              </div>
              <img src="./img/coffeeshop3.jpg" class="shop-photo">
              <p class="shop-address lng">Radygiera, 11, Warsaw</p>
            </div>
          </div>
        </section>
        `
    }
}

export default CoffeeShops;