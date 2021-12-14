import create from "../factory/factory.js"
import { getData } from "../utils/helpers/data.helpers.js"
import Modal from "../components/Modal.js"
import List from "../components/List.js"

class Photographer {
  constructor() {
    this.photographer = {}
    this.photographerId = parseInt(window.location.search.split("?id=")[1])

    this.medias
  }

  init = async () => {
    if (this.photographerId === NaN || !this.photographerId) this.redirect()

    this.photographer = await this.getPhotographer()
    this.medias = await this.getMedias()

    this.displayPhotographer()

    const list = new List()
    list.init(this.medias)

    new Modal().init(this.photographer)
    new Lightbox().init(this.medias)
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

  displayPhotographer = () => {
    const infoSection = document.querySelector(".infos__wrapper")
    const pageWrapper = document.querySelector(".app-photographer")

    infoSection.innerHTML = this.photographer.getInfos()
  }
}

export default Photographer
