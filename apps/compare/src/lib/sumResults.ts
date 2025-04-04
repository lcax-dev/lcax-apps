import {
  Assembly,
  Classification,
  ImpactCategoryKey,
  LifeCycleModule,
  Product,
  Project,
  getImpactTotal,
  normalizeResult,
  getImpactsByLifeCycleModule,
} from 'lcax'

interface SumResultsProjectProps {
  project: Project
  excludeModules?: LifeCycleModule[]
  impactCategory?: ImpactCategoryKey
}
export const sumResultsProject = ({ project, excludeModules, impactCategory = 'gwp' }: SumResultsProjectProps) => {
  const result = getImpactTotal(project.results!, impactCategory, excludeModules)
  const factor = (project.referenceStudyPeriod || 1) * (project.projectInfo?.grossFloorArea?.value || 1)
  return normalizeResult(result, factor)
}

interface SumResultsProps {
  element: Project | Assembly | Product
  referenceStudyPeriod: number
  grossFloorArea: number
  excludeModules?: LifeCycleModule[]
}

export const sumResults = ({ element, referenceStudyPeriod, grossFloorArea, excludeModules }: SumResultsProps) => {
  const total = getImpactTotal(element.results!, 'gwp', excludeModules)
  return normalizeResult(total, referenceStudyPeriod * grossFloorArea)
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
        grossFloorArea: project.projectInfo?.grossFloorArea?.value || 1,
        excludeModules: ['d'],
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
  const factor = (project.referenceStudyPeriod || 1) * (project.projectInfo?.grossFloorArea?.value || 1)
  return {
    ...getImpactsByLifeCycleModule(project.results!, 'gwp', undefined, factor),
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
