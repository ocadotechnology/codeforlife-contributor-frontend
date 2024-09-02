import { type SessionMetadata } from "../app/hooks"

export type LoginWithGithubResult = SessionMetadata
export type LoginWithGithubArg = { code: string }

import api from "."

const sessionApi = api.injectEndpoints({
  endpoints: build => ({
    loginWithGithub: build.mutation<LoginWithGithubResult, LoginWithGithubArg>({
      query: body => ({
        url: "session/login/",
        method: "POST",
        body,
      }),
    }),
  }),
})

export const { useLoginWithGithubMutation } = sessionApi
export default sessionApi
