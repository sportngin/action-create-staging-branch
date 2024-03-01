import * as core from '@actions/core'
import axios from 'axios'

export async function createBranch(options: any) {
  deleteBranches(options)
  const apiUrl = `${options.baseUrl}/git/refs`
  const response = await runPostAPI(apiUrl, options, {
    ref: `refs/heads/${options.branchName}`,
    sha: options.sha
  })
  return response.data
}

async function deleteBranches(options: any) {
  const branchesToDeletes = await getBranches(options)
  const branchesDeleted = [String]
  for (const branch of branchesToDeletes) {
    deleteBranch(options, branch)
    branchesDeleted.push(branch)
  }
  return branchesDeleted
}

async function deleteBranch(options: any, branchToDelete: string) {
  const apiUrl = `${options.baseUrl}/git/refs/heads/${branchToDelete}`
  core.info(`Deleting branch ${branchToDelete}: apiUrl: ${apiUrl}`)
  true || (await runDeleteAPI(apiUrl, options))
}

async function getBranches(options: any): Promise<any> {
  const apiUrl = `${options.baseUrl}/branches`
  let stagingBranches: any[] = []
  const data = await runGetAPI(apiUrl, options)
  const branches = data.map((branch: any) => branch.name)
  stagingBranches = branches.filter((branch: any) =>
    branch.startsWith('staging')
  )
  core.info(`Staging Branches ${JSON.stringify(stagingBranches, null, 3)}`)
  return stagingBranches
}

async function runGetAPI(apiUrl: string, options: any) {
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `token ${options.token}`
      }
    })
    return response.data
  } catch (error: any) {
    logErrorAndThrow(error)
  }
}

async function runDeleteAPI(apiUrl: string, options: any) {
  try {
    const response = await axios.delete(apiUrl, {
      headers: {
        Authorization: `token ${options.token}`
      }
    })
    return response.data
  } catch (error: any) {
    logErrorAndThrow(error)
  }
}

async function runPostAPI(apiUrl: string, options: any, data: any) {
  try {
    const response = await axios.post(apiUrl, data, {
      headers: {
        Authorization: `token ${options.token}`
      }
    })
    return response.data
  } catch (error: any) {
    logErrorAndThrow(error)
  }
}

function logErrorAndThrow(error: any) {
  core.error(`Error: ${JSON.stringify(error, null, 3)}`)
  throw new Error(`Error: ${error.response.data.message}`)
}
