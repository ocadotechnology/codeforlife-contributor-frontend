import { createApi } from "codeforlife/api"

const api = createApi({
  tagTypes: ["Contributor"],
})

export default api
export const { useLogoutMutation } = api
