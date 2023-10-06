const Map = {
    render: () => {
        return `
        <section class="maps">
          <img src="./img/coffee-shop-location-icon.png" class="maps-icon">
          <div class="map wow animate__fadeInUp animate__slow">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2442.0806188191127!2d20.97419517639512!3d52.26008105544097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecb4a069b2e0d%3A0xf35d0fa593c6e15e!2sDoza!5e0!3m2!1sru!2sby!4v1696189307559!5m2!1sru!2sby" width="700" height="470" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </section>
        `;
    }
}

export default Map;