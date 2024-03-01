import * as core from '@actions/core'
import SlackNotify, { SendAttachment } from 'slack-notify'

// most @actions toolkit packages have async methods
export async function slackNotify(options: any) {
  const slack = SlackNotify(options.slack_webhook)
  core.info(`SlackNotify Options: ${JSON.stringify(options, null, 3)}`)
  try {
    const attachment = options
    const default_attachment = {
      title: `${process.env.GITHUB_REPOSITORY}`,
      title_link: `https://github.com/${process.env.GITHUB_REPOSITORY}`,
      color: attachment.color,
      text: `${process.env.GITHUB_REF}`,
      author_name: `${process.env.GITHUB_ACTOR}`,
      author_link: `https://github.com/${process.env.GITHUB_ACTOR}`,
      author_icon: `https://github.com/${process.env.GITHUB_ACTOR}.png`,
      footer: `action -> ${process.env.GITHUB_EVENT_NAME}`,
      thumb_url: 'https://avatars0.githubusercontent.com/u/44036562?s=200&v=4',
      fallback: ''
    }

    let final_attachment = {} as SendAttachment
    if (attachment.length === 0) {
      final_attachment = default_attachment
    } else {
      final_attachment = attachment
    }
    slack.send({
      channel: options.channel,
      icon_url: options.icon_url,
      username: options.username,
      text: options.text,
      attachments: [final_attachment]
    })
  } catch (error: any) {
    core.info(`error on slack notify: ${JSON.stringify(error, null, 3)}`)
    core.setFailed(error.message)
  }
}
