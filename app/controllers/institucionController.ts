import type { HttpContext } from '@adonisjs/core/http'

import Institucion from '#models/institucion'

export default class InstitucionController {
	public async index() {
		const instituciones = await Institucion.all()
		return instituciones
	}

	public async show({ params, response }: HttpContext) {
		const institucion = await Institucion.find(params.id)
		if (!institucion) {
			return response.notFound({ message: 'Institución no encontrada' })
		}

		return institucion
	}

	public async store({ request, response }: HttpContext) {
		const nombre = request.input('nombre') as string | undefined
		const telefono = request.input('telefono') as string | undefined
		const correo = request.input('correo') as string | undefined
		const direccion = request.input('direccion') as string | undefined
		const naturaleza = request.input('naturaleza') as 'publica' | 'privada' | undefined
		const municipioId = request.input('municipio_id') as number | undefined

		if (!nombre || !naturaleza || !municipioId) {
			return response.badRequest({
				message: 'nombre, naturaleza y municipio_id son requeridos',
			})
		}

		const institucion = await Institucion.create({
			nombre,
			telefono,
			correo,
			direccion,
			naturaleza,
			municipioId,
		})

		return response.created(institucion)
	}

	public async update({ params, request, response }: HttpContext) {
		const institucion = await Institucion.find(params.id)
		if (!institucion) {
			return response.notFound({ message: 'Institución no encontrada' })
		}

		const nombre = request.input('nombre') as string | undefined
		const telefono = request.input('telefono') as string | undefined
		const correo = request.input('correo') as string | undefined
		const direccion = request.input('direccion') as string | undefined
		const naturaleza = request.input('naturaleza') as 'publica' | 'privada' | undefined
		const municipioId = request.input('municipio_id') as number | undefined

		if (nombre !== undefined) institucion.nombre = nombre
		if (telefono !== undefined) institucion.telefono = telefono
		if (correo !== undefined) institucion.correo = correo
		if (direccion !== undefined) institucion.direccion = direccion
		if (naturaleza !== undefined) institucion.naturaleza = naturaleza
		if (municipioId !== undefined) institucion.municipioId = municipioId

		await institucion.save()
		return institucion
	}

	public async destroy({ params, response }: HttpContext) {
		const institucion = await Institucion.find(params.id)
		if (!institucion) {
			return response.notFound({ message: 'Institución no encontrada' })
		}

		await institucion.delete()
		return response.noContent()
	}
}

