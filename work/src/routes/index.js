/**
 * 导出所有路由配置
 * @author bigfact
 * @date 2017.02.28
 */

import active from './active'

import auth from './auth'

import authsingle from './authsingle'

import bank from './bank'

import my from './my'

import repay from './repay'

import user from './user'

import example from './example'

export default {
  ...active,
  ...auth,
  ...authsingle,
  ...bank,
  ...my,
  ...repay,
  ...user,
  ...example
}
