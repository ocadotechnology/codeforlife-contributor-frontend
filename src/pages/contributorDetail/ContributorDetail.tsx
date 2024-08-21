import * as forms from "codeforlife/components/form"
import * as pages from "codeforlife/components/page"
import * as yup from "yup"
import { Typography } from "@mui/material"
// eslint-disable-next-line sort-imports
import { type FC } from "react"
import { Link } from "codeforlife/components/router"
import { handleQueryState } from "codeforlife/utils/api"
import { useParamsRequired } from "codeforlife/hooks"
// eslint-disable-next-line sort-imports
import { useLazyRetrieveContributorQuery } from "../../api/contributor"
// eslint-disable-next-line sort-imports
import { paths } from "../../routes"

export interface ContributorDetailProps {}

const ContributorDetail: FC<ContributorDetailProps> = () => {
  const [retrieveContributor, retrieveContributorResult] =
    useLazyRetrieveContributorQuery()

  return useParamsRequired({
    shape: { id: yup.number().required().min(1) },
    children: () =>
      handleQueryState(retrieveContributorResult, contributor => (
        <pages.Page>
          <pages.Section>
            <Typography variant="h1">Update fruit</Typography>
            <forms.Form
              initialValues={contributor}
              onSubmit={alert}
            ></forms.Form>
          </pages.Section>
          <pages.Section>
            <Link className="back-to" to={paths.contributors._}>
              Contributor list
            </Link>
          </pages.Section>
        </pages.Page>
      )),
    onValidationSuccess: params => {
      void retrieveContributor(params.id, true)
    },
    onValidationError: navigate => {
      navigate(paths.contributors._, {
        state: {
          notifications: [
            { props: { error: true, children: "Failed to get params" } },
          ],
        },
      })
    },
  })
}

export default ContributorDetail
