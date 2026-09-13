import { createContext, useContext, useEffect, useState } from 'react'

const AreaContext = createContext(null)

const DEFAULT_HOME = { name: 'Kharagpur, West Bengal, India', lat: 22.3460, lon: 87.2320 }
const STORAGE_KEY = 'resq360_home_area'

export function AreaProvider({ children }) {
  const [homeArea, setHomeArea] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : DEFAULT_HOME
    } catch {
      return DEFAULT_HOME
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(homeArea))
    } catch {
      // localStorage unavailable — fail silently, in-memory state still works
    }
  }, [homeArea])

  return (
    <AreaContext.Provider value={{ homeArea, setHomeArea }}>
      {children}
    </AreaContext.Provider>
  )
}

export function useArea() {
  const ctx = useContext(AreaContext)
  if (!ctx) throw new Error('useArea must be used inside <AreaProvider>')
  return ctx
}
