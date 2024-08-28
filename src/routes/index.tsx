import agreementSignature from "./agreementSignature"
import contributor from "./contributor"
import general from "./general"
import login from "./login"
import paths from "./paths"

const routes = (
  <>
    {general}
    {contributor}
    {agreementSignature}
    {login}
  </>
)

export default routes
export { paths }
