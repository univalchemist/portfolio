import { Controller, Get, Post, Header, Body, Res } from '@nestjs/common'
import { Response } from 'express'

import { CVBData } from '@modules/shared/types'
import { AppService } from './app.service'

@Controller()
export class AppController {
  private pdfData: CVBData

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Post('cv/download')
  @Header('Content-Type', 'application/pdf')
  async downloadCV(@Body() data: CVBData, @Res() response: Response) {
    this.pdfData = data

    const pdfBlob = await this.appService.createCV()
    response.setHeader(
      'Content-Disposition',
      `attachment; filename=entry-${data.userName}.pdf`,
    )
    response.send(pdfBlob)
  }

  @Get('renderCv')
  async renderCv(@Res() res: Response) {
    const data = { ...(this.pdfData || {}) }
    this.pdfData = undefined

    return res.render(`cv`, { data })
  }
}
