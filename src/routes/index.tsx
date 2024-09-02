import agreementSignature from "./agreementSignature"
import general from "./general"

const routes = (
  <>
    {general}
    {agreementSignature}
  </>
)

export default routes
export { default as paths } from "./paths"
