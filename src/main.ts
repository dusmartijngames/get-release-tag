import * as core from '@actions/core'
import { context } from '@actions/github'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    if (context.eventName !== 'release') {
      core.setFailed(
        `Can't execute release action in event type '${context.eventName}'.`
      )
      return
    }

    let tag = context.payload.release?.tag_name
    if (tag.length < 5) {
      core.setFailed(
        `Invalid release tag. Expecting either 'v1.2.3' or '1.2.3' or 'v1.2.3-preview' but got '${tag}'.`
      )
      return
    }

    if (tag.startsWith('v')) {
      tag = tag.substring(1)
    }

    core.info(`Tag: ${tag}`)
    core.setOutput('tag', tag)
  } catch (error) {
    // @ts-ignore
    core.setFailed(error.message)
  }
}