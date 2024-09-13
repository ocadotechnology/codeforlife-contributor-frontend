import * as pages from "codeforlife/components/page"
import { type FC, useEffect } from "react"
import { handleResultState } from "codeforlife/utils/api"

import AgreementSignatureTable from "./AgreementSignatureTable"
import SignLatestAgreementForm from "./SignLatestAgreementForm"
import { useLazyCheckSignedLatestAgreementSignatureQuery } from "../../api/agreementSignature"
import { useSession } from "../../app/hooks"

const SignLatestAgreementFormSection: FC = () => {
  const [checkSignedLatestAgreementSignature, result] =
    useLazyCheckSignedLatestAgreementSignatureQuery()

  useEffect(() => {
    void checkSignedLatestAgreementSignature(null)
  }, [checkSignedLatestAgreementSignature])

  return handleResultState(result, ({ latest_commit_id, is_signed }) =>
    is_signed ? (
      <></>
    ) : (
      <pages.Section>
        <SignLatestAgreementForm
          agreementId={latest_commit_id}
          onSign={() => {
            void checkSignedLatestAgreementSignature(null)
          }}
        />
      </pages.Section>
    ),
  )
}

export interface AgreementSignaturesProps {}

const AgreementSignatures: FC<AgreementSignaturesProps> = () =>
  useSession(() => (
    <pages.Page>
      <pages.Banner header="Agreement Signatures" />
      <SignLatestAgreementFormSection />
      <pages.Section>
        <AgreementSignatureTable />
      </pages.Section>
    </pages.Page>
  ))

export default AgreementSignatures
