import Photographer from "./Photographer.js"
import Media from "./Media.js"

const factory = { Photographer, Media }

const create = (type, attr) => {
  const Type = factory[type]

  return new Type(attr)
}

export default create
