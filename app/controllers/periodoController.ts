import type { HttpContext } from '@adonisjs/core/http'

import Periodo from '#models/periodo'

export default class PeriodoController {
	public async index() {
		const periodos = await Periodo.all()
		return periodos
	}

	public async show({ params, response }: HttpContext) {
		const periodo = await Periodo.find(params.id)
		if (!periodo) {
			return response.notFound({ message: 'Periodo no encontrado' })
		}

		return periodo
	}

	public async store({ request, response }: HttpContext) {
		const nombre = request.input('nombre') as string | undefined
		const fechaInicio = request.input('fecha_inicio') as any
		const fechaFin = request.input('fecha_fin') as any
		const institucionId = request.input('institucion_id') as number | undefined
		const estaActivo = request.input('esta_activo') as boolean | undefined

		if (!nombre || !fechaInicio || !fechaFin || !institucionId || estaActivo === undefined) {
			return response.badRequest({
				message: 'nombre, fecha_inicio, fecha_fin, institucion_id y esta_activo son requeridos',
			})
		}

		const periodo = await Periodo.create({
			nombre,
			fechaInicio,
			fechaFin,
			institucionId,
			estaActivo,
		} as any)

		return response.created(periodo)
	}

	public async update({ params, request, response }: HttpContext) {
		const periodo = await Periodo.find(params.id)
		if (!periodo) {
			return response.notFound({ message: 'Periodo no encontrado' })
		}

		const nombre = request.input('nombre') as string | undefined
		const fechaInicio = request.input('fecha_inicio') as any
		const fechaFin = request.input('fecha_fin') as any
		const institucionId = request.input('institucion_id') as number | undefined
		const estaActivo = request.input('esta_activo') as boolean | undefined

		if (nombre !== undefined) periodo.nombre = nombre
		if (fechaInicio !== undefined) periodo.fechaInicio = fechaInicio
		if (fechaFin !== undefined) periodo.fechaFin = fechaFin
		if (institucionId !== undefined) periodo.institucionId = institucionId
		if (estaActivo !== undefined) periodo.estaActivo = estaActivo

		await periodo.save()
		return periodo
	}

	public async destroy({ params, response }: HttpContext) {
		const periodo = await Periodo.find(params.id)
		if (!periodo) {
			return response.notFound({ message: 'Periodo no encontrado' })
		}

		await periodo.delete()
		return response.noContent()
	}
}

