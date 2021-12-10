# Github Action Publish Release Notes to Slack

- Converts to Slack markdown
- Splits into sections (Slack has a character limit)
- Removes duplicate version header


## Quick Start

```yaml
name: Publish Release Notes to Slack

name: Action self-test

on:
  release:
    types: [published]

jobs:
  test-action:
    name: Publish release to Notion
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: matmar10/slack-release@v2
        with:
          # Your Slack webhook URL:
          # https://hooks.slack.com/services/XXXXXXXXX/YYYYYYYYYYY/ZZZZZZZZZZZZZZZZZZZZZZZZ
          slack_webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
```

That's it! Publish your release, and enjoy.