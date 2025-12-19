import router from '@adonisjs/core/services/router'

const PeriodoController = () => import('#controllers/periodoController')

router
	.group(() => {
		router.get('/', [PeriodoController, 'index'])
		router.get('/:id', [PeriodoController, 'show'])
		router.post('/', [PeriodoController, 'store'])
		router.put('/:id', [PeriodoController, 'update'])
		router.delete('/:id', [PeriodoController, 'destroy'])
	})
	.prefix('/periodos')

