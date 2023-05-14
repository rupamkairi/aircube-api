import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Storage from './Storage'

export default class Folder extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public path?: string

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
