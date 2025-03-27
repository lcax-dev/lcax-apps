import { convertBRStandard, convertLCAbyg, Project } from 'lcax'
import { v4 as uuidv4 } from 'uuid'
import { mapLCABygClassification } from '@/lib'

export const convertFiles = async (files: File[]) => {
  const projects = []
  const errors = []

  for (const file of files) {
    if (file.type == 'application/json' && !file.name.endsWith('_results.json')) {
      try {
        const project_data = await file.text()
        const results = files.find((_file) => _file.name === file.name.replace('.json', '_results.json'))

        if (!results) {
          let project
          try {
            project = (convertLCAbyg(project_data) as { project: Project }).project
            project.id = uuidv4()
            mapLCABygClassification(project)
          } catch {
            project = JSON.parse(await files[0].text())
          }
          projects.push(project)
        } else {
          const project = (convertLCAbyg(project_data, await results.text()) as { project: Project }).project
          project.id = uuidv4()
          mapLCABygClassification(project)
          projects.push(project)
        }
      } catch (e) {
        console.error(e)
        errors.push(`${file.name}: Problem converting file`)
      }
    } else if (file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      try {
        const projectName = file.name.replace('.xlsx', '').split('_')[0]
        const project = convertBRStandard(projectName, new Uint8Array(await file.arrayBuffer()))
        projects.push(project)
      } catch (e) {
        console.error(e)
        errors.push(`${file.name}: Problem converting file`)
      }
    }
  }

  return { projects, errors }
}
