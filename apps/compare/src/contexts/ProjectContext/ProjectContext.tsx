import { createContext } from 'react'

interface ProjectContextProps {
  id: string | null
}

export const ProjectContext = createContext({ id: null } as ProjectContextProps)
