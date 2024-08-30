import * as pages from "codeforlife/components/page"
import { type FC, useEffect } from "react"
import CflLogoImage from "../../images/cfl_logo.png"
import GitHubLoginButton from "../../components/GitHubLoginButton"
import { Image } from "codeforlife/components"
import { useLoginWithGitHubMutation } from "../../api/session"

export interface GitHubProps {}

const GitHub: FC<GitHubProps> = () => {
  const [loginWithGitHub] = useLoginWithGitHubMutation()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("code")

    if (code) {
      urlParams.delete("code")
      window.history.replaceState(null, "", window.location.pathname)

      loginWithGitHub({ code })
        .unwrap()
        .then(() => {
          window.location.href = "/agreement-signatures"
        })
        .catch(err => {
          window.location.href = "/login"
          alert(`Login failed: ${err}`)
        })
    }
  }, [loginWithGitHub])

  return (
    <pages.Page>
      <pages.Section>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Image src={CflLogoImage} alt="code for life logo" maxWidth="200px" />
          <GitHubLoginButton />
        </div>
      </pages.Section>
    </pages.Page>
  )
}

export default GitHub
