import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import Docente from './docente.js'
import Curso from './curso.js'

export default class Docentecurso extends BaseModel {
  public static table = 'docente_curso'

  @column({ columnName: 'docente_id', isPrimary: true })
  declare docenteId: number

  @column({ columnName: 'curso_id', isPrimary: true })
  declare cursoId: number

  @column({ columnName: 'es_director' })
  declare esDirector: boolean

  @column.dateTime({ columnName: 'creado_en', autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => Docente, {
    foreignKey: 'docenteId',
  })
  declare docente: BelongsTo<typeof Docente>

  @belongsTo(() => Curso, {
    foreignKey: 'cursoId',
  })
  declare curso: BelongsTo<typeof Curso>
}