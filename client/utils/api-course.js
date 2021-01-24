const create = async (params, credentials, course) => {
  try {
    let res = await fetch(`/api/courses/by/${params.userId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: course
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
}

const list = async signal => {
  try {
    let res = await fetch('/api/courses', {
      method: 'GET',
      signal: signal
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
}

const read = async (params, signal) => {
  try {
    let res = await fetch(`/api/courses/${params.courseId}`, {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
}

const update = async (params, credentials, course) => {
  try {
    let res = await fetch(`/api/courses/${params.courseId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: course
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
}

const remove = async (params, credentials) => {
  try {
    let res = await fetch(`/api/courses/${params.courseId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
}

const listByInstructor = async (params, credentials, signal) => {
  try {
    let res = await fetch(`/api/courses/by/${params.userId}`, {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
}

const newLesson = async (params, credentials, lesson) => {
  try {
    let res = await fetch(`/api/courses/${params.courseId}/lesson/new`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({ lesson: lesson })
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
}

const listPublished = async signal => {
  try {
    let res = await fetch('/api/courses/published', {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
}

export {
  create,
  list,
  read,
  update,
  remove,
  listByInstructor,
  newLesson,
  listPublished
}