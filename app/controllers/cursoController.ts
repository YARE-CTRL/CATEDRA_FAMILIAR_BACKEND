import type { HttpContext } from '@adonisjs/core/http'

import Curso from '#models/curso'

export default class CursoController {
	public async index() {
		const cursos = await Curso.all()
		return cursos
	}

	public async show({ params, response }: HttpContext) {
		const curso = await Curso.find(params.id)
		if (!curso) {
			return response.notFound({ message: 'Curso no encontrado' })
		}

		return curso
	}

	public async store({ request, response }: HttpContext) {
		const nombre = request.input('nombre') as string | undefined
		const gradoId = request.input('grado_id') as number | undefined
		const jornada = request.input('jornada') as ('diurna' | 'nocturna' | 'fin_semana') | undefined
		const institucionId = request.input('institucion_id') as number | undefined

		if (!nombre || !gradoId || !jornada || !institucionId) {
			return response.badRequest({
				message: 'nombre, grado_id, jornada e institucion_id son requeridos',
			})
		}

		const curso = await Curso.create({
			nombre,
			gradoId,
			jornada,
			institucionId,
		})

		return response.created(curso)
	}

	public async update({ params, request, response }: HttpContext) {
		const curso = await Curso.find(params.id)
		if (!curso) {
			return response.notFound({ message: 'Curso no encontrado' })
		}

		const nombre = request.input('nombre') as string | undefined
		const gradoId = request.input('grado_id') as number | undefined
		const jornada = request.input('jornada') as ('diurna' | 'nocturna' | 'fin_semana') | undefined
		const institucionId = request.input('institucion_id') as number | undefined

		if (nombre !== undefined) curso.nombre = nombre
		if (gradoId !== undefined) curso.gradoId = gradoId
		if (jornada !== undefined) curso.jornada = jornada
		if (institucionId !== undefined) curso.institucionId = institucionId

		await curso.save()
		return curso
	}

	public async destroy({ params, response }: HttpContext) {
		const curso = await Curso.find(params.id)
		if (!curso) {
			return response.notFound({ message: 'Curso no encontrado' })
		}

		await curso.delete()
		return response.noContent()
	}
}

