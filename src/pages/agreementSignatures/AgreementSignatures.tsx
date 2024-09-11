import * as pages from "codeforlife/components/page"
import { type FC } from "react"
import { handleResultState } from "codeforlife/utils/api"

import { type SessionMetadata, useSession } from "../../app/hooks"
import AgreementSignatureTable from "./AgreementSignatureTable"
import SignLatestAgreementForm from "./SignLatestAgreementForm"
import { useCheckSignedLatestAgreementSignatureQuery } from "../../api/agreementSignature"

const SignLatestAgreementFormSection: FC<SessionMetadata> = ({
  contributor_id,
}) =>
  handleResultState(
    useCheckSignedLatestAgreementSignatureQuery(null),
    ({ latest_commit_id, is_signed }) =>
      is_signed ? (
        <></>
      ) : (
        <pages.Section>
          <SignLatestAgreementForm
            contributor={contributor_id}
            agreementId={latest_commit_id}
          />
        </pages.Section>
      ),
  )

export interface AgreementSignaturesProps {}

const AgreementSignatures: FC<AgreementSignaturesProps> = () =>
  useSession(metadata => (
    <pages.Page>
      <pages.Banner header="Agreement Signatures" />
      <SignLatestAgreementFormSection {...metadata} />
      <pages.Section>
        <AgreementSignatureTable />
      </pages.Section>
    </pages.Page>
  ))

export default AgreementSignatures
