const core = require('@actions/core');
const github = require('@actions/github');
const path = require('path');
// const { Client } = require("@notionhq/client")

const main = async () => {
  console.log('確認')
  console.log(github.context.payload.issue.assignee)
  console.log(github.context.payload.issue.assignee.login)
  console.log(github.context.payload.issue.assignees)
  console.log('確認')

  const mention = loadYamlFile(path.join(__dirname, '../../mention-to-slack.yml'));
  // レビュワー取得、メンション設定
  try {
    if (github.context.payload.pull_request.requested_reviewers.length !== 0) {
      const reviewer = github.context.payload.pull_request.requested_reviewers[0].login
      core.setOutput('mention', `<@${mention[reviewer]}>`);
    } else {
      core.setOutput('mention', `<@U51QZQFV0>`);
    }
  } catch (err) {
    console.error(err.message);
  }
}

/**
 * 指定されたパスの Yaml ファイルを読み込みます。
 */
 function loadYamlFile(filename) {
  const fs = require('fs');
  const yaml = require('js-yaml');
  const yamlText = fs.readFileSync(filename, 'utf8')
  return yaml.load(yamlText);
}

main()