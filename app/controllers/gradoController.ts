import type { HttpContext } from '@adonisjs/core/http'

import Grado from '#models/grado'

export default class GradoController {
	public async index() {
		const grados = await Grado.all()
		return grados
	}

	public async show({ params, response }: HttpContext) {
		const grado = await Grado.find(params.id)
		if (!grado) {
			return response.notFound({ message: 'Grado no encontrado' })
		}

		return grado
	}

	public async store({ request, response }: HttpContext) {
		const nombre = request.input('nombre') as string | undefined
		const orden = request.input('orden') as number | undefined

		if (!nombre) {
			return response.badRequest({ message: 'nombre es requerido' })
		}

		const grado = await Grado.create({
			nombre,
			orden,
		})

		return response.created(grado)
	}

	public async update({ params, request, response }: HttpContext) {
		const grado = await Grado.find(params.id)
		if (!grado) {
			return response.notFound({ message: 'Grado no encontrado' })
		}

		const nombre = request.input('nombre') as string | undefined
		const orden = request.input('orden') as number | undefined

		if (nombre !== undefined) grado.nombre = nombre
		if (orden !== undefined) grado.orden = orden

		await grado.save()
		return grado
	}

	public async destroy({ params, response }: HttpContext) {
		const grado = await Grado.find(params.id)
		if (!grado) {
			return response.notFound({ message: 'Grado no encontrado' })
		}

		await grado.delete()
		return response.noContent()
	}
}

