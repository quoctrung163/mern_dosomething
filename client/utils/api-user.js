export const create = user => {
  return fetch('/api/users/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .catch(err => console.log(err));
}

export const list = () => {
  return fetch('api/users/', {
    method: 'GET',
  }).then(res => res.json())
    .catch(err => console.log(err))
}

export const read = (params, credentials) => {
  return fetch(`/api/users/${params.userId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    }
  }).then(res => res.json())
    .catch(err => console.log(err))
}

export const update = (params, credentials, user) => {
  return fetch(`/api/users/${params.userId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: JSON.stringify(user)
  }).then(res => res.json())
    .catch(err => console.log(err))
}

export const remove = (params, credentials) => {
  return fetch(`/api/users/${params.userId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    }
  }).then(res => res.json())
    .catch(err => console.log(err))
}