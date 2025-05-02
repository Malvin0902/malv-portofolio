"use client"

import { useEffect } from "react"

export function useLockBody() {
  useEffect(() => {
    // Add class to body when component mounts
    document.body.classList.add("modal-open")

    // Remove class from body when component unmounts
    return () => {
      document.body.classList.remove("modal-open")
    }
  }, [])
}
