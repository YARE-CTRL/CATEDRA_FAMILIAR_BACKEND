import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'

import Grado from './grado.js'
import Institucion from './institucion.js'
import Usuario from './usuario.js'
import Curso from './curso.js'
import Asignacion from './asignacion.js'
import Calificacion from './calificacion.js'

export default class Docente extends BaseModel {
  public static table = 'docentes'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombres: string

  @column()
  declare apellidos: string

  @column({ columnName: 'tipo_documento' })
  declare tipoDocumento: 'cedula' | 'cedula_extranjeria' | 'pasaporte'

  @column({ columnName: 'numero_documento' })
  declare numeroDocumento: string

  @column()
  declare telefono: string

  @column({ columnName: 'telefono_emergencia' })
  declare telefonoEmergencia?: string | null

  @column({ columnName: 'persona_emergencia' })
  declare personaEmergencia?: string | null

  @column()
  declare correo: string

  @column()
  declare direccion?: string | null

  @column()
  declare rol: 'docente_aula' | 'orientador' | 'coordinador' | 'rector' | 'ptafi'

  @column({ columnName: 'es_director_grado' })
  declare esDirectorGrado: boolean

  @column({ columnName: 'grado_asignado' })
  declare gradoAsignadoId?: number | null

  @column({ columnName: 'area_que_orienta' })
  declare areaQueOrienta?: string | null

  @column({ columnName: 'centro_interes' })
  declare centroInteres?: string | null

  @column({ columnName: 'institucion_id' })
  declare institucionId: number

  @column({ columnName: 'usuario_id' })
  declare usuarioId: number

  @column.dateTime({ columnName: 'creado_en', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'actualizado_en', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime({ columnName: 'eliminado_en' })
  declare eliminadoEn?: DateTime | null

  @belongsTo(() => Grado, {
    foreignKey: 'gradoAsignadoId',
  })
  declare gradoAsignado: BelongsTo<typeof Grado>

  @belongsTo(() => Institucion, {
    foreignKey: 'institucionId',
  })
  declare institucion: BelongsTo<typeof Institucion>

  @belongsTo(() => Usuario, {
    foreignKey: 'usuarioId',
  })
  declare usuario: BelongsTo<typeof Usuario>

  @manyToMany(() => Curso, {
    pivotTable: 'docente_curso',
    pivotForeignKey: 'docente_id',
    pivotRelatedForeignKey: 'curso_id',
    pivotColumns: ['es_director', 'creado_en'],
  })
  declare cursos: ManyToMany<typeof Curso>

  @hasMany(() => Asignacion)
  declare asignaciones: HasMany<typeof Asignacion>

  @hasMany(() => Calificacion, {
    foreignKey: 'calificadoPorId',
  })
  declare calificaciones: HasMany<typeof Calificacion>
}