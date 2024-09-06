import * as forms from "codeforlife/components/form"
import { type FC } from "react"
import { Link } from "codeforlife/components/router"
import { PriorityHigh as PriorityHighIcon } from "@mui/icons-material"
import { Typography } from "@mui/material"
import { submitForm } from "codeforlife/utils/form"

import { type AgreementSignature } from "../../api/agreementSignature"
import { type Contributor } from "../../api/contributor"
import { LINK_GH_CONTRIBUTING } from "../../app/env"
import { useCreateAgreementSignatureMutation } from "../../api/agreementSignature"

export interface SignLatestAgreementFormProps {
  contributor: Contributor["id"]
  agreementId: AgreementSignature["agreement_id"]
}

const SignLatestAgreementForm: FC<SignLatestAgreementFormProps> = ({
  contributor,
  agreementId,
}) => {
  const [createAgreementSignature] = useCreateAgreementSignatureMutation()

  return (
    <>
      <Typography color="error.main">
        You have not signed the latest agreement!
      </Typography>
      <forms.Form
        initialValues={{
          read_and_understood: false,
          contributor,
          agreement_id: agreementId,
          signed_at: new Date(),
        }}
        onSubmit={submitForm(createAgreementSignature, {
          exclude: ["read_and_understood"],
          clean: values => ({ ...values, signed_at: new Date() }),
        })}
      >
        <forms.CheckboxField
          name="read_and_understood"
          required
          formControlLabelProps={{
            label: (
              <>
                I have read and understood the{" "}
                <Link
                  to={LINK_GH_CONTRIBUTING.replace("{commitId}", agreementId)}
                >
                  agreement
                </Link>
                .
              </>
            ),
          }}
        />
        <forms.SubmitButton className="alert" startIcon={<PriorityHighIcon />}>
          Sign agreement
        </forms.SubmitButton>
      </forms.Form>
    </>
  )
}

export default SignLatestAgreementForm
