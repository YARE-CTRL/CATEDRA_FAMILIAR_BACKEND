import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AuthMiddleware {
	public async handle(
		ctx: HttpContext,
		next: NextFn,
		options?: { guards?: string[] }
	) {
		const { auth, response } = ctx as any
		const guards = options?.guards ?? ['api']
		const guardToUse = guards[0] ?? 'api'

		try {
			await auth.use(guardToUse).authenticate()
		} catch {
			return response.unauthorized({ message: 'No autenticado' })
		}

		await next()
	}
}

