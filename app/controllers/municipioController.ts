import type { HttpContext } from '@adonisjs/core/http'

import Municipio from '#models/municipio'

export default class MunicipioController {
	public async index() {
		const municipios = await Municipio.all()
		return municipios
	}

	public async show({ params, response }: HttpContext) {
		const municipio = await Municipio.find(params.id)
		if (!municipio) {
			return response.notFound({ message: 'Municipio no encontrado' })
		}

		return municipio
	}

	public async store({ request, response }: HttpContext) {
		const nombre = request.input('nombre') as string | undefined
		const departamentoId = request.input('departamento_id') as number | undefined
		const codigo = request.input('codigo') as string | undefined

		if (!nombre || !departamentoId) {
			return response.badRequest({ message: 'nombre y departamento_id son requeridos' })
		}

		const municipio = await Municipio.create({
			nombre,
			departamentoId,
			codigo,
		})

		return response.created(municipio)
	}

	public async update({ params, request, response }: HttpContext) {
		const municipio = await Municipio.find(params.id)
		if (!municipio) {
			return response.notFound({ message: 'Municipio no encontrado' })
		}

		const nombre = request.input('nombre') as string | undefined
		const departamentoId = request.input('departamento_id') as number | undefined
		const codigo = request.input('codigo') as string | undefined

		if (nombre !== undefined) {
			municipio.nombre = nombre
		}

		if (departamentoId !== undefined) {
			municipio.departamentoId = departamentoId
		}

		if (codigo !== undefined) {
			municipio.codigo = codigo
		}

		await municipio.save()
		return municipio
	}

	public async destroy({ params, response }: HttpContext) {
		const municipio = await Municipio.find(params.id)
		if (!municipio) {
			return response.notFound({ message: 'Municipio no encontrado' })
		}

		await municipio.delete()
		return response.noContent()
	}
}

