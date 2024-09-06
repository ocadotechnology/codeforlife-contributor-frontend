import { path as _ } from "codeforlife/utils/router"

const paths = _("", {
  contributors: _("/contributors", {
    id: _("/:id"),
  }),
  agreementSignatures: _("/agreement-signatures"),
})

export default paths
