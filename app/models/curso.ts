import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'

import Grado from './grado.js'
import Institucion from './institucion.js'
import Estudiante from './estudiante.js'
import Docente from './docente.js'
import Asignacion from './asignacion.js'

export default class Curso extends BaseModel {
  public static table = 'cursos'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  @column({ columnName: 'grado_id' })
  declare gradoId: number

  @column()
  declare jornada: 'diurna' | 'nocturna' | 'fin_semana'

  @column({ columnName: 'institucion_id' })
  declare institucionId: number

  @column.dateTime({ columnName: 'creado_en', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'actualizado_en', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Grado, {
    foreignKey: 'gradoId',
  })
  declare grado: BelongsTo<typeof Grado>

  @belongsTo(() => Institucion, {
    foreignKey: 'institucionId',
  })
  declare institucion: BelongsTo<typeof Institucion>

  @hasMany(() => Estudiante)
  declare estudiantes: HasMany<typeof Estudiante>

  @manyToMany(() => Docente, {
    pivotTable: 'docente_curso',
    pivotForeignKey: 'curso_id',
    pivotRelatedForeignKey: 'docente_id',
    pivotColumns: ['es_director', 'creado_en'],
  })
  declare docentes: ManyToMany<typeof Docente>

  @hasMany(() => Asignacion)
  declare asignaciones: HasMany<typeof Asignacion>
}