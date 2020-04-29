const path = require('path')
const fs = require('fs')

const distDirection = path.join(__dirname, '../dist')

try {
  fs.rmdirSync(distDirection, { recursive: true })
} catch (err) {

}
