import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

import Curso from './curso.js'
import Docente from './docente.js'

export default class Grado extends BaseModel {
  public static table = 'grados'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  @column()
  declare orden?: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Curso)
  declare cursos: HasMany<typeof Curso>

  @hasMany(() => Docente, {
    foreignKey: 'gradoAsignadoId',
  })
  declare docentesAsignados: HasMany<typeof Docente>
}