class Lightbox {
  constructor(medias) {
    this.lightbox = document.querySelector('[data-component="lightbox"]')
    this.isLightboxOpen = false

    this.medias = medias
    this.currentMedia = {}
    this.currentMediaIndex

    this.init()
  }

  init = async () => {
    this.bindEvents()
  }

  bindEvents = () => {
    const list = document.querySelector('[data-component="list"]')
    const medias = document.querySelectorAll(".media-card .card__media")
    const close = document.querySelector(".lightbox__close")
    const next = document.querySelector(".lightbox__next")
    const previous = document.querySelector(".lightbox__previous")

    list.addEventListener("display", () => {
      document.querySelectorAll(".media-card .card__media").forEach((m) => {
        m.addEventListener("click", () => this.open(m.parentElement))
        m.addEventListener("keyup", (e) => e.key === "Enter" && this.open(m.parentElement))
      })
    })

    medias.forEach((m) => {
      m.addEventListener("click", () => this.open(m.parentElement))
      m.addEventListener("keyup", (e) => e.key === "Enter" && this.open(m.parentElement))
    })

    previous.addEventListener("click", () => this.setMedia(this.currentMediaIndex - 1))
    previous.addEventListener("keyup", (e) => e.key === "Enter" && this.setMedia(this.currentMediaIndex - 1))

    next.addEventListener("click", () => this.setMedia(this.currentMediaIndex + 1))
    next.addEventListener("keyup", (e) => e.key === "Enter" && this.setMedia(this.currentMediaIndex + 1))

    close.addEventListener("click", this.close)
    close.addEventListener("keyup", (e) => e.key === "Enter" && this.close)

    window.addEventListener("keyup", (e) => {
      if (this.isLightboxOpen) {
        e.key === "ArrowLeft" && this.setMedia(this.currentMediaIndex - 1)
        e.key === "ArrowRight" && this.setMedia(this.currentMediaIndex + 1)
        e.key === "Escape" && this.close()
      }
    })
  }

  open = (media) => {
    const mediaIndex = [...media.parentElement.children].indexOf(media)

    this.setMedia(mediaIndex)
    this.isLightboxOpen = true
    this.lightbox.classList.add("opened")
  }

  close = () => {
    this.isLightboxOpen = false
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

    mediaWrapper.setAttribute("aria-label", this.currentMedia.title)
    mediaWrapper.innerHTML += mediaEl + title
  }
}

export default Lightbox
