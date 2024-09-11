import { Avatar, Link, Paper, Stack } from "@mui/material"
import { type FC } from "react"
import { Image } from "codeforlife/components"
import { LinkButton } from "codeforlife/components/router"
import { handleResultState } from "codeforlife/utils/api"

import { type SessionMetadata, useSessionMetadata } from "../app/hooks"
import CflLogoImage from "../images/cfl_logo.png"
import { LINK_CFL } from "../app/env"
import { useLogoutMutation } from "../api"
import { useRetrieveContributorQuery } from "../api/contributor"

const Profile: FC<SessionMetadata> = ({ contributor_id }) =>
  handleResultState(
    useRetrieveContributorQuery(contributor_id),
    contributor => (
      <LinkButton
        to={contributor.html_url}
        target="_blank"
        startIcon={
          <Avatar alt={contributor.name} src={contributor.avatar_url} />
        }
        sx={{
          margin: "0 auto",
          backgroundColor: "transparent",
          "&:hover": { backgroundColor: "transparent" },
        }}
      >
        {contributor.name}
      </LinkButton>
    ),
  )

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const [logout] = useLogoutMutation()
  const sessionMetadata = useSessionMetadata()

  return (
    <Paper sx={{ position: "sticky", top: 0, borderRadius: 0 }}>
      <Stack
        direction="row"
        marginTop={1}
        marginBottom={1}
        marginLeft={2}
        marginRight={2}
        alignItems="center"
      >
        <Image
          src={CflLogoImage}
          alt="code for life logo"
          maxWidth={{ xs: "65px", lg: "80px" }}
          onClick={() => {
            window.open(LINK_CFL, "_blank")
          }}
          style={{ cursor: "pointer" }}
        />
        {sessionMetadata && (
          <>
            <Profile {...sessionMetadata} />
            <Link
              onClick={() => {
                void logout(null)
              }}
            >
              Log out
            </Link>
          </>
        )}
      </Stack>
    </Paper>
  )
}

export default Header
