import {
  type CreateArg,
  type CreateResult,
  type DestroyArg,
  type DestroyResult,
  type ListArg,
  type ListResult,
  type Model,
  type RetrieveArg,
  type RetrieveResult,
  type UpdateArg,
  type UpdateResult,
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
    last_login: string
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

export type CreateContributorResult = CreateResult<
  Contributor,
  "email" | "name" | "location" | "html_url" | "avatar_url" | "last_login"
>
export type CreateContributorArg = CreateArg<
  Contributor,
  "email" | "name" | "location" | "html_url" | "avatar_url" | "last_login"
>

export type UpdateContributorResult = UpdateResult<
  Contributor,
  "email" | "name" | "location" | "html_url" | "avatar_url" | "last_login"
>
export type UpdateContributorArg = UpdateArg<
  Contributor,
  never,
  "email" | "name" | "location" | "html_url" | "avatar_url" | "last_login"
>

export type DestroyContributorResult = DestroyResult
export type DestroyContributorArg = DestroyArg<Contributor>

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
    createContributor: build.mutation<
      CreateContributorResult,
      CreateContributorArg
    >({
      query: body => ({
        url: contributorUrls.list,
        method: "POST",
        body,
      }),
      invalidatesTags: tagData("Contributor", { includeListTag: true }),
    }),
    updateContributor: build.mutation<
      UpdateContributorResult,
      UpdateContributorArg
    >({
      query: ({ id, ...body }) => ({
        url: buildUrl(contributorUrls.detail, { url: { id } }),
        method: "PATCH",
        body,
      }),
      invalidatesTags: tagData("Contributor"),
    }),
    destroyContributor: build.mutation<
      DestroyContributorResult,
      DestroyContributorArg
    >({
      query: id => ({
        url: buildUrl(contributorUrls.detail, { url: { id } }),
        method: "DELETE",
      }),
      invalidatesTags: tagData("Contributor", { includeListTag: true }),
    }),
  }),
})

export default contributorApi
export const {
  useRetrieveContributorQuery,
  useLazyRetrieveContributorQuery,
  useListContributorsQuery,
  useLazyListContributorsQuery,
  useCreateContributorMutation,
  useUpdateContributorMutation,
  useDestroyContributorMutation,
} = contributorApi
