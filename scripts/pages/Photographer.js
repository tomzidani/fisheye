import create from "../factory/factory.js"
import Lightbox from "../components/Lightbox.js"
import { getData } from "../utils/helpers/data.helpers.js"
import Modal from "../components/Modal.js"

class Photographer {
  constructor() {
    this.photographer = {}
    this.photographerId = parseInt(window.location.search.split("?id=")[1])
  }

  init = async () => {
    if (this.photographerId === NaN || !this.photographerId) this.redirect()

    this.photographer = await this.getPhotographer()
    this.medias = await this.getMedias()

    this.displayPhotographer()

    Lightbox.init(this.medias)

    this.displayMedias()
    this.bindMediasEvents()

    Modal.init(this.photographer)
  }

  redirect = () => {
    window.location.href = "/"
  }

  getPhotographer = async () => {
    const photographers = await getData("./scripts/provider/photographers.json")
    const photographer = photographers.photographers.find((p) => p.id === this.photographerId)

    if (!photographer) this.redirect()

    return create("Photographer", photographer)
  }

  // Medias
  // ------
  getMedias = async () => {
    const allMedias = await getData("./scripts/provider/medias.json")
    const photographerMedias = allMedias.media.filter((m) => m.photographerId === this.photographerId)

    let medias = []

    photographerMedias.forEach((m) => medias.push(create("Media", m)))

    return medias
  }

  displayMedias = () => {
    const mediasSection = document.querySelector(".medias__list")

    this.medias.forEach((m) => (mediasSection.innerHTML += m.getMedia()))
  }

  bindMediasEvents = () => {
    const medias = document.querySelectorAll(".media-card .card__media")

    medias.forEach((m) => m.addEventListener("click", () => Lightbox.openLightbox(m.parentElement)))
  }

  displayPhotographer = () => {
    const infoSection = document.querySelector(".infos__wrapper")

    infoSection.innerHTML = this.photographer.getInfos()
  }
}

export default new Photographer()
