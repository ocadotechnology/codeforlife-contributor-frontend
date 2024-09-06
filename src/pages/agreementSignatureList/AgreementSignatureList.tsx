import * as pages from "codeforlife/components/page"
import { type FC } from "react"

import AgreementSignatureTable from "./AgreementSignatureTable"
import SignLatestAgreementForm from "./SignLatestAgreementForm"
import { useSession } from "../../app/hooks"

export interface AgreementSignatureListProps {}

const AgreementSignatureList: FC<AgreementSignatureListProps> = () => {
  const signedLatestAgreement = false // TODO: call endpoint
  const latestAgreementId = "" // TODO: call endpoint

  return useSession(({ contributor_id }) => (
    <pages.Page>
      <pages.Banner header="Agreement Signatures" />
      {!signedLatestAgreement && (
        <pages.Section>
          <SignLatestAgreementForm
            contributor={contributor_id}
            agreementId={latestAgreementId}
          />
        </pages.Section>
      )}
      <pages.Section>
        <AgreementSignatureTable />
      </pages.Section>
    </pages.Page>
  ))
}

export default AgreementSignatureList
