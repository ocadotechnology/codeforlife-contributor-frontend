import * as pages from "codeforlife/components/page"
import { Stack, Typography } from "@mui/material"
import { type FC } from "react"
import { LinkIconButton } from "codeforlife/components/router"
import { TablePagination } from "codeforlife/components"
import { generatePath } from "react-router"
import { paths } from "../../routes"
import { useLazyListAgreementSignaturesQuery } from "../../api/agreementSignature"

export interface AgreementSignatureListProps {}

const AgreementSignatureList: FC<AgreementSignatureListProps> = () => {
  return (
    <pages.Page>
      <pages.Section>
        <Typography variant="h1">Agreement Signature List</Typography>
        <TablePagination
          useLazyListQuery={useLazyListAgreementSignaturesQuery}
          preferCacheValue
        >
          {agreementSignatures => (
            <>
              <Stack direction="row" gap={5}>
                <Typography fontWeight="bold">ID</Typography>
                <Typography fontWeight="bold">
                  Contributor (Agreement ID)
                </Typography>
              </Stack>
              {agreementSignatures.map(agreementSignature => (
                <Stack direction="row" key={agreementSignature.id} gap={5}>
                  <Typography fontWeight="bold">
                    {agreementSignature.id}
                  </Typography>
                  <Typography>
                    {agreementSignature.contributor} (
                    {agreementSignature.agreement_id})
                  </Typography>
                  <LinkIconButton
                    to={generatePath(paths.agreementSignatures.id._, {
                      id: agreementSignature.id,
                    })}
                  >
                    <Typography>View</Typography>
                  </LinkIconButton>
                </Stack>
              ))}
            </>
          )}
        </TablePagination>
      </pages.Section>
    </pages.Page>
  )
}

export default AgreementSignatureList
