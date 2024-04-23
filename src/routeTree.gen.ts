/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'
import { Route as ExaminerIndexImport } from './routes/examiner/index'
import { Route as ExamCommitteeIndexImport } from './routes/exam-committee/index'

// Create Virtual Routes

const AdminIndexLazyImport = createFileRoute('/admin/')()

// Create/Update Routes

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AdminIndexLazyRoute = AdminIndexLazyImport.update({
  path: '/admin/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/admin/index.lazy').then((d) => d.Route))

const ExaminerIndexRoute = ExaminerIndexImport.update({
  path: '/examiner/',
  getParentRoute: () => rootRoute,
} as any)

const ExamCommitteeIndexRoute = ExamCommitteeIndexImport.update({
  path: '/exam-committee/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/exam-committee/': {
      preLoaderRoute: typeof ExamCommitteeIndexImport
      parentRoute: typeof rootRoute
    }
    '/examiner/': {
      preLoaderRoute: typeof ExaminerIndexImport
      parentRoute: typeof rootRoute
    }
    '/admin/': {
      preLoaderRoute: typeof AdminIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  ExamCommitteeIndexRoute,
  ExaminerIndexRoute,
  AdminIndexLazyRoute,
])

/* prettier-ignore-end */
