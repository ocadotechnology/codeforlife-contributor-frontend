import { type SessionMetadata } from "../app/hooks"

const baseUrl = "session/"
export type LoginWithGithubResult = SessionMetadata
export type LoginWithGithubArg = { code: string }

import api from "."

const sessionApi = api.injectEndpoints({
  endpoints: build => ({
    loginWithGithub: build.mutation<LoginWithGithubResult, LoginWithGithubArg>({
      query: body => ({
        url: baseUrl + "login-into-github/",
        method: "POST",
        body,
      }),
    }),
  }),
})

export const { useLoginWithGithubMutation } = sessionApi
export default sessionApi
