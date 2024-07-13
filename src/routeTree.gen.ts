/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as ExamExamImport } from './routes/exam/_exam'
import { Route as ExamExamidImport } from './routes/exam/$exam_id'
import { Route as ExaminerExamidCourseidSetImport } from './routes/examiner/$exam_id.$course_id.$set'
import { Route as ExamExamExamidCourseidImport } from './routes/exam/_exam.$exam_id.$course_id'

// Create Virtual Routes

const ExamImport = createFileRoute('/exam')()
const AdminIndexLazyImport = createFileRoute('/admin/')()

// Create/Update Routes

const ExamRoute = ExamImport.update({
  path: '/exam',
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

const ExamExamRoute = ExamExamImport.update({
  id: '/_exam',
  getParentRoute: () => ExamRoute,
} as any)

const ExamExamidRoute = ExamExamidImport.update({
  path: '/exam/$exam_id',
  getParentRoute: () => rootRoute,
} as any)

const ExaminerExamidCourseidSetRoute = ExaminerExamidCourseidSetImport.update({
  path: '/examiner/$exam_id/$course_id/$set',
  getParentRoute: () => rootRoute,
} as any)

const ExamExamExamidCourseidRoute = ExamExamExamidCourseidImport.update({
  path: '/$exam_id/$course_id',
  getParentRoute: () => ExamExamRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/exam/$exam_id': {
      preLoaderRoute: typeof ExamExamidImport
      parentRoute: typeof rootRoute
    }
    '/exam': {
      preLoaderRoute: typeof ExamImport
      parentRoute: typeof rootRoute
    }
    '/exam/_exam': {
      preLoaderRoute: typeof ExamExamImport
      parentRoute: typeof ExamRoute
    }
    '/admin/': {
      preLoaderRoute: typeof AdminIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/exam/_exam/$exam_id/$course_id': {
      preLoaderRoute: typeof ExamExamExamidCourseidImport
      parentRoute: typeof ExamExamImport
    }
    '/examiner/$exam_id/$course_id/$set': {
      preLoaderRoute: typeof ExaminerExamidCourseidSetImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  ExamExamidRoute,
  ExamRoute.addChildren([
    ExamExamRoute.addChildren([ExamExamExamidCourseidRoute]),
  ]),
  AdminIndexLazyRoute,
  ExaminerExamidCourseidSetRoute,
])

/* prettier-ignore-end */
