import create from "../factory/factory.js"
import { getData } from "../utils/helpers/data.helpers.js"

class Photographer {
  constructor() {
    this.photographer = {}
    this.photographerId = parseInt(window.location.search.split("?id=")[1])

    this.modal = null
  }

  init = async () => {
    if (this.photographerId === NaN || !this.photographerId) this.redirect()

    this.photographer = await this.getPhotographer()
    this.pictures = await this.getPictures()

    this.displayPhotographer()
    this.displayPictures()

    this.initModal()

    console.log(this.pictures)
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

  getPictures = async () => {
    const allPictures = await getData("./scripts/provider/medias.json")
    const photographerPictures = allPictures.media.filter((m) => m.photographerId === this.photographerId)

    let pictures = []

    photographerPictures.forEach((p) => pictures.push(create("Media", p)))

    return pictures
  }

  displayPhotographer = () => {
    const infoSection = document.querySelector(".infos__wrapper")

    infoSection.innerHTML = this.photographer.getInfos()
  }

  displayPictures = () => {
    const picturesSection = document.querySelector(".pictures__body")

    this.pictures.forEach((p) => (picturesSection.innerHTML += p.getMedia()))
  }

  initModal = () => {
    this.modal = document.querySelector(".photographer__modal")

    const modalBtn = document.querySelector(".infos__button")
    const modalCloseBtn = document.querySelector(".modal__close")

    modalBtn.addEventListener("click", this.openModal)
    modalCloseBtn.addEventListener("click", this.closeModal)
  }

  openModal = () => {
    this.modal.classList.add("opened")
  }

  closeModal = () => {
    this.modal.classList.remove("opened")
  }
}

export default new Photographer()
