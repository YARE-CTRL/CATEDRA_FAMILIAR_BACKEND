import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

import Categoria from './categoria.js'
import Usuario from './usuario.js'
import Asignacion from './asignacion.js'

export default class Bancotarea extends BaseModel {
  public static table = 'banco_tareas'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare titulo: string

  @column()
  declare descripcion: string

  @column()
  declare enlace?: string | null

  @column({ columnName: 'categoria_id' })
  declare categoriaId: number

  @column({ columnName: 'creado_por' })
  declare creadoPorId?: number | null

  @column.dateTime({ columnName: 'creado_en', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'actualizado_en', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Categoria, {
    foreignKey: 'categoriaId',
  })
  declare categoria: BelongsTo<typeof Categoria>

  @belongsTo(() => Usuario, {
    foreignKey: 'creadoPorId',
  })
  declare creador: BelongsTo<typeof Usuario>

  @hasMany(() => Asignacion)
  declare asignaciones: HasMany<typeof Asignacion>
}