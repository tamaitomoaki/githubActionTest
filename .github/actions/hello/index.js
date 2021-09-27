const github = require('@actions/github');

const main = async () => {
  console.log('確認')
  console.log(github.context.payload)
  console.log('確認')
}

main()