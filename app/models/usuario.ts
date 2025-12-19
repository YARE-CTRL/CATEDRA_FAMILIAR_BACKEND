import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

import Acudiente from './acudiente.js'
import Docente from './docente.js'
import Bancotarea from './bancotarea.js'
import Notificacion from './notificacion.js'

export default class Usuario extends BaseModel {
  public static table = 'usuarios'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare correo: string

  @column({ columnName: 'contrasena_hash' })
  declare contrasenaHash: string

  @column()
  declare rol: 'administrador' | 'docente' | 'acudiente' | 'estudiante'

  @column({ columnName: 'esta_activo' })
  declare estaActivo: boolean

  @column({ columnName: 'debe_cambiar_contrasena' })
  declare debeCambiarContrasena: boolean

  @column({ columnName: 'token_fcm' })
  declare tokenFcm?: string | null

  @column.dateTime({ columnName: 'ultimo_ingreso' })
  declare ultimoIngreso?: DateTime | null

  @column.dateTime({ columnName: 'creado_en', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'actualizado_en', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime({ columnName: 'eliminado_en' })
  declare eliminadoEn?: DateTime | null

  @hasMany(() => Acudiente)
  declare acudientes: HasMany<typeof Acudiente>

  @hasMany(() => Docente)
  declare docentes: HasMany<typeof Docente>

  @hasMany(() => Bancotarea, {
    foreignKey: 'creadoPorId',
  })
  declare bancoTareasCreadas: HasMany<typeof Bancotarea>

  @hasMany(() => Notificacion, {
    foreignKey: 'destinatarioId',
  })
  declare notificaciones: HasMany<typeof Notificacion>
}