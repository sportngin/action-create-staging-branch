import * as core from '@actions/core'
import * as github from '@actions/github'

interface OptionsMap {
  [key: string]: string | boolean
}

export function buildOptions() {
  const options: OptionsMap = {}

  options.repository = process.env.GITHUB_REPOSITORY as string
  options.sha = github.context.sha
  options.token = githubToken()
  options.baseUrl = `https://api.github.com/repos/${options.repository}`

  options.slack_webhook = core.getInput('slack_webhook', {
    required: false
  })
  options.channel = core.getInput('channel', {
    required: false
  })
  options.icon_url = core.getInput('icon_url', {
    required: false
  })
  options.username = core.getInput('username', {
    required: false
  })
  options.fallback = core.getInput('fallback', {
    required: false
  })
  options.success_color = core.getInput('success_color', {
    required: false
  })
  options.error_color = core.getInput('error_color', {
    required: false
  })
  options.pretext = core.getInput('pretext', {
    required: false
  })
  options.author_name = core.getInput('author_name', {
    required: false
  })
  options.author_link = core.getInput('author_link', {
    required: false
  })
  options.author_icon = core.getInput('author_icon', {
    required: false
  })
  options.title = core.getInput('title', {
    required: false
  })
  options.title_link = core.getInput('title_link', {
    required: false
  })
  options.success_text = core.getInput('success_text', {
    required: false
  })
  options.error_text = core.getInput('error_text', {
    required: false
  })
  options.image_url = core.getInput('image_url', {
    required: false
  })
  options.thumb_url = core.getInput('thumb_url', {
    required: false
  })
  options.footer = core.getInput('footer', {
    required: false
  })
  options.footer_icon = core.getInput('footer_icon', {
    required: false
  })

  options.branchName = `staging.${core.getInput('branch_name')}`
  if (options.branchName === 'staging.') {
    options.branchName = `staging.${new Date().toISOString().split('T')[0].replaceAll('-', '.')}`
  }

  options.text = options.success_text
  options.color = options.success_color
  return options
}

function githubToken(): string {
  const token = process.env.GITHUB_TOKEN
  if (!token)
    throw ReferenceError('No token defined in the environment variables')
  return token
}
