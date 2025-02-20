import { ReactNode, useState } from 'react'
import { ProjectContext } from '@/contexts'
import { Project } from 'lcax'

type ProjectProviderProps = {
  children: ReactNode
}

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const [projects, setProjects] = useState<Project[]>([])

  return (
    <ProjectContext.Provider
      value={{
        projects,
        setProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
