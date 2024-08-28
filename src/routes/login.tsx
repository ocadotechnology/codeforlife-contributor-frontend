import { Route } from "react-router-dom"

import GitHub from "../pages/login/GitHub"
import paths from "./paths"

const login = (
  <>
    <Route path={paths.login._} element={<GitHub />} />
  </>
)

export default login
