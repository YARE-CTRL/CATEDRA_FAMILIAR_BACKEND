import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

import Municipio from './municipio.js'
import Curso from './curso.js'
import Docente from './docente.js'
import Periodo from './periodo.js'
import Asignacion from './asignacion.js'
import Entrega from './entrega.js'
import Calificacion from './calificacion.js'
import Notificacion from './notificacion.js'

export default class Institucion extends BaseModel {
  public static table = 'instituciones'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  @column()
  declare telefono?: string | null

  @column()
  declare correo?: string | null

  @column()
  declare direccion?: string | null

  @column()
  declare naturaleza: 'publica' | 'privada'

  @column({ columnName: 'municipio_id' })
  declare municipioId: number

  @column.dateTime({ columnName: 'creado_en', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'actualizado_en', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime({ columnName: 'eliminado_en' })
  declare eliminadoEn?: DateTime | null

  @belongsTo(() => Municipio, {
    foreignKey: 'municipioId',
  })
  declare municipio: BelongsTo<typeof Municipio>

  @hasMany(() => Curso)
  declare cursos: HasMany<typeof Curso>

  @hasMany(() => Docente)
  declare docentes: HasMany<typeof Docente>

  @hasMany(() => Periodo)
  declare periodos: HasMany<typeof Periodo>

  @hasMany(() => Asignacion)
  declare asignaciones: HasMany<typeof Asignacion>

  @hasMany(() => Entrega)
  declare entregas: HasMany<typeof Entrega>

  @hasMany(() => Calificacion)
  declare calificaciones: HasMany<typeof Calificacion>

  @hasMany(() => Notificacion)
  declare notificaciones: HasMany<typeof Notificacion>
}