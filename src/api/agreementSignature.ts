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
  }),
})

export default agreementSignatureApi
export const {
  useRetrieveAgreementSignatureQuery,
  useLazyRetrieveAgreementSignatureQuery,
  useListAgreementSignaturesQuery,
  useLazyListAgreementSignaturesQuery,
} = agreementSignatureApi
