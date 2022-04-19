import { Injectable, BadRequestException } from '@nestjs/common'
import { ReadStream } from 'fs-capacitor'
import { ConfigService } from '@nestjs/config'

import { getEnvironment } from '@modules/shared/utils'
import config from '@root/config.json'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dropboxV2Api = require('dropbox-v2-api')

@Injectable()
export default class DropboxApi {
  private readonly environment: string
  private readonly dropbox: any

  constructor(private readonly configService: ConfigService) {
    this.environment = getEnvironment(this.configService.get<string>('ENV'))

    this.dropbox = dropboxV2Api.authenticate({
      token: config[this.environment].dropBoxToken,
    })
  }

  public async upload(
    path: string,
    readStream: ReadStream,
  ): Promise<{ success: boolean; url: string }> {
    const res = await new Promise(async (resolve, reject) =>
      this.dropbox(
        {
          resource: 'files/upload',
          parameters: {
            path,
          },
          readStream,
        },
        err => {
          if (err) reject(false)
          else resolve(true)
        },
      ),
    )

    if (res) {
      return await new Promise(async (resolve, reject) =>
        this.dropbox(
          {
            resource: 'sharing/create_shared_link_with_settings',
            parameters: {
              path,
              settings: {
                requested_visibility: 'public',
                audience: 'public',
                access: 'viewer',
              },
            },
          },
          (err, result) => {
            if (err) reject({ success: false, link: undefined })
            else resolve({ success: true, url: `${result.url}&raw=1` })
          },
        ),
      )
    }

    return { success: false, url: undefined }
  }

  public async delete(paths: string[]): Promise<void> {
    if (paths.length) {
      await Promise.all(
        paths.map(
          async path =>
            await new Promise(async (resolve, reject) =>
              this.dropbox(
                {
                  resource: 'files/delete',
                  parameters: {
                    path,
                  },
                },
                err => {
                  if (err) reject(false)
                  else resolve(true)
                },
              ),
            ),
        ),
      )
    }
  }

  public async update(
    oldPath: string | undefined,
    path: string,
    mimetype: string,
    readStream: ReadStream,
  ): Promise<{ success: boolean; url: string }> {
    if (!mimetype.includes('image')) {
      throw new BadRequestException('Unsupported file.')
    }
    if (oldPath) await this.delete([oldPath])

    return await this.upload(path, readStream)
  }
}
