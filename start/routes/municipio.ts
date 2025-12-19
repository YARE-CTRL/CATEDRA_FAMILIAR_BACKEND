import router from '@adonisjs/core/services/router'
const MunicipioController = () => import('#controllers/municipioController')

router
  .group(() => {
    router.get('/', [MunicipioController, 'index'])
    router.get('/:id', [MunicipioController, 'show'])
    router.post('/', [MunicipioController, 'store'])
    router.put('/:id', [MunicipioController, 'update'])
    router.delete('/:id', [MunicipioController, 'destroy'])
  })
  .prefix('/municipios')