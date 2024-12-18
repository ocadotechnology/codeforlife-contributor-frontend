import {
  createApi as _createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react"

import { SERVICE_API_URL } from "codeforlife/settings"
import { buildLogoutEndpoint } from "codeforlife/api/endpoints/session"
import defaultTagTypes from "codeforlife/api/tagTypes"
import { getCsrfCookie } from "codeforlife/utils/auth"

function createApi<TagTypes extends string = never>({
  tagTypes = [],
}: {
  tagTypes?: readonly TagTypes[]
} = {}) {
  const fetch = fetchBaseQuery({
    baseUrl: `${SERVICE_API_URL}/`,
    credentials: "include",
    prepareHeaders: (headers, { type }) => {
      if (type === "mutation") {
        const csrfToken = getCsrfCookie()
        if (csrfToken) headers.set("csrftoken", csrfToken)
      }

      return headers
    },
  })

  const api = _createApi({
    // https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#implementing-a-custom-basequery
    baseQuery: async (args, api, extraOptions) => {
      if (api.type === "mutation" && getCsrfCookie() === undefined) {
        // Get the CSRF token.
        const { error } = await fetch(
          { url: "/csrf/cookie", method: "GET" },
          api,
          {},
        )

        // Validate we got the CSRF token.
        if (error !== undefined) {
          console.error(error)
          // TODO
          // window.location.href = `${PORTAL_BASE_URL}/error/500`
        }
        if (getCsrfCookie() === undefined) {
          // TODO
          // window.location.href = `${PORTAL_BASE_URL}/error/500`
        }
      }

      // Send the HTTP request and fetch the response.
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return await fetch(args, api, extraOptions)
    },
    tagTypes: [...defaultTagTypes, ...tagTypes],
    endpoints: () => ({}),
  })

  return api.injectEndpoints({
    endpoints: build => ({
      logout: buildLogoutEndpoint<null, null>(api, build),
    }),
  })
}

const api = createApi({
  tagTypes: ["Contributor", "AgreementSignature"],
})

export default api
export const { useLogoutMutation } = api
