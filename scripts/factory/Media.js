class Media {
  constructor({ id, photographerId, title, image, video, likes, date, price }) {
    this.id = id
    this.photographerId = photographerId
    this.title = title || ""
    this.image = image ? `./uploads/medias/${image}` : null
    this.video = video ? `./uploads/medias/${video}` : null
    this.likes = likes
    this.date = date
    this.price = price
  }

  getMedia = () => {
    let mediaEl = `<article class="picture-card"><div class="card__wrapper">`
    mediaEl += `<div class="card__media">`
    mediaEl += this.image
      ? `<img src="${this.image}" class="card__image" alt="${this.title}" />`
      : `<video class="card__video"><source src="${this.video}" type="video/webm"></video>`
    mediaEl += `</div>`
    mediaEl += `<div class="card__infos"><h3 class="card__title">${this.title}</h3><button class="card__likes">${this.likes}</button></div>`
    mediaEl += `</div></article>`

    return mediaEl
  }
}

export default Media
