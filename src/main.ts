import * as core from '@actions/core'
/**
 * The entrypoint for the action.
 */
import { createBranch } from './git-utils'
import { buildOptions } from './util'
import { slackNotify } from './slack-notification'

export async function run() {
  const options = buildOptions()
  core.info(`Options: ${JSON.stringify(options, null, 3)}`)
  try {
    await createBranch(options)
  } catch (error: any) {
    options.text = options.error_text
    options.color = options.error_color
    core.error(`Error on staging branch refresh: ${error.message}`)
    core.setFailed(error.message)
  } finally {
    slackNotify(options)
  }
}
