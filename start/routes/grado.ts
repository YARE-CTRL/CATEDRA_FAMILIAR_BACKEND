import router from '@adonisjs/core/services/router'

const GradoController = () => import('#controllers/gradoController')

router
	.group(() => {
		router.get('/', [GradoController, 'index'])
		router.get('/:id', [GradoController, 'show'])
		router.post('/', [GradoController, 'store'])
		router.put('/:id', [GradoController, 'update'])
		router.delete('/:id', [GradoController, 'destroy'])
	})
	.prefix('/grados')

