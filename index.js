
const core = require('@actions/core');
const github = require('@actions/github');
const moment = require('moment');
const request = require('superagent');

const postSlackMessage = async (slackWebhookUrl, slackMessage) => {
  await request.post(slackWebhookUrl)
    .set('Content-Type', 'application/json')
    .send(slackMessage);
};

const buildSlackMessageBody = (release) => {

};

async function run() {
  try {
    // const SLACK_WEBHOOK_URL = core.getInput('slack_webhook_url', { required: true });
    // const GITHUB_TOKEN = core.getInput('github_token', { required: true });
    // const releaseNotes = buildReleaseNotes();
    // await postReleaseNotes(SLACK_WEBHOOK_URL, {

    // });

    const {
      payload: {
        release: {
          id,
          body,
          url,
          published_at,
          author: {
            login,
            avatar_url,
          }
        }
      }
    } = github.context;

    console.log(`Release ID: ${id}`);
    console.log(`URL: ${url}`);
    console.log(`Published at: ${published_at}`);
    console.log(`Author login: ${login}`);
    console.log(`Author avatar_url: ${avatar_url}`);
    console.log(body);

  } catch (err) {
    console.error(err);
  }
}

run();