import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const User = React.lazy(() => import('./views/user/User'))
const Department = React.lazy(() => import('./views/department/Department'))
const Course = React.lazy(() => import('./views/course/Course'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/user', name: 'User', element: User },
  { path: '/department', name: 'Department', element: Department },
  { path: '/department/course', name: 'Course', element: Course },
]

export default routes
