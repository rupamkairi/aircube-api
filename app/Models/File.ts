import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Storage from './Storage'
import Folder from './Folder'

export default class File extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public path?: string

  @column()
  public size: bigint

  @column({})
  public metadata?: any

  @column()
  public storageId: number
  @belongsTo(() => Storage)
  public storage: BelongsTo<typeof Storage>

  @column()
  public folderId: number
  @belongsTo(() => Folder)
  public folder: BelongsTo<typeof Folder>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
