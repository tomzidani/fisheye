class Media {
  constructor({ id, photographerId, title, image, video, likes, date, price }) {
    this.id = id
    this.photographerId = photographerId
    this.title = title || ""
    this.image = image ? `./uploads/medias/${image}` : null
    this.video = video ? `./uploads/medias/${video}` : null
    this.fullImage = image ? `./uploads/medias/full/${image}` : null
    this.fullVideo = video ? `./uploads/medias/full/${video}` : null
    this.likes = likes
    this.date = date
    this.price = price
  }

  getMedia = () => {
    return this.video ? this.getVideo() : this.getPhoto()
  }

  getPhoto = () => {
    let photoEl = `<article class="media-card photo">`
    photoEl += `<div class="card__media"><img src="${this.image}" class="card__image" alt="${this.title}" /></div>`
    photoEl += `<div class="card__infos"><h3 class="card__title">${this.title}</h3><button class="card__likes">${this.likes}</button></div>`
    photoEl += `</article>`

    return photoEl
  }

  getVideo = () => {
    let videoEl = `<article class="media-card video">`
    videoEl += `<div class="card__media"><div class="card__overlay"></div>`
    videoEl += `<video class="card__video"><source src="${this.video}" type="video/webm"></video></div>`
    videoEl += `<div class="card__infos"><h3 class="card__title">${this.title}</h3><button class="card__likes">${this.likes}</button></div>`
    videoEl += `</article>`

    return videoEl
  }
}

export default Media
