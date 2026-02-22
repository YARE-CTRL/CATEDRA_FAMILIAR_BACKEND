import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'

import Curso from './curso.js'
import Acudiente from './acudiente.js'
import Estudianteacudiente from './estudianteacudiente.js'
import Entrega from './entrega.js'
import Calificacion from './calificacion.js'

export default class Estudiante extends BaseModel {
  public static table = 'estudiantes'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombres: string

  @column()
  declare apellidos: string

  @column({ columnName: 'tipo_documento' })
  declare tipoDocumento: 'tarjeta_identidad' | 'cedula' | 'pasaporte' | 'registro_civil'

  @column({ columnName: 'numero_documento' })
  declare numeroDocumento: string

  @column.dateTime({ columnName: 'fecha_nacimiento' })
  declare fechaNacimiento: DateTime

  @column()
  declare sexo: 'masculino' | 'femenino' | 'otro'

  @column({ columnName: 'grupo_sanguineo' })
  declare grupoSanguineo?: 'A' | 'B' | 'AB' | 'O' | null

  @column()
  declare rh?: '+' | '-' | null

  @column({ columnName: 'pais_nacimiento' })
  declare paisNacimiento?: string | null

  @column({ columnName: 'ciudad_nacimiento' })
  declare ciudadNacimiento?: string | null

  @column()
  declare estrato?: number | null

  @column()
  declare etnia?: string | null

  @column()
  declare eps?: string | null

  @column({ columnName: 'correo_estudiante' })
  declare correoEstudiante?: string | null

  @column({ columnName: 'curso_id' })
  declare cursoId: number

  @column.dateTime({ columnName: 'creado_en', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'actualizado_en', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime({ columnName: 'eliminado_en' })
  declare eliminadoEn?: DateTime | null

  @belongsTo(() => Curso, {
    foreignKey: 'cursoId',
  })
  declare curso: BelongsTo<typeof Curso>

  @manyToMany(() => Acudiente, {
    pivotTable: 'estudiante_acudiente',
    pivotForeignKey: 'estudiante_id',
    pivotRelatedForeignKey: 'acudiente_id',
    pivotColumns: ['relacion', 'es_principal', 'creado_en'],
  })
  declare acudientes: ManyToMany<typeof Acudiente>

  @hasMany(() => Estudianteacudiente, {
    foreignKey: 'estudianteId',
  })
  declare estudianteAcudiente: HasMany<typeof Estudianteacudiente>

  @hasMany(() => Entrega)
  declare entregas: HasMany<typeof Entrega>

  @hasMany(() => Calificacion)
  declare calificaciones: HasMany<typeof Calificacion>
}