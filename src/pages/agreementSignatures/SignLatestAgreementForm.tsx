import * as forms from "codeforlife/components/form"
import { FormHelperText, Stack, Typography } from "@mui/material"
import { type FC } from "react"
import { Link } from "codeforlife/components/router"
import { PriorityHigh as PriorityHighIcon } from "@mui/icons-material"
import { submitForm } from "codeforlife/utils/form"

import { type AgreementSignature } from "../../api/agreementSignature"
import { LINK_GH_CONTRIBUTING } from "../../app/env"
import { useCreateAgreementSignatureMutation } from "../../api/agreementSignature"

export interface SignLatestAgreementFormProps {
  agreementId: AgreementSignature["agreement_id"]
  onSign: () => void
}

const SignLatestAgreementForm: FC<SignLatestAgreementFormProps> = ({
  agreementId,
  onSign,
}) => {
  const [createAgreementSignature] = useCreateAgreementSignatureMutation()

  return (
    <>
      <Typography color="error.main" variant="h5">
        You have not signed the latest agreement!
      </Typography>
      <FormHelperText>
        You cannot make any contributions until you agree to our latest terms.
        <br />
        (ID: {agreementId})
      </FormHelperText>
      <forms.Form
        initialValues={{
          read_and_understood: false,
          agreement_id: agreementId,
          // Placeholder for when the agreement was signed at.
          signed_at: new Date(),
        }}
        onSubmit={submitForm(createAgreementSignature, {
          exclude: ["read_and_understood"],
          // Set the actual date-time the agreement was signed at.
          clean: values => ({ ...values, signed_at: new Date() }),
          then: onSign,
        })}
      >
        <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
          <forms.CheckboxField
            name="read_and_understood"
            required
            formControlLabelProps={{
              label: (
                <>
                  I have read and understood the{" "}
                  <Link
                    to={LINK_GH_CONTRIBUTING.replace("{commitId}", agreementId)}
                    target="_blank"
                  >
                    latest agreement
                  </Link>
                  .
                </>
              ),
            }}
          />
          <forms.SubmitButton
            className="alert"
            startIcon={<PriorityHighIcon />}
          >
            Sign agreement
          </forms.SubmitButton>
        </Stack>
      </forms.Form>
    </>
  )
}

export default SignLatestAgreementForm
