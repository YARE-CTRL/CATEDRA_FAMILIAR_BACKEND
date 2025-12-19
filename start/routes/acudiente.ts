import router from '@adonisjs/core/services/router'

const AcudienteController = () => import('#controllers/acudienteController')

router
	.group(() => {
		router.get('/', [AcudienteController, 'index'])
		router.get('/:id', [AcudienteController, 'show'])
		router.post('/', [AcudienteController, 'store'])
		router.put('/:id', [AcudienteController, 'update'])
		router.delete('/:id', [AcudienteController, 'destroy'])
	})
	.prefix('/acudientes')

