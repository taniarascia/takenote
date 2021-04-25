import { Request, Response } from 'express'
import puppeteer from 'puppeteer'
import marked from 'marked'
import JSZip from 'jszip'

import { NoteItem, CategoryItem } from '@/types'

export const getNoteTitle = (text: string): string => {
  // Remove whitespace from both ends
  // Get the first n characters
  // Remove # from the title in the case of using markdown headers in your title
  const noteText = text.trim().match(/[^#]{1,45}/)

  // Get the first line of text after any newlines
  // In the future, this should break on a full word
  return noteText ? noteText[0].trim().split(/\r?\n/)[0] : 'New note'
}

export const noteWithFrontmatter = (note: NoteItem, category?: CategoryItem): string =>
  `---
title: ${getNoteTitle(note.text)}
created: ${note.created}
lastUpdated: ${note.lastUpdated}
category: ${category?.name ?? ''}
---

${note.text}`

export default {
  download: async (request: Request, response: Response) => {
    const {
      body: { notes },
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
  downloadAll: async (request: Request, response: Response) => {
    const {
      body: { notes },
    } = request
    const pdfFiles: any = []
    const fileNames: string[] = []
    const zip = new JSZip()
    await Promise.all(
      notes.map(async (note: any) => {
        const element = marked(note.text)
        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
        const page = await browser.newPage()
        await page.setContent(element)
        const pdf = await page.pdf({ format: 'a4' })
        pdfFiles.push(pdf)
        fileNames.push(`${getNoteTitle(note.text)} (${note.id.substring(0, 6)}).pdf`)

        return pdf
      })
    )

    pdfFiles.map((files: any, index: number) => zip.file(fileNames[index], files))
    zip.generateAsync({ type: 'nodebuffer' }).then((content) => {
      response.setHeader('Content-Disposition', `attachment; filename=notes.zip`)
      response.send(content)
    })
  },
}
