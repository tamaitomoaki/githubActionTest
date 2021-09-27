const core = require('@actions/core');
const github = require('@actions/github');
const path = require('path');

const main = async () => {
  console.log('確認')
  console.log(github.context.payload.issue)
  console.log(github.context.payload.issue.html_url)
  console.log(github.context.payload.issue.assignee.login)
  console.log(github.context.payload.issue.assignees)
  console.log('確認')

  const mention = loadYamlFile(path.join(__dirname, '../../mention-to-slack.yml'));
  // レビュワー取得、メンション設定
  try {
    if (github.context.payload.issue.assignees.length !== 0) {
      const assignee = github.context.payload.issue.assignees[0].login
      core.setOutput('mention', `<@${mention[assignee]}>`);
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