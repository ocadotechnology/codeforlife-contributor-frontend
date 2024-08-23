import agreementSignature from "./agreementSignature"
import contributor from "./contributor"
import general from "./general"
import paths from "./paths"

const routes = (
  <>
    {general}
    {contributor}
    {agreementSignature}
  </>
)

export default routes
export { paths }
