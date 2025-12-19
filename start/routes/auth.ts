import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/authController')

router
  .group(() => {
    router.post('/login/admin', [AuthController, 'loginAdmin'])
    router.post('/login/docente', [AuthController, 'loginDocente'])
    router.post('/login/acudiente', [AuthController, 'loginAcudiente'])

    const authApi = (middleware as any).auth({ guards: ['api'] })
    router.post('/logout', [AuthController, 'logout']).use(authApi)
  })
  .prefix('/auth')

