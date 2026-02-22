import type { HttpContext } from '@adonisjs/core/http'

import Departamento from '#models/departamento'

export default class DepartamentoController {
	public async index() {
		const departamentos = await Departamento.all()
		return departamentos
	}

	public async show({ params, response }: HttpContext) {
		const departamento = await Departamento.find(params.id)
		if (!departamento) {
			return response.notFound({ message: 'Departamento no encontrado' })
		}

		return departamento
	}

	public async store({ request, response }: HttpContext) {
		const nombre = request.input('nombre') as string | undefined
		const codigo = request.input('codigo') as string | undefined

		if (!nombre) {
			return response.badRequest({ message: 'El nombre es requerido' })
		}

		const existente = await Departamento.query().where('nombre', nombre).first()
		if (existente) {
			return response.conflict({ message: 'Ya existe un departamento con ese nombre' })
		}

		const departamento = await Departamento.create({ nombre, codigo })
		return response.created(departamento)
	}

	public async update({ params, request, response }: HttpContext) {
		const departamento = await Departamento.find(params.id)
		if (!departamento) {
			return response.notFound({ message: 'Departamento no encontrado' })
		}

		const nombre = request.input('nombre') as string | undefined
		const codigo = request.input('codigo') as string | undefined

		if (nombre !== undefined) {
			departamento.nombre = nombre
		}

		if (codigo !== undefined) {
			departamento.codigo = codigo
		}

		await departamento.save()
		return departamento
	}

	public async destroy({ params, response }: HttpContext) {
		const departamento = await Departamento.find(params.id)
		if (!departamento) {
			return response.notFound({ message: 'Departamento no encontrado' })
		}

		await departamento.delete()
		return response.noContent()
	}
}

