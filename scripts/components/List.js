class List {
  constructor() {
    this.medias
    this.sort = "popularity"
  }

  init = async (medias) => {
    this.medias = medias

    this.sortList()
    this.bindEvents()
  }

  bindEvents = () => {
    const list = document.querySelector('[data-component="list"]')
    const sort = document.querySelector("select#sort")
    const likes = document.querySelectorAll("button.card__likes")

    list.addEventListener("sort", () => this.display())
    likes.forEach((l) => l.addEventListener("click", this.like))
    sort.addEventListener("change", this.sortList)
  }

  display = () => {
    const e = new Event("display")
    const listWrapper = document.querySelector('[data-component="list"]')

    this.reset()
    this.medias.forEach((m) => (listWrapper.innerHTML += m.getMedia()))
    listWrapper.dispatchEvent(e)
  }

  sortList = (e) => {
    const event = new Event("sort")
    const sort = e ? e.target.value : this.sort
    const list = document.querySelector('[data-component="list"]')

    switch (sort) {
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

    list.dispatchEvent(event)
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
