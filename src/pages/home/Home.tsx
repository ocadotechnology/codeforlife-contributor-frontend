import * as pages from "codeforlife/components/page"
import * as yup from "yup"
import { type FC, useEffect } from "react"
import { Stack, Typography } from "@mui/material"
import { GitHub as GitHubIcon } from "@mui/icons-material"
import { Image } from "codeforlife/components"
import { LinkButton } from "codeforlife/components/router"
import { useNavigate } from "codeforlife/hooks/router"
import { useSearchParams } from "codeforlife/hooks/router"

import CflLogoImage from "../../images/cfl_logo.png"
import { LINK_GH_LOGIN } from "../../app/env"
import { paths } from "../../routes"
import { useLoginMutation } from "../../api/session"
import { useSessionMetadata } from "../../app/hooks"

export interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [login] = useLoginMutation()
  const sessionMetadata = useSessionMetadata()
  const navigate = useNavigate()
  const { code } = useSearchParams({ code: yup.string() }) || {}

  useEffect(() => {
    if (sessionMetadata) navigate(paths.agreementSignatures._)
    else if (code) {
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
  }, [sessionMetadata, login, navigate, code])

  return (
    <pages.Page>
      <pages.Section>
        <Stack
          spacing={10}
          direction="column"
          textAlign="center"
          alignItems="center"
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
            to={LINK_GH_LOGIN}
            sx={({ spacing }) => ({
              marginTop: spacing(20),
              borderRadius: spacing(1),
              padding: `${spacing(4)} ${spacing(5)}`,
              fontSize: spacing(2.5),
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
