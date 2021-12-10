
const core = require('@actions/core');
const github = require('@actions/github');
const request = require('superagent');
const util = require('util');
const slackifyMarkdown = require('slackify-markdown');

const postSlackMessage = async (slackWebhookUrl, slackMessage) => {
  await request.post(slackWebhookUrl)
    .set('Content-Type', 'application/json')
    .send(slackMessage);
};

const buildSlackMessageBody = (release) => {
  const {
    body,
    published_at,
    tag_name,
    author
  } = release;

  const date = published_at.substring(0, published_at.indexOf('T'));
  const headerReg = /## .*\n/;
  const bodyTrimmed = body.replace(headerReg, '');
  const slackified = slackifyMarkdown(bodyTrimmed);

  const bodySections = slackified.split('\n\n')
    .filter(text => !!text)
    .map(text => {
      return {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text,
        }
      };
    });


  return {
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": ":truck: :articulated_lorry: *A NEW release is live* :point_down::skin-tone-6::point_down::skin-tone-5::point_down::skin-tone-4::point_down::skin-tone-3::point_down::skin-tone-2:"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "_See below to see what's changed_"
        }
      },
      {
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": `Release v${tag_name} (${date})`,
          "emoji": true
        }
      },
      ...bodySections,
      {
        "type": "context",
        "elements": [
          {
            "type": "image",
            "image_url": `${author.avatar_url}`,
            "alt_text": `${author.login}`
          },
          {
            "type": "mrkdwn",
            "text": `Released by <${author.html_url}|${author.login}>`
          }
        ]
      }
    ]
  };
};

async function run() {
  try {
    const SLACK_WEBHOOK_URL = core.getInput('slack_webhook_url', { required: true });
    const {
      payload: {
        release
      }
    } = github.context;
    const releaseNotes = buildSlackMessageBody(release);
    await postSlackMessage(SLACK_WEBHOOK_URL, releaseNotes);
  } catch (err) {
    console.error(err);
    core.setFailed(err.message);
  }
}

run();