export const RoutePaths = {
    login:     '/',
    dashboard: '/dashboard',

    //Users section

    usersList: '/users/list',
    usersForm: '/users/:fmode/:id?',

    // PEOPLE section

    staffList: '/staff/list',
    staffForm: '/staff/:fmode/:id?',

    clientsList: '/clients/list',
    authList:    '/authorization/list'
}

export const RoutePathNames = {
    login:     'login',
    dashboard: 'dashboard',

    // Users section
    users:       'users',
    usersForm:   'users-edit',
    usersCreate: 'users-create',

    // PEOPLE section

    staff:       'staff',
    staffForm:   'staff-edit',
    staffCreate: 'staff-create',


    clients: 'clients',
    auth:    'authorization'

    // ...
}
