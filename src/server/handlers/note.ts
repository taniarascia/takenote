import { Request, Response } from 'express'
import puppeteer from 'puppeteer'
import marked from 'marked'

export default {
  download: async (request: Request, response: Response) => {
    const {
      body: { notes, categories },
    } = request
    const element = marked(notes[0].text)
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
    const page = await browser.newPage()
    await page.setContent(element)
    await page.pdf({ format: 'a4' }).then((pdf) => {
      response.setHeader('Content-Disposition', `attachment; filename=123.pdf`)
      response.send(pdf)
    })
  },
}
