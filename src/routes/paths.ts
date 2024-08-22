import { path as _ } from "codeforlife/utils/router"

const paths = _("", {
  contributors: _("/contributors", {
    id: _("/:id"),
  }),
})

export default paths
