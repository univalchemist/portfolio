import { ObjectType } from '@nestjs/graphql'

import { Resume } from '@modules/resume/resume.dto'
import { DatumResponse, DataResponse } from '.'

@ObjectType()
export class ResumeResponse extends DatumResponse(Resume) {}

@ObjectType()
export class ResumesResponse extends DataResponse(Resume) {}
