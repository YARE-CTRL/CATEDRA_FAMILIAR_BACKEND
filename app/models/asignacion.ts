import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

import Curso from './curso.js'
import Docente from './docente.js'
import Categoria from './categoria.js'
import Bancotarea from './bancotarea.js'
import Periodo from './periodo.js'
import Institucion from './institucion.js'
import Entrega from './entrega.js'
import Calificacion from './calificacion.js'
import Notificacion from './notificacion.js'

export default class Asignacion extends BaseModel {
  public static table = 'asignaciones'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare titulo: string

  @column()
  declare descripcion: string

  @column()
  declare frecuencia: 'semanal' | 'quincenal' | 'mensual' | 'unica'

  @column.dateTime({ columnName: 'fecha_inicio' })
  declare fechaInicio: DateTime

  @column.dateTime({ columnName: 'fecha_vencimiento' })
  declare fechaVencimiento?: DateTime | null

  @column({ columnName: 'incluir_en_boletin' })
  declare incluirEnBoletin: boolean

  @column({ columnName: 'curso_id' })
  declare cursoId: number

  @column({ columnName: 'docente_id' })
  declare docenteId: number

  @column({ columnName: 'categoria_id' })
  declare categoriaId?: number | null

  @column({ columnName: 'banco_tarea_id' })
  declare bancoTareaId?: number | null

  @column({ columnName: 'periodo_id' })
  declare periodoId: number

  @column({ columnName: 'institucion_id' })
  declare institucionId?: number | null

  @column.dateTime({ columnName: 'creado_en', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'actualizado_en', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Curso, { foreignKey: 'cursoId' })
  declare curso: BelongsTo<typeof Curso>

  @belongsTo(() => Docente, { foreignKey: 'docenteId' })
  declare docente: BelongsTo<typeof Docente>

  @belongsTo(() => Categoria, { foreignKey: 'categoriaId' })
  declare categoria: BelongsTo<typeof Categoria>

  @belongsTo(() => Bancotarea, { foreignKey: 'bancoTareaId' })
  declare bancoTarea: BelongsTo<typeof Bancotarea>

  @belongsTo(() => Periodo, { foreignKey: 'periodoId' })
  declare periodo: BelongsTo<typeof Periodo>

  @belongsTo(() => Institucion, { foreignKey: 'institucionId' })
  declare institucion: BelongsTo<typeof Institucion>

  @hasMany(() => Entrega)
  declare entregas: HasMany<typeof Entrega>

  @hasMany(() => Calificacion)
  declare calificaciones: HasMany<typeof Calificacion>

  @hasMany(() => Notificacion)
  declare notificaciones: HasMany<typeof Notificacion>
}