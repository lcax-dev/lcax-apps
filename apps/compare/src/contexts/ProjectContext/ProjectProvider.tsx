import { ReactNode } from 'react'
import { ProjectContext } from './ProjectContext'

type ProjectProviderProps = {
  children: ReactNode
}

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  return (
    <ProjectContext.Provider
      value={{
        id: null,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
