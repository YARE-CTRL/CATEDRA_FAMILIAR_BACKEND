import router from '@adonisjs/core/services/router'
const DepartamentoController = () => import('#controllers/departamentoController')

router
  .group(() => {
    router.get('/', [DepartamentoController, 'index'])
    router.get('/:id', [DepartamentoController, 'show'])
    router.post('/', [DepartamentoController, 'store'])
    router.put('/:id', [DepartamentoController, 'update'])
    router.delete('/:id', [DepartamentoController, 'destroy'])
  })
  .prefix('/departamentos')