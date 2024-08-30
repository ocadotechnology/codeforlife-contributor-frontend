import { type FC } from "react"
import { GH_CLIENT_ID } from "../app/env"
import GitHubMarkWhiteImage from "../images/github-mark-white.png"
import { LinkButton } from "codeforlife/components/router"

export interface GitHubLoginButtonProps {}

const GitHubLoginButton: FC<GitHubLoginButtonProps> = () => {
  return (
    <LinkButton
      to={`https://github.com/login/oauth/authorize?client_id=${GH_CLIENT_ID}`}
      target="_blank"
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
      startIcon={
        <img
          src={GitHubMarkWhiteImage}
          alt="GitHub Logo"
          style={{ width: "40px", marginRight: "20px" }}
        />
      }
    >
      Log in with GitHub
    </LinkButton>
  )
}

export default GitHubLoginButton
