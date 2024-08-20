// This file serves as a central hub for re-exporting pre-typed Redux hooks.
// These imports are restricted elsewhere to ensure consistent
// usage of typed hooks throughout the application.
// We disable the ESLint rule here because this is the designated place
// for importing and re-exporting the typed versions of hooks.
/* eslint-disable @typescript-eslint/no-restricted-imports */
import { useDispatch, useSelector } from "react-redux"

import type { AppDispatch, RootState } from "./store"
import Cookies from "js-cookie"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export interface SessionMetadata {
  contributor_id: number
}

export function useSessionMetadata(): SessionMetadata | undefined {
  const sessionMetadata = Cookies.get("session_metadata")

  return sessionMetadata
    ? (JSON.parse(sessionMetadata) as SessionMetadata)
    : undefined
}
