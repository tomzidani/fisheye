class List {
  constructor(medias) {
    this.medias = medias
    this.sort = "popularity"

    this.init()
  }

  init = async () => {
    await this.display(this.sort)
    this.bindEvents()
  }

  bindEvents = () => {
    const list = document.querySelector('[data-component="list"]')
    const sort = document.querySelector("select#sort")
    const likes = document.querySelectorAll("button.card__likes")

    likes.forEach((l) => l.addEventListener("click", this.like))

    list.addEventListener("display", () => {
      const likes = document.querySelectorAll("button.card__likes")

      likes.forEach((l) => l.addEventListener("click", this.like))
    })

    sort.addEventListener("change", async (e) => await this.display(e.target.value))
  }

  display = (sort) => {
    return new Promise((resolve) => {
      const e = new Event("display")
      const listWrapper = document.querySelector('[data-component="list"]')

      this.sort = sort || this.sort
      this.sortList()

      this.reset()
      this.medias.forEach((m) => (listWrapper.innerHTML += m.getMedia()))

      listWrapper.dispatchEvent(e)

      resolve()
    })
  }

  sortList = () => {
    switch (this.sort) {
      case "popularity":
      default:
        this.medias = this.medias.sort((a, b) => (a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0))
        break

      case "date":
        this.medias = this.medias.sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0))
        break

      case "title":
        this.medias = this.medias.sort((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0))
        break
    }
  }

  like = (e) => {
    const btn = e.target

    btn.classList.contains("liked") ? btn.textContent-- && btn.classList.remove("liked") : btn.textContent++ && btn.classList.add("liked")
  }

  reset = () => {
    const listWrapper = document.querySelector('[data-component="list"]')

    listWrapper.innerHTML = ""
  }
}

export default List
