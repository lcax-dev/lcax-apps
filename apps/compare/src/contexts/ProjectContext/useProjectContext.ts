import { useContext } from 'react'
import { ProjectContext } from '@/contexts'

export const useProjects = () => useContext(ProjectContext)
