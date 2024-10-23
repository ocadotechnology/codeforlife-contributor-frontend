// This file serves as a central hub for re-exporting pre-typed Redux hooks.
// These imports are restricted elsewhere to ensure consistent
// usage of typed hooks throughout the application.
// We disable the ESLint rule here because this is the designated place
// for importing and re-exporting the typed versions of hooks.
/* eslint-disable @typescript-eslint/no-restricted-imports */
import { type ReactNode, useEffect } from "react"
import { createSearchParams, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Cookies from "js-cookie"
import { SESSION_METADATA_COOKIE_NAME } from "codeforlife/env"
import { selectIsLoggedIn } from "codeforlife/slices/session"

import type { AppDispatch, RootState } from "./store"
import { paths } from "../routes"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export interface SessionMetadata {
  contributor_id: number
}

export function useSessionMetadata(): SessionMetadata | undefined {
  return useAppSelector(selectIsLoggedIn)
    ? (JSON.parse(
        Cookies.get(SESSION_METADATA_COOKIE_NAME)!,
      ) as SessionMetadata)
    : undefined
}

export type UseSessionChildren =
  | ReactNode
  | ((metadata: SessionMetadata) => ReactNode)

export type UseSessionOptions = Partial<{ next: boolean }>

export function useSession(
  children: UseSessionChildren,
  options: UseSessionOptions = {},
) {
  const { next = true } = options

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const sessionMetadata = useSessionMetadata()

  useEffect(() => {
    if (!sessionMetadata) {
      navigate({
        pathname: paths._,
        search: next
          ? createSearchParams({ next: pathname }).toString()
          : undefined,
      })
    }
  }, [sessionMetadata, navigate, next, pathname])

  if (!sessionMetadata) return <></>

  if (typeof children === "function") return children(sessionMetadata)

  return children
}
