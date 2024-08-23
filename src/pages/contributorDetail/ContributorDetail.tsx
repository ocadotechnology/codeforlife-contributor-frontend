import * as pages from "codeforlife/components/page"
import * as yup from "yup"
import { Stack, Typography } from "@mui/material"
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
            <Typography variant="h1">{contributor.name} details</Typography>
            <Stack spacing={2}>
              <Typography variant="h6">Name: {contributor.name}</Typography>
              <Typography variant="h6">Email: {contributor.email}</Typography>
              {contributor.location && (
                <Typography variant="h6">
                  Location: {contributor.location}
                </Typography>
              )}
              <Typography variant="h6">
                html_url: {contributor.html_url}
              </Typography>
              <Typography variant="h6">
                avatar_url: {contributor.avatar_url}
              </Typography>
            </Stack>
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
