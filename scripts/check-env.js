import { styleText } from 'node:util'

if (process.env.npm_command === 'install') {
  const allowedPackageManagers = ['pnpm', 'npm']
  const currentPackageManager = process.env.npm_config_user_agent?.split('/')[0] || 'unknown'
  if (!allowedPackageManagers.includes(currentPackageManager)) {
    console.log(styleText('red', `\nError: This project must use pnpm or npm as the package manager. The current package manager used is ${currentPackageManager}. Please use ${styleText('underline', 'pnpm install')} or ${styleText('underline', 'npm install')} to install dependencies .\n`))
    process.exit(1)
  }

  function compareVersions (current, required) {
    const operator = required.match(/^[><=]+/)?.[0] || '>='
    const version = required.replace(/^[><=]+/, '')

    const currParts = current.replace(/^v/, '').split('.').map(Number)
    const reqParts = version.split('.').map(Number)

    for (let i = 0; i < 3; i++) {
      const curr = currParts[i] || 0
      const req = reqParts[i] || 0

      if (curr > req) return operator.includes('>')
      if (curr < req) return operator.includes('<')
    }

    return operator.includes('=')
  }

  const requiredNodeVersion = '>=22.0.0'
  if (!compareVersions(process.version, requiredNodeVersion)) {
    console.log(styleText('red', `\nError: current Node.js version (${process.version}) does not meet the requirements, required Node.js version ${requiredNodeVersion} .\n`))
    process.exit(1)
  }
}
