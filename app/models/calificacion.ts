import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import Entrega from './entrega.js'
import Estudiante from './estudiante.js'
import Asignacion from './asignacion.js'
import Docente from './docente.js'
import Periodo from './periodo.js'
import Institucion from './institucion.js'

export default class Calificacion extends BaseModel {
  public static table = 'calificaciones'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'entrega_id' })
  declare entregaId: number

  @column({ columnName: 'estudiante_id' })
  declare estudianteId: number

  @column({ columnName: 'asignacion_id' })
  declare asignacionId: number

  @column()
  declare nota?: string | null

  @column()
  declare escala: 'numerica' | 'cualitativa'

  @column({ columnName: 'nota_cualitativa' })
  declare notaCualitativa?: 'superior' | 'alto' | 'basico' | 'bajo' | null

  @column()
  declare retroalimentacion?: string | null

  @column({ columnName: 'calificado_por' })
  declare calificadoPorId: number

  @column.dateTime({ columnName: 'calificado_en', autoCreate: true })
  declare calificadoEn: DateTime

  @column({ columnName: 'periodo_id' })
  declare periodoId: number

  @column({ columnName: 'institucion_id' })
  declare institucionId?: number | null

  @column.dateTime({ columnName: 'creado_en', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'actualizado_en', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Entrega, { foreignKey: 'entregaId' })
  declare entrega: BelongsTo<typeof Entrega>

  @belongsTo(() => Estudiante, { foreignKey: 'estudianteId' })
  declare estudiante: BelongsTo<typeof Estudiante>

  @belongsTo(() => Asignacion, { foreignKey: 'asignacionId' })
  declare asignacion: BelongsTo<typeof Asignacion>

  @belongsTo(() => Docente, { foreignKey: 'calificadoPorId' })
  declare calificadoPor: BelongsTo<typeof Docente>

  @belongsTo(() => Periodo, { foreignKey: 'periodoId' })
  declare periodo: BelongsTo<typeof Periodo>

  @belongsTo(() => Institucion, { foreignKey: 'institucionId' })
  declare institucion: BelongsTo<typeof Institucion>
}