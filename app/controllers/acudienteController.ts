import type { HttpContext } from '@adonisjs/core/http'

import Acudiente from '#models/acudiente'

export default class AcudienteController {
	public async index() {
		const acudientes = await Acudiente.query().preload('estudiantes')
		return acudientes
	}

	public async show({ params, response }: HttpContext) {
		const acudiente = await Acudiente.query()
			.where('id', params.id)
			.preload('estudiantes')
			.first()

		if (!acudiente) {
			return response.notFound({ message: 'Acudiente no encontrado' })
		}

		return acudiente
	}

	public async store({ request, response }: HttpContext) {
		const payload = {
			nombres: request.input('nombres') as string | undefined,
			apellidos: request.input('apellidos') as string | undefined,
			tipoDocumento: request.input('tipo_documento') as
				| 'cedula'
				| 'tarjeta_identidad'
				| 'pasaporte'
				| 'cedula_extranjeria'
				| undefined,
			numeroDocumento: request.input('numero_documento') as string | undefined,
			telefono: request.input('telefono') as string | undefined,
			telefonoAlternativo: request.input('telefono_alternativo') as string | undefined,
			correo: request.input('correo') as string | undefined,
			direccion: request.input('direccion') as string | undefined,
			parentesco: request.input('parentesco') as
				| 'madre'
				| 'padre'
				| 'cuidador'
				| 'abuelo_a'
				| 'tio_a'
				| 'hermano_a'
				| 'otro'
				| null
				| undefined,
			ocupacion: request.input('ocupacion') as string | undefined,
			tipoTrabajo: request.input('tipo_trabajo') as
				| 'formal'
				| 'informal'
				| 'no_aplica'
				| null
				| undefined,
			nivelEducativo: request.input('nivel_educativo') as
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
				| undefined,
			aportaEconomia: request.input('aporta_economia') as boolean | undefined,
			horarioTrabajo: request.input('horario_trabajo') as string | undefined,
			usuarioId: request.input('usuario_id') as number | undefined,
		}

		if (
			!payload.nombres ||
			!payload.apellidos ||
			!payload.tipoDocumento ||
			!payload.numeroDocumento ||
			!payload.telefono ||
			!payload.usuarioId
		) {
			return response.badRequest({
				message:
					'nombres, apellidos, tipo_documento, numero_documento, telefono y usuario_id son requeridos',
			})
		}

		const estudianteIds = (request.input('estudiante_ids') as number[] | undefined) ?? []

		const acudiente = await Acudiente.create(payload)

		if (estudianteIds.length > 0) {
			await acudiente.related('estudiantes').attach(
				estudianteIds.reduce<
					Record<number, { relacion: string; es_principal: boolean }>
				>((acc, id) => {
					acc[id] = { relacion: payload.parentesco ?? 'otro', es_principal: false }
					return acc
				}, {})
			)
		}

		await acudiente.load('estudiantes')
		return response.created(acudiente)
	}

	public async update({ params, request, response }: HttpContext) {
		const acudiente = await Acudiente.query().where('id', params.id).first()
		if (!acudiente) {
			return response.notFound({ message: 'Acudiente no encontrado' })
		}

		const nombres = request.input('nombres') as string | undefined
		const apellidos = request.input('apellidos') as string | undefined
		const tipoDocumento = request.input('tipo_documento') as
			| 'cedula'
			| 'tarjeta_identidad'
			| 'pasaporte'
			| 'cedula_extranjeria'
			| undefined
		const numeroDocumento = request.input('numero_documento') as string | undefined
		const telefono = request.input('telefono') as string | undefined
		const telefonoAlternativo = request.input('telefono_alternativo') as string | undefined
		const correo = request.input('correo') as string | undefined
		const direccion = request.input('direccion') as string | undefined
		const parentesco = request.input('parentesco') as
			| 'madre'
			| 'padre'
			| 'cuidador'
			| 'abuelo_a'
			| 'tio_a'
			| 'hermano_a'
			| 'otro'
			| null
			| undefined
		const ocupacion = request.input('ocupacion') as string | undefined
		const tipoTrabajo = request.input('tipo_trabajo') as
			| 'formal'
			| 'informal'
			| 'no_aplica'
			| null
			| undefined
		const nivelEducativo = request.input('nivel_educativo') as
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
			| undefined
		const aportaEconomia = request.input('aporta_economia') as boolean | undefined
		const horarioTrabajo = request.input('horario_trabajo') as string | undefined
		const usuarioId = request.input('usuario_id') as number | undefined
		const estudianteIds = request.input('estudiante_ids') as number[] | undefined

		if (nombres !== undefined) acudiente.nombres = nombres
		if (apellidos !== undefined) acudiente.apellidos = apellidos
		if (tipoDocumento !== undefined) acudiente.tipoDocumento = tipoDocumento
		if (numeroDocumento !== undefined) acudiente.numeroDocumento = numeroDocumento
		if (telefono !== undefined) acudiente.telefono = telefono
		if (telefonoAlternativo !== undefined)
			acudiente.telefonoAlternativo = telefonoAlternativo
		if (correo !== undefined) acudiente.correo = correo
		if (direccion !== undefined) acudiente.direccion = direccion
		if (parentesco !== undefined) acudiente.parentesco = parentesco
		if (ocupacion !== undefined) acudiente.ocupacion = ocupacion
		if (tipoTrabajo !== undefined) acudiente.tipoTrabajo = tipoTrabajo
		if (nivelEducativo !== undefined) acudiente.nivelEducativo = nivelEducativo
		if (aportaEconomia !== undefined) acudiente.aportaEconomia = aportaEconomia
		if (horarioTrabajo !== undefined) acudiente.horarioTrabajo = horarioTrabajo
		if (usuarioId !== undefined) acudiente.usuarioId = usuarioId

		await acudiente.save()

		if (estudianteIds !== undefined) {
			await acudiente.related('estudiantes').sync(
				estudianteIds.reduce<
					Record<number, { relacion: string; es_principal: boolean }>
				>((acc, id) => {
					acc[id] = { relacion: acudiente.parentesco ?? 'otro', es_principal: false }
					return acc
				}, {})
			)
		}

		await acudiente.load('estudiantes')
		return acudiente
	}

	public async destroy({ params, response }: HttpContext) {
		const acudiente = await Acudiente.find(params.id)
		if (!acudiente) {
			return response.notFound({ message: 'Acudiente no encontrado' })
		}

		await acudiente.delete()
		return response.noContent()
	}
}

