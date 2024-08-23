import * as pages from "codeforlife/components/page"
import * as yup from "yup"
import { Stack, Typography } from "@mui/material"
// eslint-disable-next-line sort-imports
import { type FC } from "react"
import { Link } from "codeforlife/components/router"
import { handleQueryState } from "codeforlife/utils/api"
import { useParamsRequired } from "codeforlife/hooks"
// eslint-disable-next-line sort-imports
import { useLazyRetrieveAgreementSignatureQuery } from "../../api/agreementSignature"
import { useRetrieveContributorQuery } from "../../api/contributor"
// eslint-disable-next-line sort-imports
import { paths } from "../../routes"

export interface AgreementSignatureDetailProps {}

const AgreementSignatureDetail: FC<AgreementSignatureDetailProps> = () => {
  const [retrieveAgreementSignature, retrieveAgreementSignatureResult] =
    useLazyRetrieveAgreementSignatureQuery()

  const agreementSignature = retrieveAgreementSignatureResult.data
  const contributorId = agreementSignature?.contributor
  const { data: contributor } = useRetrieveContributorQuery(
    contributorId as number,
    { skip: !contributorId },
  )

  return useParamsRequired({
    shape: { id: yup.number().required().min(1) },
    children: () =>
      handleQueryState(retrieveAgreementSignatureResult, agreementSignature => (
        <pages.Page>
          <pages.Section>
            <Typography variant="h1">
              {contributor?.name || "..."} signature details
            </Typography>
            <Stack spacing={2}>
              <Typography variant="h6">
                Contributor name: {contributor?.name || "..."}
              </Typography>
              <Typography variant="h6">
                Agreement ID: {agreementSignature.agreement_id}
              </Typography>
              <Typography variant="h6">
                signed at: {agreementSignature.signed_at}
              </Typography>
            </Stack>
          </pages.Section>
          <pages.Section>
            <Link className="back-to" to={paths.agreementSignatures._}>
              Agreement signature list
            </Link>
          </pages.Section>
        </pages.Page>
      )),
    onValidationSuccess: params => {
      void retrieveAgreementSignature(params.id, true)
    },
    onValidationError: navigate => {
      navigate(paths.agreementSignatures._, {
        state: {
          notifications: [
            { props: { error: true, children: "Failed to get params" } },
          ],
        },
      })
    },
  })
}

export default AgreementSignatureDetail
