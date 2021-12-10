// Route
// -----
class Route {
  constructor() {
    this.routes = []
  }

  set = (path, Page) => {
    this.routes.push({ path, Page })
  }

  get = () => {
    for (const r of this.routes) {
      if (window.location.pathname.includes(r.path)) return new r.Page().init()
    }
  }
}

export default new Route()
