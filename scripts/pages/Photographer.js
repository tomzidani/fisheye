import create from "../factory/factory.js"
import Lightbox from "../components/Lightbox.js"
import { getData } from "../utils/helpers/data.helpers.js"
import Modal from "../components/Modal.js"
import List from "../components/List.js"

class Photographer {
  constructor() {
    this.photographer = {}
    this.photographerId = parseInt(window.location.search.split("?id=")[1])

    this.medias

    this.init()
  }

  init = async () => {
    if (this.photographerId === NaN || !this.photographerId) this.redirect()

    this.photographer = await this.getPhotographer()
    this.medias = await this.getMedias()

    await this.displayPhotographer()
    document.title = `Fisheye – ${this.photographer.name}`

    new List(this.medias)
    new Modal(this.photographer)
    new Lightbox(this.medias)
  }

  redirect = () => {
    window.location.href = "./"
  }

  getPhotographer = async () => {
    const photographers = await getData("./scripts/provider/photographers.json")
    const photographer = photographers.photographers.find((p) => p.id === this.photographerId)

    if (!photographer) this.redirect()

    return create("Photographer", photographer)
  }

  getMedias = async () => {
    const allMedias = await getData("./scripts/provider/medias.json")
    const photographerMedias = allMedias.media.filter((m) => m.photographerId === this.photographerId)

    let medias = []

    photographerMedias.forEach((m) => medias.push(create("Media", m)))

    return medias
  }

  displayPhotographer = () => {
    return new Promise((resolve) => {
      const infoSection = document.querySelector(".infos__wrapper")
      const pageWrapper = document.querySelector(".app-photographer")
      const totalLikes = this.medias.reduce((a, b) => +a + +b.likes, 0)

      infoSection.innerHTML = this.photographer.getInfos()
      pageWrapper.innerHTML += this.photographer.getPricesAndLikes(totalLikes)

      resolve()
    })
  }
}

export default Photographer
