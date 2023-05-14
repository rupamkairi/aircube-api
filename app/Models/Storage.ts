import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Folder from './Folder'
import File from './File'

export default class Storage extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public size: bigint

  @column()
  public used: bigint

  @column()
  public free: bigint

  @column()
  public userId: number
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Folder)
  public folders: HasMany<typeof Folder>

  @hasMany(() => File)
  public files: HasMany<typeof File>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
