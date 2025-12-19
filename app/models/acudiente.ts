import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'

import Usuario from './usuario.js'
import Estudiante from './estudiante.js'
import Estudianteacudiente from './estudianteacudiente.js'
import Entrega from './entrega.js'

export default class Acudiente extends BaseModel {
  public static table = 'acudientes'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombres: string

  @column()
  declare apellidos: string

  @column({ columnName: 'tipo_documento' })
  declare tipoDocumento: 'cedula' | 'tarjeta_identidad' | 'pasaporte' | 'cedula_extranjeria'

  @column({ columnName: 'numero_documento' })
  declare numeroDocumento: string

  @column()
  declare telefono: string

  @column({ columnName: 'telefono_alternativo' })
  declare telefonoAlternativo?: string | null

  @column()
  declare correo?: string | null

  @column()
  declare direccion?: string | null

  @column()
  declare parentesco?: 'madre' | 'padre' | 'cuidador' | 'abuelo_a' | 'tio_a' | 'hermano_a' | 'otro' | null

  @column()
  declare ocupacion?: string | null

  @column({ columnName: 'tipo_trabajo' })
  declare tipoTrabajo?: 'formal' | 'informal' | 'no_aplica' | null

  @column({ columnName: 'nivel_educativo' })
  declare nivelEducativo?:
    | 'ninguno'
    | 'primaria_incompleta'
    | 'primaria_completa'
    | 'bachillerato_incompleto'
    | 'bachillerato_completo'
    | 'tecnico'
    | 'tecnologico'
    | 'profesional'
    | 'posgrado'
    | null

  @column({ columnName: 'aporta_economia' })
  declare aportaEconomia?: boolean | null

  @column({ columnName: 'horario_trabajo' })
  declare horarioTrabajo?: string | null

  @column({ columnName: 'usuario_id' })
  declare usuarioId: number

  @column.dateTime({ columnName: 'creado_en', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'actualizado_en', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime({ columnName: 'eliminado_en' })
  declare eliminadoEn?: DateTime | null

  @belongsTo(() => Usuario, {
    foreignKey: 'usuarioId',
  })
  declare usuario: BelongsTo<typeof Usuario>

  @manyToMany(() => Estudiante, {
    pivotTable: 'estudiante_acudiente',
    pivotForeignKey: 'acudiente_id',
    pivotRelatedForeignKey: 'estudiante_id',
    pivotColumns: ['relacion', 'es_principal', 'creado_en'],
  })
  declare estudiantes: ManyToMany<typeof Estudiante>

  @hasMany(() => Estudianteacudiente, {
    foreignKey: 'acudienteId',
  })
  declare estudianteAcudiente: HasMany<typeof Estudianteacudiente>

  @hasMany(() => Entrega)
  declare entregas: HasMany<typeof Entrega>
}