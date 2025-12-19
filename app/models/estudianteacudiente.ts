import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import Estudiante from './estudiante.js'
import Acudiente from './acudiente.js'

export default class Estudianteacudiente extends BaseModel {
  public static table = 'estudiante_acudiente'

  @column({ columnName: 'estudiante_id', isPrimary: true })
  declare estudianteId: number

  @column({ columnName: 'acudiente_id', isPrimary: true })
  declare acudienteId: number

  @column()
  declare relacion: 'madre' | 'padre' | 'cuidador' | 'otro'

  @column({ columnName: 'es_principal' })
  declare esPrincipal: boolean

  @column.dateTime({ columnName: 'creado_en', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'actualizado_en', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Estudiante, {
    foreignKey: 'estudianteId',
  })
  declare estudiante: BelongsTo<typeof Estudiante>

  @belongsTo(() => Acudiente, {
    foreignKey: 'acudienteId',
  })
  declare acudiente: BelongsTo<typeof Acudiente>
}