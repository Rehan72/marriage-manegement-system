import SuperAdminDashboardPage from "../pages/superAdmin/SuperAdmin";







export default [
   {
     element: SuperAdminDashboardPage,
     path: 'dashboard',
     //permission: RoutePermission?.PLATFORM_ADMIN,
     exact: true
   },
  //  {
  //     element: User,
  //     path: `${routeParams}user`,
  //    // permission: RoutePermission?.SYSTEM_ADMIN,
  //     exact: true
  //   },
  //   {
  //     element: AddUser,
  //     path: `${routeParams}user/add-user`,
  //    // permission: RoutePermission?.SYSTEM_ADMIN,
  //     exact: true
  //   },
  //  {
  //    element: Home,
  //    path: `${routeParams}home`,
  //   // permission: RoutePermission?.SYSTEM_ADMIN,
  //    exact: true
  //  },
  //  {
  //     element: AddNewCard,
  //     path: `${routeParams}dashboard/new-card`,
  //    // permission: RoutePermission?.SYSTEM_ADMIN,
  //     exact: true
  //   },
]