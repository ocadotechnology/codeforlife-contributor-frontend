import * as pages from "codeforlife/components/page"
import * as yup from "yup"
import { type FC, useEffect } from "react"
import { Stack, Typography } from "@mui/material"
import {
  useLocation,
  useNavigate,
  useSearchParams,
} from "codeforlife/hooks/router"
import { GitHub as GitHubIcon } from "@mui/icons-material"
import { Image } from "codeforlife/components"
import { LinkButton } from "codeforlife/components/router"

import { LINK_CFL, LINK_GH_LOGIN } from "../../app/env"
import CflLogoImage from "../../images/cfl_logo.png"
import { paths } from "../../routes"
import { useLoginMutation } from "../../api/session"
import { useSessionMetadata } from "../../app/hooks"

export interface HomeState {
  code?: string
}

export interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [login, { isLoading, isError }] = useLoginMutation()
  const sessionMetadata = useSessionMetadata()
  const navigate = useNavigate()
  const searchParams = useSearchParams({ code: yup.string() }) || {}
  const { state } = useLocation<HomeState>()

  const { code } = state || {}

  useEffect(() => {
    if (sessionMetadata) navigate(paths.agreementSignatures._)
    else if (searchParams.code) {
      navigate<HomeState>(".", {
        replace: true,
        next: false,
        state: { code: searchParams.code },
      })
    } else if (code && !isLoading && !isError) {
      login({ code })
        .unwrap()
        .then(() => {
          navigate(paths.agreementSignatures._)
        })
        .catch(() => {
          navigate(".", {
            replace: true,
            state: {
              notifications: [
                {
                  props: {
                    error: true,
                    children: "Failed to login. Please try again.",
                  },
                },
              ],
            },
          })
        })
    }
  }, [
    sessionMetadata,
    login,
    navigate,
    searchParams.code,
    code,
    isLoading,
    isError,
  ])

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
          <LinkButton
            to={LINK_GH_LOGIN}
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
        </Stack>
      </pages.Section>
    </pages.Page>
  )
}

export default Home
