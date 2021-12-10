class Modal {
  constructor() {
    this.modal
    this.photographer
  }

  init = async (photographer) => {
    this.photographer = photographer
    this.modal = await this.display()

    this.bindEvents()
  }

  bindEvents = () => {
    const open = document.querySelector(".infos__button")
    const close = this.modal.querySelector(".modal__close")

    open.addEventListener("click", this.open)
    close.addEventListener("click", this.close)

    console.log(open, close)
  }

  display = () => {
    return new Promise((resolve) => {
      const wrapper = document.querySelector(".app-photographer")

      let modalEl = `<div class="photographer__modal"><div class="modal__wrapper">`
      modalEl += `<div class="modal__content">`
      modalEl += `<div class="modal__header"><h2 class="modal__title">Contactez-moi</h2>`
      modalEl += `<h2 class="modal__title">${this.photographer.name}</h2><div class="modal__close"></div></div>`
      modalEl += `<div class="modal__body">`
      modalEl += `<form class="app-form">`
      modalEl += `<div class="form__row"><label for="firstname">Prénom</label><input type="text" id="firstname" name="firstname" /></div>`
      modalEl += `<div class="form__row"><label for="lastname">Nom</label><input type="text" id="lastname" name="lastname" /></div>`
      modalEl += `<div class="form__row"><label for="email">E-mail</label><input type="email" id="email" name="email" /></div>`
      modalEl += `<div class="form__row"><label for="message">Votre message</label><textarea id="message" name="message" rows="5"></textarea></div>`
      modalEl += `<div class="form__row"><button class="btn modal__button">Envoyer</button></div>`
      modalEl += `</form>`
      modalEl += `</div></div></div>`

      wrapper.innerHTML += modalEl

      resolve(document.querySelector(".photographer__modal"))
    })
  }

  open = () => {
    this.modal.classList.add("opened")
  }

  close = () => {
    this.modal.classList.remove("opened")
  }
}

export default Modal
