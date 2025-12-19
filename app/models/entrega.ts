import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'

import Asignacion from './asignacion.js'
import Estudiante from './estudiante.js'
import Acudiente from './acudiente.js'
import Institucion from './institucion.js'
import Calificacion from './calificacion.js'

export default class Entrega extends BaseModel {
  public static table = 'entregas'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'asignacion_id' })
  declare asignacionId: number

  @column({ columnName: 'estudiante_id' })
  declare estudianteId: number

  @column({ columnName: 'acudiente_id' })
  declare acudienteId: number

  @column({ columnName: 'evidencia_texto' })
  declare evidenciaTexto?: string | null

  @column({ columnName: 'archivos_url' })
  declare archivosUrl?: any | null

  @column.dateTime({ columnName: 'fecha_entrega', autoCreate: true })
  declare fechaEntrega: DateTime

  @column()
  declare estado: 'pendiente' | 'enviada' | 'en_revision' | 'aprobada' | 'rechazada'

  @column({ columnName: 'institucion_id' })
  declare institucionId?: number | null

  @column.dateTime({ columnName: 'creado_en', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'actualizado_en', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Asignacion, { foreignKey: 'asignacionId' })
  declare asignacion: BelongsTo<typeof Asignacion>

  @belongsTo(() => Estudiante, { foreignKey: 'estudianteId' })
  declare estudiante: BelongsTo<typeof Estudiante>

  @belongsTo(() => Acudiente, { foreignKey: 'acudienteId' })
  declare acudiente: BelongsTo<typeof Acudiente>

  @belongsTo(() => Institucion, { foreignKey: 'institucionId' })
  declare institucion: BelongsTo<typeof Institucion>

  @hasOne(() => Calificacion)
  declare calificacion: HasOne<typeof Calificacion>
}