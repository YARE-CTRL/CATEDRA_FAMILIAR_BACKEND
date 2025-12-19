import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

import Departamento from './departamento.js'
import Institucion from './institucion.js'

export default class Municipio extends BaseModel {
  public static table = 'municipios'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  @column({ columnName: 'departamento_id' })
  declare departamentoId: number

  @column()
  declare codigo?: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Departamento, {
    foreignKey: 'departamentoId',
  })
  declare departamento: BelongsTo<typeof Departamento>

  @hasMany(() => Institucion)
  declare instituciones: HasMany<typeof Institucion>
}