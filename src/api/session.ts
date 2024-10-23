import { buildLoginEndpoint } from "codeforlife/api/endpoints"

import { type SessionMetadata } from "../app/hooks"
import api from "."

export type LoginResult = SessionMetadata
export type LoginArg = { code: string }

const sessionApi = api.injectEndpoints({
  endpoints: build => ({
    login: buildLoginEndpoint<LoginResult, LoginArg>(build),
  }),
})

export default sessionApi
export const { useLoginMutation } = sessionApi
