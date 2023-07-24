import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import PyFileReadHelper from 'Helpers/PyFileReadHelper'

export default class FilesController {
  public async uploadAndProcessFile({ request, logger }: HttpContextContract) {
    const file = request.file('file') // Assuming the input field name is 'file'
    const { fileType } = request.all()
    logger.info('Hello')

    if (file) {
      logger.info('File found')
      // Move the uploaded file to a temporary directory
      await file.move(Application.tmpPath('uploads'), {
        overwrite: true,
      })

      if (file.hasErrors) {
        logger.info('File Upload Error', file.errors)
        return file.errors
      }

      const filePath = file.filePath

      if (filePath) {
        const data = await PyFileReadHelper.read(filePath, fileType)
        return data
      }

      //   // Assuming you have the Python script (process_file.py) in the same directory as this JS file
      //   const pythonScript = Application.appRoot + '\\process_file.py'
      //   logger.info(pythonScript)

      //   const pythonProcess = spawn('python', [pythonScript, filePath, fileType])

      //   let outputJSON = ''
      //   pythonProcess.stdout.on('data', (data) => {
      //     outputJSON += data
      //   })

      //   pythonProcess.stdout.on('data', function (data) {
      //     const jsonData = JSON.parse(data)
      //     logger.info(jsonData)
      //     logger.info('Python Data Found')
      //     return jsonData
      //     // logger.info(data.toString())
      //   })

      //   pythonProcess.on('close', (code) => {
      //     if (code === 0) {
      //       // Successfully executed the Python script
      //       const jsonData = JSON.parse(outputJSON)
      //       return response.send(jsonData)
      //     } else {
      //       return response.status(500).send({ error: 'Failed to process the file' })
      //     }
      //   })
    } else {
      logger.info('File Not Found')
    }
  }
}
