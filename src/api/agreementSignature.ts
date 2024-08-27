import {
  type CreateArg,
  type CreateResult,
  type ListArg,
  type ListResult,
  type Model,
  type RetrieveArg,
  type RetrieveResult,
  buildUrl,
  modelUrls,
  tagData,
} from "codeforlife/utils/api"

import { type Contributor } from "./contributor"
import api from "."

export type AgreementSignature = Model<
  number,
  {
    contributor: number
    agreement_id: string
    signed_at: string
  }
>

const agreementSignatureUrls = modelUrls(
  "agreement-signatures/",
  "agreement-signatures/<id>/",
)

export type RetrieveAgreementSignatureResult = RetrieveResult<
  AgreementSignature,
  "contributor" | "agreement_id" | "signed_at"
>
export type RetrieveAgreementSignatureArg = RetrieveArg<AgreementSignature>

export type ListAgreementSignaturesResult = ListResult<
  AgreementSignature,
  "contributor" | "agreement_id" | "signed_at"
>
export type ListAgreementSignaturesArg = ListArg

export type CreateAgreementSignatureResult = CreateResult<
  AgreementSignature,
  "contributor" | "agreement_id" | "signed_at"
>
export type CreateAgreementSignatureArg = CreateArg<
  AgreementSignature,
  "contributor" | "agreement_id" | "signed_at"
>

export type CheckSignedAgreementSignatureResult =
  | { latest_commit_id: string; status: 404 | 451 }
  | { status: 200 }
export type CheckSignedAgreementSignatureArg = Pick<Contributor, "id">

const agreementSignatureApi = api.injectEndpoints({
  endpoints: build => ({
    retrieveAgreementSignature: build.query<
      RetrieveAgreementSignatureResult,
      RetrieveAgreementSignatureArg
    >({
      query: id => ({
        url: buildUrl(agreementSignatureUrls.detail, { url: { id } }),
        method: "GET",
      }),
      providesTags: tagData("AgreementSignature"),
    }),
    listAgreementSignatures: build.query<
      ListAgreementSignaturesResult,
      ListAgreementSignaturesArg
    >({
      query: search => ({
        url: buildUrl(agreementSignatureUrls.list, { search }),
        method: "GET",
      }),
      providesTags: tagData("AgreementSignature", { includeListTag: true }),
    }),
    createAgreementSignature: build.mutation<
      CreateAgreementSignatureResult,
      CreateAgreementSignatureArg
    >({
      query: body => ({
        url: agreementSignatureUrls.list,
        method: "POST",
        body,
      }),
      invalidatesTags: tagData("AgreementSignature", { includeListTag: true }),
    }),
    checkSignedAgreementSignature: build.mutation<
      CheckSignedAgreementSignatureResult,
      CheckSignedAgreementSignatureArg
    >({
      query: ({ id, ...body }) => ({
        url: buildUrl(agreementSignatureUrls.detail, { url: { id } }),
        method: "PUT",
        body,
      }),
    }),
  }),
})

export default agreementSignatureApi
export const {
  useRetrieveAgreementSignatureQuery,
  useLazyRetrieveAgreementSignatureQuery,
  useListAgreementSignaturesQuery,
  useLazyListAgreementSignaturesQuery,
  useCreateAgreementSignatureMutation,
  useCheckSignedAgreementSignatureMutation,
} = agreementSignatureApi
