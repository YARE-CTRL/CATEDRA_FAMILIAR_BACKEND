import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

import Bancotarea from './bancotarea.js'
import Asignacion from './asignacion.js'

export default class Categoria extends BaseModel {
  public static table = 'categorias'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  @column()
  declare descripcion?: string | null

  @column()
  declare color?: string | null

  @column()
  declare icono?: string | null

  @hasMany(() => Bancotarea)
  declare bancoTareas: HasMany<typeof Bancotarea>

  @hasMany(() => Asignacion)
  declare asignaciones: HasMany<typeof Asignacion>
}