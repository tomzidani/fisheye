import Route from "./Route.js"

import Home from "./pages/Home.js"
import Photographer from "./pages/Photographer.js"

Route.set("photographer", Photographer)
Route.set("/", Home)

Route.get()
