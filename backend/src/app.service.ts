import { Injectable, BadRequestException } from '@nestjs/common'
import puppeteer, { PDFOptions } from 'puppeteer'
import { ConfigService } from '@nestjs/config'

import { getEnvironment } from '@modules/shared/utils'

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    return 'Hi, this is portfolio page BE.'
  }

  async createCV(): Promise<Buffer> {
    try {
      const options: PDFOptions = {
        format: 'a4',
        headerTemplate: '',
        footerTemplate: '',
        displayHeaderFooter: false,
        margin: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
        printBackground: true,
      }
      const browser = await puppeteer.launch({
        executablePath:
          getEnvironment(this.configService.get<string>('ENV')) === 'dev'
            ? undefined
            : '/usr/bin/chromium-browser',
        args: ['--no-sandbox'],
        headless: true,
        // defaultViewport: {
        //   width: 794, // 210mm A4
        //   height: 1124, // 297mm A4
        //   deviceScaleFactor: 2,
        // },
      })
      const page = await browser.newPage()
      const port = this.configService.get<string>('PORT') || '5000'
      const host = `http://localhost:${port}`
      await page.goto(`${host}/renderCv`, {
        waitUntil: 'networkidle0',
      })
      const pdf = await page.pdf(options)
      await browser.close()
      return pdf
    } catch (e) {
      console.log(e)
      throw new BadRequestException(`Generate pdf error`)
    }
  }
}
