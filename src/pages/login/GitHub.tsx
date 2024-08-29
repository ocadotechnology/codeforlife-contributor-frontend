import * as pages from "codeforlife/components/page"
import { type FC, useEffect } from "react"
import Button from "@mui/material/Button"
import CflLogoImage from "../../images/cfl_logo.png"
import GitHubMarkWhiteImage from "../../images/github-mark-white.png"
import { Image } from "codeforlife/components"
import { useLoginWithGitHubMutation } from "../../api/session"

export interface GitHubProps {}

const GitHub: FC<GitHubProps> = () => {
  const [loginWithGitHub] = useLoginWithGitHubMutation()

  const handleLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=Ov23liBErSabQFqROeMg`
  }

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
          <Button
            onClick={handleLogin}
            style={{
              marginTop: "200px",
              borderRadius: "5px",
              padding: "30px 40px",
              fontSize: "20px",
              background: "#000000",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={GitHubMarkWhiteImage}
              alt="GitHub Logo"
              style={{ width: "40px", marginRight: "20px" }}
            />
            Log in with GitHub
          </Button>
        </div>
      </pages.Section>
    </pages.Page>
  )
}

export default GitHub
