import type { HttpContext } from '@adonisjs/core/http'

import Estudiante from '#models/estudiante'

export default class EstudianteController {
	public async index() {
		const estudiantes = await Estudiante.query().preload('curso').preload('acudientes')
		return estudiantes
	}

	public async show({ params, response }: HttpContext) {
		const estudiante = await Estudiante.query()
			.where('id', params.id)
			.preload('curso')
			.preload('acudientes')
			.first()

		if (!estudiante) {
			return response.notFound({ message: 'Estudiante no encontrado' })
		}

		return estudiante
	}

	public async store({ request, response }: HttpContext) {
		const payload = {
			nombres: request.input('nombres') as string | undefined,
			apellidos: request.input('apellidos') as string | undefined,
			tipoDocumento: request.input('tipo_documento') as
				| 'tarjeta_identidad'
				| 'cedula'
				| 'pasaporte'
				| 'registro_civil'
				| undefined,
			numeroDocumento: request.input('numero_documento') as string | undefined,
			fechaNacimiento: request.input('fecha_nacimiento') as any,
			sexo: request.input('sexo') as 'masculino' | 'femenino' | 'otro' | undefined,
			grupoSanguineo: request.input('grupo_sanguineo') as
				| 'A'
				| 'B'
				| 'AB'
				| 'O'
				| null
				| undefined,
			rh: request.input('rh') as '+' | '-' | null | undefined,
			paisNacimiento: request.input('pais_nacimiento') as string | undefined,
			ciudadNacimiento: request.input('ciudad_nacimiento') as string | undefined,
			estrato: request.input('estrato') as number | undefined,
			etnia: request.input('etnia') as string | undefined,
			eps: request.input('eps') as string | undefined,
			correoEstudiante: request.input('correo_estudiante') as string | undefined,
			cursoId: request.input('curso_id') as number | undefined,
		}

		if (
			!payload.nombres ||
			!payload.apellidos ||
			!payload.tipoDocumento ||
			!payload.numeroDocumento ||
			!payload.fechaNacimiento ||
			!payload.sexo ||
			!payload.cursoId
		) {
			return response.badRequest({
				message:
					'nombres, apellidos, tipo_documento, numero_documento, fecha_nacimiento, sexo y curso_id son requeridos',
			})
		}

		const acudienteIds = (request.input('acudiente_ids') as number[] | undefined) ?? []

		const estudiante = await Estudiante.create(payload as any)

		if (acudienteIds.length > 0) {
			await estudiante.related('acudientes').attach(
				acudienteIds.reduce<
					Record<number, { relacion: string; es_principal: boolean }>
				>((acc, id) => {
					acc[id] = { relacion: 'otro', es_principal: false }
					return acc
				}, {})
			)
		}

		await estudiante.load('curso')
		await estudiante.load('acudientes')
		return response.created(estudiante)
	}

	public async update({ params, request, response }: HttpContext) {
		const estudiante = await Estudiante.query().where('id', params.id).first()
		if (!estudiante) {
			return response.notFound({ message: 'Estudiante no encontrado' })
		}

		const nombres = request.input('nombres') as string | undefined
		const apellidos = request.input('apellidos') as string | undefined
		const tipoDocumento = request.input('tipo_documento') as
			| 'tarjeta_identidad'
			| 'cedula'
			| 'pasaporte'
			| 'registro_civil'
			| undefined
		const numeroDocumento = request.input('numero_documento') as string | undefined
		const fechaNacimiento = request.input('fecha_nacimiento') as any
		const sexo = request.input('sexo') as 'masculino' | 'femenino' | 'otro' | undefined
		const grupoSanguineo = request.input('grupo_sanguineo') as
			| 'A'
			| 'B'
			| 'AB'
			| 'O'
			| null
			| undefined
		const rh = request.input('rh') as '+' | '-' | null | undefined
		const paisNacimiento = request.input('pais_nacimiento') as string | undefined
		const ciudadNacimiento = request.input('ciudad_nacimiento') as string | undefined
		const estrato = request.input('estrato') as number | undefined
		const etnia = request.input('etnia') as string | undefined
		const eps = request.input('eps') as string | undefined
		const correoEstudiante = request.input('correo_estudiante') as string | undefined
		const cursoId = request.input('curso_id') as number | undefined
		const acudienteIds = request.input('acudiente_ids') as number[] | undefined

		if (nombres !== undefined) estudiante.nombres = nombres
		if (apellidos !== undefined) estudiante.apellidos = apellidos
		if (tipoDocumento !== undefined) estudiante.tipoDocumento = tipoDocumento
		if (numeroDocumento !== undefined) estudiante.numeroDocumento = numeroDocumento
		if (fechaNacimiento !== undefined) estudiante.fechaNacimiento = fechaNacimiento
		if (sexo !== undefined) estudiante.sexo = sexo
		if (grupoSanguineo !== undefined) estudiante.grupoSanguineo = grupoSanguineo
		if (rh !== undefined) estudiante.rh = rh
		if (paisNacimiento !== undefined) estudiante.paisNacimiento = paisNacimiento
		if (ciudadNacimiento !== undefined) estudiante.ciudadNacimiento = ciudadNacimiento
		if (estrato !== undefined) estudiante.estrato = estrato
		if (etnia !== undefined) estudiante.etnia = etnia
		if (eps !== undefined) estudiante.eps = eps
		if (correoEstudiante !== undefined)
			estudiante.correoEstudiante = correoEstudiante
		if (cursoId !== undefined) estudiante.cursoId = cursoId

		await estudiante.save()

		if (acudienteIds !== undefined) {
			await estudiante.related('acudientes').sync(
				acudienteIds.reduce<
					Record<number, { relacion: string; es_principal: boolean }>
				>((acc, id) => {
					acc[id] = { relacion: 'otro', es_principal: false }
					return acc
				}, {})
			)
		}

		await estudiante.load('curso')
		await estudiante.load('acudientes')
		return estudiante
	}

	public async destroy({ params, response }: HttpContext) {
		const estudiante = await Estudiante.find(params.id)
		if (!estudiante) {
			return response.notFound({ message: 'Estudiante no encontrado' })
		}

		await estudiante.delete()
		return response.noContent()
	}
}

