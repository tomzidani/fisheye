class Lightbox {
  constructor() {
    this.lightbox

    this.medias = []
    this.currentMedia = {}
    this.currentMediaIndex
  }

  init = (medias) => {
    this.medias = medias

    this.display()
    this.bindEvents()
  }

  bindEvents = () => {
    const close = this.lightbox.querySelector(".lightbox__close")
    const next = this.lightbox.querySelector(".lightbox__next")
    const previous = this.lightbox.querySelector(".lightbox__previous")

    close.addEventListener("click", this.close)
    previous.addEventListener("click", () => this.setMedia(this.currentMediaIndex - 1))
    next.addEventListener("click", () => this.setMedia(this.currentMediaIndex + 1))
  }

  display = () => {
    const wrapper = document.querySelector(".app-photographer")

    let lightboxEl = `<div class="lightbox">`
    lightboxEl += `<div class="lightbox__previous"></div>`
    lightboxEl += `<div class="lightbox__media"></div>`
    lightboxEl += `<div class="lightbox__next"></div>`
    lightboxEl += `<div class="lightbox__close"></div>`
    lightboxEl += `</div>`

    wrapper.innerHTML += lightboxEl

    this.lightbox = document.querySelector(".lightbox")
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

export default new Lightbox()
