import { createApi } from "codeforlife/api"

const api = createApi({
  tagTypes: ["Contributor", "AgreementSignature"],
})

export default api
export const { useLogoutMutation } = api
