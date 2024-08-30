import agreementSignature from "./agreementSignature"
import contributor from "./contributor"
import general from "./general"

const routes = (
  <>
    {general}
    {contributor}
    {agreementSignature}
  </>
)

export default routes
export { default as paths } from "./paths"
