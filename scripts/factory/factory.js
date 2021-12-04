import Photographer from "./Photographer.js"

const factory = { Photographer }

const create = (type, attr) => {
  const Type = factory[type]

  return new Type(attr)
}

export default create
