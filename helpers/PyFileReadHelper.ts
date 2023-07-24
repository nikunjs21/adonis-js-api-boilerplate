/* eslint-disable prettier/prettier */
import Application from '@ioc:Adonis/Core/Application'
const { spawn } = require('node:child_process')

export default class PyFileReadHelper {
  public static read(filePath: string, fileType: string): Promise<Object> {
    return new Promise((resolve, reject) => {
      const pythonScript = Application.appRoot + '\\process_file.py'
      const pythonProcess = spawn('python', [pythonScript, filePath, fileType])

      pythonProcess.stdout.on('data', (data) => {
        const stats = data.toString()
        resolve(stats)
      })

      pythonProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`)
        reject(data.toString())
      })

      pythonProcess.stdin.write(filePath)
      pythonProcess.stdin.end()
    })
  }
}
