import router from '@adonisjs/core/services/router'

const EstudianteController = () => import('#controllers/estudianteController')

router
	.group(() => {
		router.get('/', [EstudianteController, 'index'])
		router.get('/:id', [EstudianteController, 'show'])
		router.post('/', [EstudianteController, 'store'])
		router.put('/:id', [EstudianteController, 'update'])
		router.delete('/:id', [EstudianteController, 'destroy'])
	})
	.prefix('/estudiantes')

