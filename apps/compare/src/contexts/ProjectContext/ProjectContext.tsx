import { createContext, Dispatch, SetStateAction } from 'react'
import { Project } from 'lcax'

interface ProjectContextProps {
  projects: Project[]
  setProjects: Dispatch<SetStateAction<Project[]>>
}

export const ProjectContext = createContext({} as ProjectContextProps)
