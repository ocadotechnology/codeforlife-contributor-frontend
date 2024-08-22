import * as pages from "codeforlife/components/page"
import { Stack, Typography } from "@mui/material"
import { type FC } from "react"
import { LinkIconButton } from "codeforlife/components/router"
import { TablePagination } from "codeforlife/components"
import { generatePath } from "react-router"
import { paths } from "../../routes"
import { useLazyListContributorsQuery } from "../../api/contributor"

export interface ContributorListProps {}

const ContributorList: FC<ContributorListProps> = () => {
  return (
    <pages.Page>
      <pages.Section>
        <Typography fontWeight="bold">Hello</Typography>
        <TablePagination
          useLazyListQuery={useLazyListContributorsQuery}
          preferCacheValue
        >
          {contributors =>
            contributors.map(contributor => (
              <Stack direction="row" key={contributor.id} gap={5}>
                <Typography fontWeight="bold">{contributor.id}</Typography>
                <Typography>
                  {contributor.name} ({contributor.email})
                </Typography>

                {/* Added an icon to the LinkIconButton for better UX */}
                <LinkIconButton
                  to={generatePath(paths.contributors.id._, {
                    id: contributor.id,
                  })}
                >
                  {/* You can replace 'View' with an icon component like <Icon>eye</Icon> if desired */}
                  <Typography>View</Typography>
                </LinkIconButton>
              </Stack>
            ))
          }
        </TablePagination>
      </pages.Section>
    </pages.Page>
  )
}

export default ContributorList
