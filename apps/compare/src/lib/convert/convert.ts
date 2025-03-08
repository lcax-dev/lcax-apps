// import { convertLCAbyg } from 'lcax'

export const convertFiles = async (files: File[]) => {
  // const projects = []
  // const errors = []

  // for (const file of files) {
  //   if (!file.name.endsWith('_resultater.json')) {
  //     try {
  //       const project = JSON.parse(await file.text())
  //       const results = files.find((_file) => _file.name === file.name.replace('.json', '_resultater.json'))
  //       if (!results) {
  //         projects.push(convertLCAbyg(project).project)
  //       } else {
  //         projects.push(convertLCAbyg(project, await results.text()).project)
  //       }
  //     } catch (e) {
  //       console.error(e)
  //       errors.push(`${file.name}: Problem converting file`)
  //     }
  //   }
  // }

  return { projects: [JSON.parse(await files[0].text())], errors: [] }
}
