import { Route } from "react-router-dom"

import AgreementSignatureDetails from "../pages/agreementSignatureDetails/AgreementSignatureDetails"
import AgreementSignatureList from "../pages/agreementSignatureList/AgreementSignatureList"
import paths from "./paths"

const agreementSignature = (
  <>
    <Route
      path={paths.agreementSignatures.id._}
      element={<AgreementSignatureDetails />}
    />
    <Route
      path={paths.agreementSignatures._}
      element={<AgreementSignatureList />}
    />
  </>
)

export default agreementSignature
