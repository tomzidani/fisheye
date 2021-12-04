class Photographer {
  constructor({ id, name, city, country, tagline, price, portrait }) {
    this.id = id
    this.name = name
    this.city = city
    this.country = country
    this.tagline = tagline
    this.price = price
    this.portrait = `./uploads/photographers/${portrait}`
  }

  getCard = () => {
    let cardEl = `<article class="photographer-card"><div class="card__wrapper">`
    cardEl += `<a href="#">`
    cardEl += `<div class="card__media"><img src="${this.portrait}" alt="${this.name}" class="card__image" /></div>`
    cardEl += `<h2 class="card__title heading__title">${this.name}</h2>`
    cardEl += `</a>`
    cardEl += `<span class="card__country heading__subtitle">${this.country}</span>`
    cardEl += `<p class="card__tagline">${this.tagline}</p>`
    cardEl += `<span class="card__price">${this.price}&euro;/jour</span>`
    cardEl += `</div></article>`

    return cardEl
  }
}

export default Photographer
