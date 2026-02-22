import router from '@adonisjs/core/services/router'

const DocenteController = () => import('#controllers/docenteController')

router
	.group(() => {
		router.get('/', [DocenteController, 'index'])
		router.get('/:id', [DocenteController, 'show'])
		router.post('/', [DocenteController, 'store'])
		router.put('/:id', [DocenteController, 'update'])
		router.delete('/:id', [DocenteController, 'destroy'])
	})
	.prefix('/docentes')

