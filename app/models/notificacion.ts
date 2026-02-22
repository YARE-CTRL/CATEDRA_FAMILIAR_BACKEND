import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import Usuario from './usuario.js'
import Asignacion from './asignacion.js'
import Institucion from './institucion.js'

export default class Notificacion extends BaseModel {
  public static table = 'notificaciones'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'destinatario_id' })
  declare destinatarioId: number

  @column()
  declare tipo: 'email' | 'sms' | 'push' | 'sistema'

  @column()
  declare asunto?: string | null

  @column()
  declare mensaje: string

  @column()
  declare estado: 'pendiente' | 'enviada' | 'fallida' | 'leida'

  @column.dateTime({ columnName: 'enviado_en' })
  declare enviadoEn?: DateTime | null

  @column.dateTime({ columnName: 'leido_en' })
  declare leidoEn?: DateTime | null

  @column({ columnName: 'asignacion_id' })
  declare asignacionId?: number | null

  @column({ columnName: 'metadatos' })
  declare metadatos?: any | null

  @column({ columnName: 'institucion_id' })
  declare institucionId?: number | null

  @column.dateTime({ columnName: 'creado_en', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'actualizado_en', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Usuario, { foreignKey: 'destinatarioId' })
  declare destinatario: BelongsTo<typeof Usuario>

  @belongsTo(() => Asignacion, { foreignKey: 'asignacionId' })
  declare asignacion: BelongsTo<typeof Asignacion>

  @belongsTo(() => Institucion, { foreignKey: 'institucionId' })
  declare institucion: BelongsTo<typeof Institucion>
}