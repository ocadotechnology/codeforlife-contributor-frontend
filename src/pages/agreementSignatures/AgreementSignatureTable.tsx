import {
  Paper,
  type SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material"
import { type FC } from "react"
import { LinkIconButton } from "codeforlife/components/router"
import { OpenInNew as OpenInNewIcon } from "@mui/icons-material"
import { TablePagination } from "codeforlife/components"

import { LINK_GH_CONTRIBUTING } from "../../app/env"
import { useLazyListAgreementSignaturesQuery } from "../../api/agreementSignature"

export interface AgreementSignatureTableProps {}

const AgreementSignatureTable: FC<AgreementSignatureTableProps> = () => {
  const headCellSx: SxProps = { backgroundColor: "info.dark" }

  return (
    <>
      <Typography variant="h5">Signed agreements</Typography>
      <TablePagination
        useLazyListQuery={useLazyListAgreementSignaturesQuery}
        preferCacheValue
      >
        {(agreementSignatures, { count }) => (
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={headCellSx}>ID</TableCell>
                  <TableCell sx={headCellSx}>Signed at</TableCell>
                  <TableCell sx={headCellSx}>Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {count ? (
                  agreementSignatures.map(agreementSignature => (
                    <TableRow key={agreementSignature.id}>
                      <TableCell>{agreementSignature.agreement_id}</TableCell>
                      <TableCell>
                        {agreementSignature.signed_at.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="View agreement in new tab">
                          {/* div is required by tooltip's event listeners */}
                          <div>
                            <LinkIconButton
                              to={LINK_GH_CONTRIBUTING.replace(
                                "{commitId}",
                                agreementSignature.agreement_id,
                              )}
                              target="_blank"
                            >
                              <OpenInNewIcon />
                            </LinkIconButton>
                          </div>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3}>(No agreement signatures)</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </TablePagination>
    </>
  )
}

export default AgreementSignatureTable
