import type { HttpContext } from '@adonisjs/core/http'

import Docente from '#models/docente'

export default class DocenteController {
	public async index() {
		const docentes = await Docente.query().preload('cursos')
		return docentes
	}

	public async show({ params, response }: HttpContext) {
		const docente = await Docente.query()
			.where('id', params.id)
			.preload('cursos')
			.first()

		if (!docente) {
			return response.notFound({ message: 'Docente no encontrado' })
		}

		return docente
	}

	public async store({ request, response }: HttpContext) {
		const payload = {
			nombres: request.input('nombres') as string | undefined,
			apellidos: request.input('apellidos') as string | undefined,
			tipoDocumento: request.input('tipo_documento') as
				| 'cedula'
				| 'cedula_extranjeria'
				| 'pasaporte'
				| undefined,
			numeroDocumento: request.input('numero_documento') as string | undefined,
			telefono: request.input('telefono') as string | undefined,
			telefonoEmergencia: request.input('telefono_emergencia') as string | undefined,
			personaEmergencia: request.input('persona_emergencia') as string | undefined,
			correo: request.input('correo') as string | undefined,
			direccion: request.input('direccion') as string | undefined,
			rol: request.input('rol') as
				| 'docente_aula'
				| 'orientador'
				| 'coordinador'
				| 'rector'
				| 'ptafi'
				| undefined,
			esDirectorGrado: request.input('es_director_grado') as boolean | undefined,
			gradoAsignadoId: request.input('grado_asignado') as number | undefined,
			areaQueOrienta: request.input('area_que_orienta') as string | undefined,
			centroInteres: request.input('centro_interes') as string | undefined,
			institucionId: request.input('institucion_id') as number | undefined,
			usuarioId: request.input('usuario_id') as number | undefined,
		}

		if (
			!payload.nombres ||
			!payload.apellidos ||
			!payload.tipoDocumento ||
			!payload.numeroDocumento ||
			!payload.telefono ||
			!payload.correo ||
			!payload.rol ||
			payload.esDirectorGrado === undefined ||
			!payload.institucionId ||
			!payload.usuarioId
		) {
			return response.badRequest({
				message:
					'nombres, apellidos, tipo_documento, numero_documento, telefono, correo, rol, es_director_grado, institucion_id y usuario_id son requeridos',
			})
		}

		const cursoIds = (request.input('curso_ids') as number[] | undefined) ?? []

		const docente = await Docente.create(payload)

		if (cursoIds.length > 0) {
			await docente.related('cursos').attach(
				cursoIds.reduce<Record<number, { es_director: boolean }>>((acc, id) => {
					acc[id] = { es_director: false }
					return acc
				}, {})
			)
		}

		await docente.load('cursos')
		return response.created(docente)
	}

	public async update({ params, request, response }: HttpContext) {
		const docente = await Docente.query().where('id', params.id).first()
		if (!docente) {
			return response.notFound({ message: 'Docente no encontrado' })
		}

		const nombres = request.input('nombres') as string | undefined
		const apellidos = request.input('apellidos') as string | undefined
		const tipoDocumento = request.input('tipo_documento') as
			| 'cedula'
			| 'cedula_extranjeria'
			| 'pasaporte'
			| undefined
		const numeroDocumento = request.input('numero_documento') as string | undefined
		const telefono = request.input('telefono') as string | undefined
		const telefonoEmergencia = request.input('telefono_emergencia') as string | undefined
		const personaEmergencia = request.input('persona_emergencia') as string | undefined
		const correo = request.input('correo') as string | undefined
		const direccion = request.input('direccion') as string | undefined
		const rol = request.input('rol') as
			| 'docente_aula'
			| 'orientador'
			| 'coordinador'
			| 'rector'
			| 'ptafi'
			| undefined
		const esDirectorGrado = request.input('es_director_grado') as boolean | undefined
		const gradoAsignadoId = request.input('grado_asignado') as number | undefined
		const areaQueOrienta = request.input('area_que_orienta') as string | undefined
		const centroInteres = request.input('centro_interes') as string | undefined
		const institucionId = request.input('institucion_id') as number | undefined
		const usuarioId = request.input('usuario_id') as number | undefined
		const cursoIds = request.input('curso_ids') as number[] | undefined

		if (nombres !== undefined) docente.nombres = nombres
		if (apellidos !== undefined) docente.apellidos = apellidos
		if (tipoDocumento !== undefined) docente.tipoDocumento = tipoDocumento
		if (numeroDocumento !== undefined) docente.numeroDocumento = numeroDocumento
		if (telefono !== undefined) docente.telefono = telefono
		if (telefonoEmergencia !== undefined)
			docente.telefonoEmergencia = telefonoEmergencia
		if (personaEmergencia !== undefined) docente.personaEmergencia = personaEmergencia
		if (correo !== undefined) docente.correo = correo
		if (direccion !== undefined) docente.direccion = direccion
		if (rol !== undefined) docente.rol = rol
		if (esDirectorGrado !== undefined) docente.esDirectorGrado = esDirectorGrado
		if (gradoAsignadoId !== undefined) docente.gradoAsignadoId = gradoAsignadoId
		if (areaQueOrienta !== undefined) docente.areaQueOrienta = areaQueOrienta
		if (centroInteres !== undefined) docente.centroInteres = centroInteres
		if (institucionId !== undefined) docente.institucionId = institucionId
		if (usuarioId !== undefined) docente.usuarioId = usuarioId

		await docente.save()

		if (cursoIds !== undefined) {
			await docente.related('cursos').sync(
				cursoIds.reduce<Record<number, { es_director: boolean }>>((acc, id) => {
					acc[id] = { es_director: false }
					return acc
				}, {})
			)
		}

		await docente.load('cursos')
		return docente
	}

	public async destroy({ params, response }: HttpContext) {
		const docente = await Docente.find(params.id)
		if (!docente) {
			return response.notFound({ message: 'Docente no encontrado' })
		}

		await docente.delete()
		return response.noContent()
	}
}

