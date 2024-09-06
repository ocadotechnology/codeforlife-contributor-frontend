import { Route } from "react-router-dom"

import AgreementSignatureList from "../pages/agreementSignatureList/AgreementSignatureList"
import paths from "./paths"

const agreementSignature = (
  <>
    <Route
      path={paths.agreementSignatures._}
      element={<AgreementSignatureList />}
    />
  </>
)

export default agreementSignature
