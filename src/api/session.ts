import { type SessionMetadata } from "../app/hooks"

export type LoginWithGitHubResult = SessionMetadata
export type LoginWithGitHubArg = { code: string }

import api from "."

const sessionApi = api.injectEndpoints({
  endpoints: build => ({
    loginWithGitHub: build.mutation<LoginWithGitHubResult, LoginWithGitHubArg>({
      query: body => ({
        url: "session/login/",
        method: "POST",
        body,
      }),
    }),
  }),
})

export default sessionApi
export const { useLoginWithGitHubMutation } = sessionApi
