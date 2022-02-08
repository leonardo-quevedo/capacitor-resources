#!/usr/bin/env node

/**
 * @license MIT
 * @version 1.0.0
 * @author Leonardo Quevedo
 */

require('colors')
const path = require('path')
const paths = require('../utils/paths')
const { exec } = require('shelljs')

const { log } = console

const display = {
  info: str => {
    log(str)
  },
  success: str => {
    str = ' ' + '✓ '.green + ' ' + str
    log(str)
  },
  error: str => {
    str = ' ' + '× '.red + ' ' + str
    log(str)
  },
  header: str => {
    log('')
    log(str.yellow)
  }
}

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const copyAndroid = path.join(__dirname, './platforms/android/index')
      const copyIOS = path.join(__dirname, './platforms/ios/index')
      // display.header('Copying resources to native projects...')
      await exec(`npx cross-env CAPACITOR_PROJECT_ROOT="${paths.getRootPath()}" node "${copyAndroid}"`)
      // display.success('Copied android resources')
      await exec(`npx cross-env CAPACITOR_PROJECT_ROOT="${paths.getRootPath()}" node "${copyIOS}"`)
      // display.success('Copied iOS resources')
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}
