import type { HttpContext } from '@adonisjs/core/http'

import Categoria from '#models/categoria'

export default class CategoriaController {
	public async index() {
		const categorias = await Categoria.all()
		return categorias
	}

	public async show({ params, response }: HttpContext) {
		const categoria = await Categoria.find(params.id)
		if (!categoria) {
			return response.notFound({ message: 'Categoría no encontrada' })
		}

		return categoria
	}

	public async store({ request, response }: HttpContext) {
		const nombre = request.input('nombre') as string | undefined
		const descripcion = request.input('descripcion') as string | undefined
		const color = request.input('color') as string | undefined
		const icono = request.input('icono') as string | undefined

		if (!nombre) {
			return response.badRequest({ message: 'nombre es requerido' })
		}

		const categoria = await Categoria.create({
			nombre,
			descripcion,
			color,
			icono,
		})

		return response.created(categoria)
	}

	public async update({ params, request, response }: HttpContext) {
		const categoria = await Categoria.find(params.id)
		if (!categoria) {
			return response.notFound({ message: 'Categoría no encontrada' })
		}

		const nombre = request.input('nombre') as string | undefined
		const descripcion = request.input('descripcion') as string | undefined
		const color = request.input('color') as string | undefined
		const icono = request.input('icono') as string | undefined

		if (nombre !== undefined) categoria.nombre = nombre
		if (descripcion !== undefined) categoria.descripcion = descripcion
		if (color !== undefined) categoria.color = color
		if (icono !== undefined) categoria.icono = icono

		await categoria.save()
		return categoria
	}

	public async destroy({ params, response }: HttpContext) {
		const categoria = await Categoria.find(params.id)
		if (!categoria) {
			return response.notFound({ message: 'Categoría no encontrada' })
		}

		await categoria.delete()
		return response.noContent()
	}
}

