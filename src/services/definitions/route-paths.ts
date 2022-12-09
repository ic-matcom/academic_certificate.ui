export const RoutePaths = {
    login:     '/',
    home: '/home',
    profile:   '/profile',

    //Users section

    usersList: '/users/list',
    usersForm: '/users/:fmode/:id?',

    //Certificates section

    certificatesSearch:   '/certificates/search/',
    certificatesList:     '/certificates/list',
    certificatesToValidateList: '/certificates/to-validate',
    certificatesCreate:   '/certificates/:fmode',
    certificatesForm:     '/certificates/:fmode/:id?',
    certificatesValidate: '/certificates/sign/:fmode/:id',
    certificatesLink:     '/certificates/:id',

    // PEOPLE section

    staffList:   '/staff/list',
    staffCreate: '/staff/:fmode',
    staffForm:   '/staff/:fmode/:id?',

    clientsList: '/clients/list',
    authList:    '/authorization/list'
}

export const RoutePathNames = {
    login:     'login',
    home:      'home',
    profile:   'profile',

    // Users section
    users:       'users',
    usersForm:   'users-edit',
    usersCreate: 'users-create',
    usersDetails:'users-details',

    // Certificates section
    certificates:          'certificates',
    certificatesSearch:    'certificates-search',
    certificatesToValidate:'certificates-to-validate',
    certificatesCreate:    'certificates-create',
    certificatesModify:    'certificates-update',
    certificatesValidate:  'certificates-validate', 
    certificatesDetails:   'certificates-details',
    certificatesInvalidate:'certificates-invalidate',
    certificatesLink:      'certificates-link',

    // PEOPLE section

    staff:       'staff',
    staffCreate: 'staff-create',
    staffForm:   'staff-edit',

    clients: 'clients',
    auth:    'authorization'

    // ...
}
