import create from "../factory/factory.js"
import { getData } from "../utils/helpers/data.helpers.js"

class Home {
  constructor() {
    this.photographers = []
  }

  init = async () => {
    this.photographers = await this.getPhotographers()
    this.displayPhotographers()
  }

  getPhotographers = async () => {
    let photographers = []
    const photographersData = await getData("./scripts/provider/photographers.json")

    photographersData.photographers.forEach((p) => photographers.push(create("Photographer", p)))

    return photographers
  }

  displayPhotographers = async () => {
    const photographerSection = document.querySelector(".home__photographers")

    this.photographers.forEach((p) => (photographerSection.innerHTML += p.getCard()))
  }
}

export default new Home()
