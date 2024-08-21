import { Route } from "react-router-dom"

import ContributorDetail from "../pages/contributorDetail/ContributorDetail"
import ContributorList from "../pages/contributorList/ContributorList"
import paths from "./paths"

const fruit = (
  <>
    <Route path={paths.contributors.id._} element={<ContributorDetail />} />
    <Route path={paths.contributors._} element={<ContributorList />} />
  </>
)

export default fruit
