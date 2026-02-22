import router from '@adonisjs/core/services/router'

const InstitucionController = () => import('#controllers/institucionController')

router
	.group(() => {
		router.get('/', [InstitucionController, 'index'])
		router.get('/:id', [InstitucionController, 'show'])
		router.post('/', [InstitucionController, 'store'])
		router.put('/:id', [InstitucionController, 'update'])
		router.delete('/:id', [InstitucionController, 'destroy'])
	})
	.prefix('/instituciones')

