class Lightbox {
  constructor() {
    this.lightbox = document.querySelector('[data-component="lightbox"]')

    this.medias = []
    this.currentMedia = {}
    this.currentMediaIndex
  }

  init = async (medias) => {
    this.medias = medias

    this.bindEvents()
  }

  bindEvents = () => {
    const medias = document.querySelectorAll(".media-card .card__media")
    const close = document.querySelector(".lightbox__close")
    const next = document.querySelector(".lightbox__next")
    const previous = document.querySelector(".lightbox__previous")

    medias.forEach((m) => m.addEventListener("click", () => this.open(m.parentElement)))
    close.addEventListener("click", this.close)
    previous.addEventListener("click", () => this.setMedia(this.currentMediaIndex - 1))
    next.addEventListener("click", () => this.setMedia(this.currentMediaIndex + 1))
  }

  open = (media) => {
    const mediaIndex = [...media.parentElement.children].indexOf(media)

    this.setMedia(mediaIndex)
    this.lightbox.classList.add("opened")
  }

  close = () => {
    this.lightbox.classList.remove("opened")
  }

  setMedia = (i) => {
    if (i < 0) i = this.medias.length - 1
    if (i === this.medias.length) i = 0

    this.resetMedia()

    this.currentMediaIndex = i
    this.currentMedia = this.medias[i]

    this.displayMedia()
  }

  resetMedia = () => {
    const mediaWrapper = document.querySelector(".lightbox__media")

    mediaWrapper.innerHTML = ""
  }

  displayMedia = () => {
    const mediaWrapper = document.querySelector(".lightbox__media")

    const image = `<img src="${this.currentMedia.fullImage}" class="lightbox__image" alt="${this.currentMedia.title}" />`
    const video = `<video controls class="lightbox__video"><source src="${this.currentMedia.fullVideo}" type="video/webm"></video>`
    const title = `<h2 class="lightbox__title heading__subtitle">${this.currentMedia.title}</h2>`
    const mediaEl = this.currentMedia.video ? video : image

    mediaWrapper.innerHTML += mediaEl + title
  }
}

export default Lightbox
