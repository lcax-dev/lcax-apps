import { describe, test } from 'vitest'
import { ResponseBody } from '@/__test__/__mock__'
import { server } from '@/config'
import gql from 'graphql-tag'
import { projectData } from '@/__test__/__data__'
import { Project } from 'lcax'

describe('Calculate Project', async () => {
  test('calculate', async ({ expect }) => {
    const response = await server.executeOperation({
      query: gql`
        mutation calculateProject($project: ProjectInput!) {
          calculateProject(project: $project) {
            id
            results {
              gwp {
                a1a3
              }
            }
          }
        }
      `,
      variables: { project: projectData },
    })

    const result = response.body as unknown as ResponseBody<{ calculateProject: Project }>

    expect(result.kind === 'single')
    expect(result.singleResult.errors).toBeUndefined()
    expect(result.singleResult.data.calculateProject.id).toBe(projectData.id)
    expect(result.singleResult.data.calculateProject.results.gwp.a1a3).toBe(160532500)
  })
})
