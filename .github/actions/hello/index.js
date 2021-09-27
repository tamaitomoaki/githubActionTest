// const core = require('@actions/core');
const github = require('@actions/github');
// const path = require('path');
// const { Client } = require("@notionhq/client")

const main = async () => {
  console.log('確認')
  console.log(github.context.payload)
  console.log('確認')
}

main()