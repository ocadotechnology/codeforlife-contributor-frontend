import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { type FC } from "react"
import { LinkIconButton } from "codeforlife/components/router"
import { OpenInNew as OpenInNewIcon } from "@mui/icons-material"
import { TablePagination } from "codeforlife/components"

import { LINK_GH_CONTRIBUTING } from "../../app/env"
import { useLazyListAgreementSignaturesQuery } from "../../api/agreementSignature"

export interface AgreementSignatureTableProps {}

const AgreementSignatureTable: FC<AgreementSignatureTableProps> = () => {
  return (
    <TablePagination
      useLazyListQuery={useLazyListAgreementSignaturesQuery}
      preferCacheValue
    >
      {agreementSignatures => (
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Signed at</TableCell>
                <TableCell>Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agreementSignatures.map(agreementSignature => (
                <TableRow key={agreementSignature.id}>
                  <TableCell>{agreementSignature.agreement_id}</TableCell>
                  <TableCell>
                    {agreementSignature.signed_at.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <LinkIconButton
                      to={LINK_GH_CONTRIBUTING.replace(
                        "{commitId}",
                        agreementSignature.agreement_id,
                      )}
                      target="_blank"
                    >
                      <OpenInNewIcon />
                    </LinkIconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </TablePagination>
  )
}

export default AgreementSignatureTable
