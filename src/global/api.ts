export const authenticate = (params: { payload: any }) => {
  const { payload } = params
  const { username, password } = payload

  if (username === 'admin' && password === '123456') {
    return Promise.resolve({
      status: 200,
      data: {
        id: 101,
        username: 'admin',
        password: '1****6',
        fname: 'Admin',
        lname: '',
        department: 'IT',
        title: 'IT Admin',
        permission: 999,
      },
    })
  }

  return Promise.reject(new Error('Username/Password not found'))
}
