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

import api from "."

export type AgreementSignature = Model<
  number,
  {
    contributor: number
    agreement_id: string
    signed_at: Date
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

export type CheckSignedLatestAgreementSignatureResult = {
  latest_commit_id: string
  is_signed: boolean
  reason: "" | "no_agreement_signatures" | "old_agreement_signatures"
}
export type CheckSignedLatestAgreementSignatureArg = null

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
    checkSignedLatestAgreementSignature: build.query<
      CheckSignedLatestAgreementSignatureResult,
      CheckSignedLatestAgreementSignatureArg
    >({
      query: () => ({
        url: agreementSignatureUrls.list + "check-signed-latest",
        method: "GET",
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
  useCheckSignedLatestAgreementSignatureQuery,
} = agreementSignatureApi
