import { Navigate, Route } from "react-router-dom"

import agreementSignature from "./agreementSignature"
import general from "./general"
import paths from "./paths"

const routes = (
  <>
    {general}
    {agreementSignature}
    <Route path="*" element={<Navigate to={paths._} replace />} />
  </>
)

export default routes
export { default as paths } from "./paths"
