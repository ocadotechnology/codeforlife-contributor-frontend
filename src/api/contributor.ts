import {
  type ListArg,
  type ListResult,
  type Model,
  type RetrieveArg,
  type RetrieveResult,
  buildUrl,
  modelUrls,
  tagData,
} from "codeforlife/utils/api"

import api from "."

export type Contributor = Model<
  number,
  {
    email: string
    name: string
    location: string
    html_url: string
    avatar_url: string
    last_login: Date
  }
>

const contributorUrls = modelUrls("contributors/", "contributors/<id>/")

export type RetrieveContributorResult = RetrieveResult<
  Contributor,
  "email" | "name" | "location" | "html_url" | "avatar_url" | "last_login"
>
export type RetrieveContributorArg = RetrieveArg<Contributor>

export type ListContributorsResult = ListResult<
  Contributor,
  "email" | "name" | "location" | "html_url" | "avatar_url" | "last_login"
>
export type ListContributorsArg = ListArg

const contributorApi = api.injectEndpoints({
  endpoints: build => ({
    retrieveContributor: build.query<
      RetrieveContributorResult,
      RetrieveContributorArg
    >({
      query: id => ({
        url: buildUrl(contributorUrls.detail, { url: { id } }),
        method: "GET",
      }),
      providesTags: tagData("Contributor"),
    }),
    listContributors: build.query<ListContributorsResult, ListContributorsArg>({
      query: search => ({
        url: buildUrl(contributorUrls.list, { search }),
        method: "GET",
      }),
      providesTags: tagData("Contributor", { includeListTag: true }),
    }),
  }),
})

export default contributorApi
export const {
  useRetrieveContributorQuery,
  useLazyRetrieveContributorQuery,
  useListContributorsQuery,
  useLazyListContributorsQuery,
} = contributorApi