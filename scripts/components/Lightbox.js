class Lightbox {
  constructor() {
    this.lightbox = null

    this.medias = []
    this.currentMedia = {}
    this.currentMediaIndex = null
  }

  init = (medias) => {
    this.medias = medias

    this.displayLightbox()
    this.bindEvents()
  }

  bindEvents = () => {
    const close = this.lightbox.querySelector(".lightbox__close")
    const next = this.lightbox.querySelector(".lightbox__next")
    const previous = this.lightbox.querySelector(".lightbox__previous")

    close.addEventListener("click", this.closeLightbox)
    next.addEventListener("click", () => this.setMedia(this.currentMediaIndex + 1))
    previous.addEventListener("click", () => this.setMedia(this.currentMediaIndex - 1))
  }

  // Lightbox
  // --------
  displayLightbox = () => {
    const photographerPage = document.querySelector("main.app-photographer")

    let lightboxEl = `<div class="lightbox">`
    lightboxEl += `<div class="lightbox__previous"></div>`
    lightboxEl += `<div class="lightbox__media"></div>`
    lightboxEl += `<div class="lightbox__next"></div>`
    lightboxEl += `<div class="lightbox__close"></div>`
    lightboxEl += `</div>`

    photographerPage.innerHTML += lightboxEl

    this.lightbox = document.querySelector(".lightbox")
  }

  openLightbox = (media) => {
    const mediaIndex = [...media.parentElement.children].indexOf(media)

    this.setMedia(mediaIndex)
    this.lightbox.classList.add("opened")
  }

  closeLightbox = () => {
    this.lightbox.classList.remove("opened")
  }

  // Medias
  // ------
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

export default new Lightbox()
