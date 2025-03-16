import { Assembly, Classification, ImpactCategoryKey, LifeCycleStage, Product, Project } from 'lcax'

interface SumResultsProjectProps {
  project: Project
  excludeStages?: LifeCycleStage[]
  impactCategory?: ImpactCategoryKey
}
export const sumResultsProject = ({ project, excludeStages, impactCategory = 'gwp' }: SumResultsProjectProps) => {
  let total = Object.entries(project.results?.[impactCategory.toLowerCase()]) as [LifeCycleStage, number][]
  if (excludeStages) {
    total = total.filter(([key]) => !excludeStages.includes(key))
  }
  const result = total.reduce((acc, next) => acc + next[1], 0)
  // @ts-expect-error value exists
  return makeResultRelative(result, project.referenceStudyPeriod || 1, project.projectInfo?.grossFloorArea?.value || 1)
}

interface SumResultsProps {
  element: Project | Assembly | Product
  referenceStudyPeriod: number
  grossFloorArea: number
}

export const sumResults = ({ element, referenceStudyPeriod, grossFloorArea }: SumResultsProps) => {
  // @ts-expect-error acc and next are numbers
  const total = Object.values(element.results?.gwp || {}).reduce((acc: number, next: number) => acc + next, 0) as number

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
  return (project.assemblies as Assembly[]).reduce(
    (acc, next) => {
      const _class =
        next.classification?.find((cls: Classification) => cls.system === classificationSystem)?.name ||
        'Not Classified'
      const result = sumResults({
        element: next,
        referenceStudyPeriod: project.referenceStudyPeriod || 1,
        // @ts-expect-error value exists
        grossFloorArea: project.projectInfo?.grossFloorArea?.value || 1,
      })
      if (_class in acc) {
        return {
          ...acc,
          // @ts-expect-error acc[_class] works
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

interface CutOffProps {
  results: Record<string, number>
  cutOff: number
}

interface CutOffReturn extends Record<string, number> {
  // @ts-expect-error it works
  Others?: number
}

export const cutOffSmallestResults = ({ results, cutOff = 5 }: CutOffProps) => {
  return Object.entries(results)
    .toSorted((prev, next) => (prev[1] > next[1] ? -1 : 1))
    .reduce((acc, next, index) => {
      if (index < cutOff) {
        return { ...acc, [next[0]]: next[1] }
      } else {
        return { ...acc, Others: (acc.Others || 0) + next[1] }
      }
    }, {} as CutOffReturn)
}
