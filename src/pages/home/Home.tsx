import * as pages from "codeforlife/components/page"
import { CircularProgress, Stack, Typography } from "@mui/material"
import { type FC, useCallback } from "react"
import { GitHub as GitHubIcon } from "@mui/icons-material"
import { Image } from "codeforlife/components"
import { LinkButton } from "codeforlife/components/router"
import { type OAuth2ReceiveCodeUrlSearchParams } from "codeforlife/utils/auth"
import { useNavigate } from "codeforlife/hooks/router"
import { useOAuth2 } from "codeforlife/hooks"

import {
  GH_AUTH_URI,
  GH_CLIENT_ID,
  GH_REDIRECT_URI,
  GH_SCOPE,
  LINK_CFL,
} from "../../app/settings"
import CflLogoImage from "../../images/cfl_logo.png"
import { paths } from "../../routes"
import { useLoginMutation } from "../../api/session"
import { useSessionMetadata } from "../../app/hooks"

export interface HomeState extends Partial<OAuth2ReceiveCodeUrlSearchParams> {}

export interface HomeProps {}

// TODO: make leaderboard the home page.
const Home: FC<HomeProps> = () => {
  const navigate = useNavigate()
  const navigateToAgreementSignatures = useCallback(() => {
    navigate(paths.agreementSignatures._)
  }, [navigate])
  const [githubOAuth2Link] = useOAuth2({
    provider: "github",
    authUri: GH_AUTH_URI,
    clientId: GH_CLIENT_ID,
    redirectUri: GH_REDIRECT_URI,
    scope: GH_SCOPE,
    responseType: "code",
    accessType: "offline",
    useLoginMutation,
    useSessionMetadata,
    onCreateSession: navigateToAgreementSignatures,
    onRetrieveSession: navigateToAgreementSignatures,
  })

  return (
    <pages.Page>
      <pages.Section>
        <Stack direction="column" textAlign="center" alignItems="center">
          <Image
            src={CflLogoImage}
            alt="code for life logo"
            maxWidth="200px"
            href={LINK_CFL}
            hrefInNewTab
          />
          <Typography my={10} variant="h1">
            Welcome to our Contributor Service!
          </Typography>
          <Typography variant="h6">
            🎉 We&apos;re excited to have you join the CFL community. 🎉
          </Typography>
          <Typography>
            As a contributor, you have the opportunity to share your knowledge,
            insights, and unique perspectives with a passionate audience. Dive
            in, start contributing, and help us make a difference.
          </Typography>
          <Typography>
            Log in with your GitHub account to start contributing.
          </Typography>
          <Typography fontSize="40px !important">👇</Typography>
          {githubOAuth2Link ? (
            <LinkButton
              to={githubOAuth2Link}
              sx={({ spacing }) => ({
                padding: `${spacing(4)} ${spacing(5)}`,
                fontSize: "1.2rem",
                background: "black",
                color: "white.main",
              })}
              startIcon={<GitHubIcon sx={{ fontSize: "30px !important" }} />}
            >
              Log in with GitHub
            </LinkButton>
          ) : (
            <CircularProgress />
          )}
        </Stack>
      </pages.Section>
    </pages.Page>
  )
}

export default Home
