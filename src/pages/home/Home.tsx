import * as pages from "codeforlife/components/page"
import * as yup from "yup"
import { type FC, useEffect } from "react"
import { GH_CLIENT_ID } from "../../app/env"
import GitHubIcon from "@mui/icons-material/GitHub"
import { Image } from "codeforlife/components"
import { LinkButton } from "codeforlife/components/router"
import { paths } from "../../routes"

import { Stack, Typography } from "@mui/material"
import { useLoginWithGitHubMutation } from "../../api/session"
import { useNavigate } from "codeforlife/hooks/router"
import { useSearchParams } from "codeforlife/hooks/router"

import CflLogoImage from "../../images/cfl_logo.png"
import { useSessionMetadata } from "../../app/hooks"

export interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [loginWithGitHub] = useLoginWithGitHubMutation()
  const sessionMetadata = useSessionMetadata()
  const navigate = useNavigate()
  const searchParams = useSearchParams({
    code: yup.string(),
  })

  useEffect(() => {
    const code = searchParams?.code

    if (sessionMetadata) {
      navigate(paths.agreementSignatures._)
    } else if (code) {
      navigate(".", { replace: true })
      searchParams.code = undefined

      loginWithGitHub({ code })
        .unwrap()
        .then(() => {
          navigate(paths.agreementSignatures._)
        })
        .catch(err => {
          alert(`Login failed: ${err}`)
        })
    }
  }, [sessionMetadata, loginWithGitHub, navigate, searchParams])

  return (
    <pages.Page>
      <pages.Section>
        <Stack
          spacing={10}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Image src={CflLogoImage} alt="code for life logo" maxWidth="200px" />
          <Typography variant="h1">
            Welcome to our Contributor Service!
          </Typography>
          <Typography>
            We are excited to have you join the CFL community. As a contributor,
            you have the opportunity to share your knowledge, insights, and
            unique perspectives with a passionate audience. Dive in, start
            contributing, and help us make a difference.
          </Typography>
          <LinkButton
            to={`https://github.com/login/oauth/authorize?client_id=${GH_CLIENT_ID}`}
            sx={theme => ({
              marginTop: `${theme.spacing(20)}`,
              borderRadius: `${theme.spacing(1)}`,
              padding: `${theme.spacing(4)} ${theme.spacing(5)}`,
              fontSize: `${theme.spacing(2.5)}`,
              background: "black",
              color: "white.main",
            })}
            startIcon={<GitHubIcon />}
          >
            Log in with GitHub
          </LinkButton>
        </Stack>
      </pages.Section>
    </pages.Page>
  )
}

export default Home
