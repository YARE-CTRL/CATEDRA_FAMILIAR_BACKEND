import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

import Institucion from './institucion.js'
import Asignacion from './asignacion.js'
import Calificacion from './calificacion.js'

export default class Periodo extends BaseModel {
  public static table = 'periodos'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  @column.dateTime({ columnName: 'fecha_inicio' })
  declare fechaInicio: DateTime

  @column.dateTime({ columnName: 'fecha_fin' })
  declare fechaFin: DateTime

  @column({ columnName: 'institucion_id' })
  declare institucionId: number

  @column({ columnName: 'esta_activo' })
  declare estaActivo: boolean

  @column.dateTime({ columnName: 'creado_en', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'actualizado_en', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Institucion, {
    foreignKey: 'institucionId',
  })
  declare institucion: BelongsTo<typeof Institucion>

  @hasMany(() => Asignacion)
  declare asignaciones: HasMany<typeof Asignacion>

  @hasMany(() => Calificacion)
  declare calificaciones: HasMany<typeof Calificacion>
}