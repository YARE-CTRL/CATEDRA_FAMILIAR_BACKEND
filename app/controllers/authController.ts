import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

import Usuario from '#models/usuario'

export default class AuthController {
  private async handleLogin(
    ctx: HttpContext,
    rolEsperado: 'administrador' | 'docente' | 'acudiente'
  ) {
    const { request, response, auth } = ctx as any
    const correo = request.input('correo') as string | undefined
    const contrasena = request.input('contrasena') as string | undefined

    if (!correo || !contrasena) {
      return response.badRequest({
        message: 'Correo y contraseña son requeridos',
      })
    }

    const usuario = await Usuario.query().where('correo', correo).first()

    if (!usuario) {
      return response.unauthorized({ message: 'Credenciales inválidas' })
    }

    if (!usuario.estaActivo) {
      return response.forbidden({ message: 'Usuario inactivo' })
    }

    if (usuario.rol !== rolEsperado) {
      return response.forbidden({ message: 'Rol no autorizado para este inicio de sesión' })
    }

    const passwordOk = await hash.verify(usuario.contrasenaHash, contrasena)

    if (!passwordOk) {
      return response.unauthorized({ message: 'Credenciales inválidas' })
    }

    const token = await auth.use('api').generate(usuario)

    return {
      token,
      usuario: {
        id: usuario.id,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    }
  }

  public async loginAdmin(ctx: HttpContext) {
    return this.handleLogin(ctx, 'administrador')
  }

  public async loginDocente(ctx: HttpContext) {
    return this.handleLogin(ctx, 'docente')
  }

  public async loginAcudiente(ctx: HttpContext) {
    return this.handleLogin(ctx, 'acudiente')
  }

  public async logout(ctx: HttpContext) {
    const { auth, response } = ctx as any
    try {
      await auth.use('api').logout()
    } catch {
      // ignoramos errores de logout (por ejemplo, sin token)
    }

    return response.ok({ message: 'Sesión cerrada' })
  }

  public async register(ctx: HttpContext) {
    const { request, response } = ctx as any

    const correo = request.input('correo') as string | undefined
    const contrasena = request.input('contrasena') as string | undefined
    const rol = request.input('rol') as
      | 'administrador'
      | 'docente'
      | 'acudiente'
      | 'estudiante'
      | undefined

    if (!correo || !contrasena || !rol) {
      return response.badRequest({
        message: 'correo, contrasena y rol son requeridos',
      })
    }

    const rolesPermitidos: Array<'administrador' | 'docente' | 'acudiente' | 'estudiante'> = [
      'administrador',
      'docente',
      'acudiente',
      'estudiante',
    ]

    if (!rolesPermitidos.includes(rol)) {
      return response.badRequest({ message: 'Rol no válido' })
    }

    const existente = await Usuario.query().where('correo', correo).first()
    if (existente) {
      return response.conflict({ message: 'El correo ya está registrado' })
    }

    const contrasenaHash = await hash.make(contrasena)

    const usuario = await Usuario.create({
      correo,
      contrasenaHash,
      rol,
      estaActivo: true,
      debeCambiarContrasena: false,
    })

    return response.created({
      id: usuario.id,
      correo: usuario.correo,
      rol: usuario.rol,
    })
  }
}
