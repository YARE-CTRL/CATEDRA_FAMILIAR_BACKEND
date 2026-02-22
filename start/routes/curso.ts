import router from '@adonisjs/core/services/router'

const CursoController = () => import('#controllers/cursoController')

router
	.group(() => {
		router.get('/', [CursoController, 'index'])
		router.get('/:id', [CursoController, 'show'])
		router.post('/', [CursoController, 'store'])
		router.put('/:id', [CursoController, 'update'])
		router.delete('/:id', [CursoController, 'destroy'])
	})
	.prefix('/cursos')

