import router from '@adonisjs/core/services/router'

const CategoriaController = () => import('#controllers/categoriaController')

router
	.group(() => {
		router.get('/', [CategoriaController, 'index'])
		router.get('/:id', [CategoriaController, 'show'])
		router.post('/', [CategoriaController, 'store'])
		router.put('/:id', [CategoriaController, 'update'])
		router.delete('/:id', [CategoriaController, 'destroy'])
	})
	.prefix('/categorias')

