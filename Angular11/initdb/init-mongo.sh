set -e

mongo <<EOF

use $DB_NAME

db.createUser({
  user: '$DB_USER_ROOT_NAME',
  pwd: '$DB_USER_ROOT_PASS',
  roles: [{
    role: 'dbOwner',
    db: '$DB_NAME'
  }]
})

db.createUser({
  user: '$DB_USER_DEFAULT_NAME',
  pwd: '$DB_USER_DEFAULT_PASS',
  roles: [{
    role: 'readWrite',
    db: '$DB_NAME'
  }]
})

db.createUser({
  user: '$DB_USER_READONLY_NAME',
  pwd: '$DB_USER_READONLY_PASS',
  roles: [{
    role: 'read',
    db: '$DB_NAME'
  }]
})
EOF