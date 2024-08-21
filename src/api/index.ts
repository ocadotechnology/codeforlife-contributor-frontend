import { createApi } from "codeforlife/api"

const api = createApi({
  tagTypes: ["Fruit", "Contributor"],
})

export default api
export const { useLogoutMutation } = api
