import { Assembly, Classification, Product, Project } from 'lcax'

export const sumResultsProject = (project: Project) => {
  // @ts-expect-error acc and next are numbers
  const total = Object.values(project.results.gwp).reduce((acc: number, next: number) => acc + next, 0) as number
  // @ts-expect-error value exists
  return makeResultRelative(total, project.referenceStudyPeriod || 1, project.projectInfo?.grossFloorArea?.value || 1)
}

interface SumResultsProps {
  element: Project | Assembly | Product
  referenceStudyPeriod: number
  grossFloorArea: number
}

export const sumResults = ({ element, referenceStudyPeriod, grossFloorArea }: SumResultsProps) => {
  // @ts-expect-error acc and next are numbers
  const total = Object.values(element.results.gwp).reduce((acc: number, next: number) => acc + next, 0) as number

  return makeResultRelative(total, referenceStudyPeriod, grossFloorArea)
}

export const makeResultRelative = (result: number, referenceStudyPeriod: number, grossFloorArea: number) => {
  return result / referenceStudyPeriod / grossFloorArea
}

interface ResultsByComponentsProps {
  project: Project
  classificationSystem: string
}

export const resultsByComponents = ({ project, classificationSystem }: ResultsByComponentsProps) => {
  // @ts-expect-error reduce exists on assemblies
  return project.assemblies.reduce(
    // @ts-expect-error solve later
    (acc, next) => {
      const _class =
        next.classification.find((cls: Classification) => cls.system === classificationSystem)?.name || 'Not Classified'
      const result = sumResults({
        element: next,
        referenceStudyPeriod: project.referenceStudyPeriod || 1,
        // @ts-expect-error value exists
        grossFloorArea: project.projectInfo?.grossFloorArea.value || 1,
      })
      if (_class in acc) {
        return {
          ...acc,
          [_class]: acc[_class] + result,
        }
      } else {
        return {
          ...acc,
          [_class]: result,
        }
      }
    },
    { classificationSystem },
  )
}

interface ResultsByLifeCycleProps {
  project: Project
}

export const resultsByLifeCycle = ({ project }: ResultsByLifeCycleProps) => {
  return {
    ...Object.entries(project?.results.gwp)
      .map(([key, value]) => ({
        [key.toUpperCase()]: makeResultRelative(
          value as number,
          project.referenceStudyPeriod || 1,
          // @ts-expect-error value exists
          project.projectInfo?.grossFloorArea.value || 1,
        ),
      }))
      .reduce((acc, next) => ({ ...acc, ...next }), {}),
    impact: 'GWP',
  }
}
