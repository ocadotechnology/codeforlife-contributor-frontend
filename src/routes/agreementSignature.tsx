import { Route } from "react-router-dom"

import AgreementSignatures from "../pages/agreementSignatures/AgreementSignatures"
import paths from "./paths"

const agreementSignature = (
  <>
    <Route
      path={paths.agreementSignatures._}
      element={<AgreementSignatures />}
    />
  </>
)

export default agreementSignature
