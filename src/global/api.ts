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

  if (username === 'tcruise' && password === '123456') {
    return Promise.resolve({
      status: 200,
      data: {
        id: 102,
        username: 'tcruise',
        password: '1****6',
        fname: 'Tom',
        lname: 'Cruise',
        department: 'Accounting',
        title: 'Staff Accountant',
        permission: 0,
      },
    })
  }

  if (username === 'wsmith' && password === '123456') {
    return Promise.resolve({
      status: 200,
      data: {
        id: 103,
        username: 'wsmith',
        password: '1****6',
        fname: 'Will',
        lname: 'Smith',
        department: 'Accounting',
        title: 'Director',
        permission: 1,
      },
    })
  }

  if (username === 'tswift' && password === '123456') {
    return Promise.resolve({
      status: 200,
      data: {
        id: 104,
        username: 'tswift',
        password: '1****6',
        fname: 'Taylor',
        lname: 'Swift',
        department: 'Engineering',
        title: 'Staff Engineer',
        permission: 0,
      },
    })
  }

  if (username === 'thanks' && password === '123456') {
    return Promise.resolve({
      status: 200,
      data: {
        id: 105,
        username: 'thanks',
        password: '1****6',
        fname: 'Tom',
        lname: 'Hanks',
        department: 'Engineering',
        title: 'Director',
        permission: 1,
      },
    })
  }

  if (username === 'bpitt' && password === '123456') {
    return Promise.resolve({
      status: 200,
      data: {
        id: 106,
        username: 'bpitt',
        password: '1****6',
        fname: 'Brad',
        lname: 'Pitt',
        department: null,
        title: 'CEO',
        permission: 999,
      },
    })
  }

  return Promise.reject(new Error('Username/Password not found'))
}
