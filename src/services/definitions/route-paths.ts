export const RoutePaths = {
    login:     '/',
    dashboard: '/dashboard',
    profile:   '/profile',

    //Users section

    usersList: '/users/list',
    usersForm: '/users/:fmode/:id?',

    //Certificates section

    certificatesList: '/certificates/list/:searchtype?/:param?',
    certificatesCreate: '/certificates/:fmode',
    certificatesForm: '/certificates/:fmode/:id?',
    certificatesLink: '/certificates/:id',

    // PEOPLE section

    staffList:   '/staff/list',
    staffCreate: '/staff/:fmode',
    staffForm:   '/staff/:fmode/:id?',

    clientsList: '/clients/list',
    authList:    '/authorization/list'
}

export const RoutePathNames = {
    login:     'login',
    dashboard: 'dashboard',
    profile:   'profile',

    // Users section
    users:       'users',
    usersForm:   'users-edit',
    usersCreate: 'users-create',
    usersDetails:'users-details',

    // Certificates section
    certificates:          'certificates',
    certificatesToValidate:'certificates-to-validate',
    certificatesCreate:    'certificates-create',
    certificatesModify:    'certificates-update',
    certificatesValidate:  'certificates-validate', 
    certificatesDetails:   'certificates-details',
    certificatesInvalidate:'certificates-invalidate',
    certificatesLink:   'certificates-link',

    // PEOPLE section

    staff:       'staff',
    staffCreate: 'staff-create',
    staffForm:   'staff-edit',

    clients: 'clients',
    auth:    'authorization'

    // ...
}
