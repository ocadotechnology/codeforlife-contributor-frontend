import { type SessionMetadata } from "../app/hooks"

export type LoginResult = SessionMetadata
export type LoginArg = { code: string }

import api from "."

const sessionApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<LoginResult, LoginArg>({
      query: body => ({
        url: "session/login/",
        method: "POST",
        body,
      }),
    }),
  }),
})

export default sessionApi
export const { useLoginMutation } = sessionApi
