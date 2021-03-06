export function fetchUserData(userName, userRegion) {
  let comradesPromise = fetchComrades(userName, userRegion);
  return {
    userName,
    userRegion,
    comrades: wrapPromise(comradesPromise)
  };
}

export function fetchUserDataV2(userName, userRegion) {
  let comradesPromise = fetchComrades(userName, userRegion);
  return {
    // userName,
    // userRegion,
    name: userName,
    region: userRegion,
    results: wrapPromise(comradesPromise)
  };
}

function wrapPromise(promise) {
  let status = 'pending';
  let result;
  let suspender = promise.then(
    r => {
      status = 'success';
      result = r;
    },
    e => {
      status = 'error';
      result = e;
    }
  );
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    }
  };
}

// function fetchComradesV2(userName, userRegion) {
//   let url = 'https://server-nch7pipeyq-uc.a.run.app';
//   let testUrl = 'http://localhost:8080';
//   let currentUrl = url;

//   let fetchUrl = new URL(currentUrl),
//     params = { name: userName, region: userRegion };
//   Object.keys(params).forEach(key =>
//     fetchUrl.searchParams.append(key, params[key])
//   );

//   // fixes weird characters
//   fetchUrl.href = encodeURI(fetchUrl);

//   return fetch(fetchUrl)
//     .then(response => {
//       if (!response.ok) {
//         throw Error(response.statusText);
//       }
//       return response.json();
//     })
//     .then(myJson => {
//       return myJson;
//     })
//     .catch(error => {
//       thro('Error:', error);
//     });
// }

function fetchComrades(userName, userRegion) {
  return new Promise(function(resolve, reject) {
    let url = 'https://leagueofcomrades-server-zxc6fpw5uq-uc.a.run.app';
    let testUrl = 'http://localhost:8080';

    // let currentUrl = url;
    let env = process.env.NODE_ENV || 'development';

    let currentUrl;

    env === 'development' ? (currentUrl = testUrl) : (currentUrl = url);

    let fetchUrl = new URL(currentUrl),
      params = { name: userName, region: userRegion };
    Object.keys(params).forEach(key =>
      fetchUrl.searchParams.append(key, params[key])
    );

    // fixes weird characters
    fetchUrl.href = encodeURI(fetchUrl);

    fetch(fetchUrl)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(myJson => {
        resolve(myJson);
      })
      .catch(error => {
        reject('Error:', error);
      });
  });
}

//
//
//
//
//
//

// export function fetchProfileData(userId) {
//   let userPromise = fetchUser(userId);
//   let postsPromise = fetchPosts(userId);
//   return {
//     userId,
//     user: wrapPromise(userPromise),
//     posts: wrapPromise(postsPromise)
//   };
// }

// // Suspense integrations like Relay implement
// // a contract like this to integrate with React.
// // Real implementations can be significantly more complex.
// // Don't copy-paste this into your project!

// export function fetchUser(userId) {
//   console.log('fetch user ' + userId + '...');
//   return new Promise(resolve => {
//     setTimeout(() => {
//       console.log('fetched user ' + userId);
//       switch (userId) {
//         case 0:
//           resolve({
//             name: 'Ringo Starr'
//           });
//           break;
//         case 1:
//           resolve({
//             name: 'George Harrison'
//           });
//           break;
//         case 2:
//           resolve({
//             name: 'John Lennon'
//           });
//           break;
//         case 3:
//           resolve({
//             name: 'Paul McCartney'
//           });
//           break;
//         default:
//           throw Error('Unknown user.');
//       }
//     }, 2000 * Math.random());
//   });
// }

// export function fetchPosts(userId) {
//   console.log('fetch posts for ' + userId + '...');
//   return new Promise(resolve => {
//     setTimeout(() => {
//       console.log('fetched posts for ' + userId);
//       switch (userId) {
//         case 0:
//           resolve([
//             {
//               id: 0,
//               text: 'I get by with a little help from my friends'
//             },
//             {
//               id: 1,
//               text: "I'd like to be under the sea in an octupus's garden"
//             },
//             {
//               id: 2,
//               text: 'You got that sand all over your feet'
//             }
//           ]);
//           break;
//         case 1:
//           resolve([
//             {
//               id: 0,
//               text: 'Turn off your mind, relax, and float downstream'
//             },
//             {
//               id: 1,
//               text: 'All things must pass'
//             },
//             {
//               id: 2,
//               text: "I look at the world and I notice it's turning"
//             }
//           ]);
//           break;
//         case 2:
//           resolve([
//             {
//               id: 0,
//               text: 'Living is easy with eyes closed'
//             },
//             {
//               id: 1,
//               text: "Nothing's gonna change my world"
//             },
//             {
//               id: 2,
//               text: 'I am the walrus'
//             }
//           ]);
//           break;
//         case 3:
//           resolve([
//             {
//               id: 0,
//               text: 'Woke up, fell out of bed'
//             },
//             {
//               id: 1,
//               text: 'Here, there, and everywhere'
//             },
//             {
//               id: 2,
//               text: 'Two of us sending postcards, writing letters'
//             }
//           ]);
//           break;
//         default:
//           throw Error('Unknown user.');
//       }
//     }, 2000 * Math.random());
//   });
// }

// function fetchData(name, region) {
//   if (!name || !region) {
//     return;
//   }
//   setNameWatcher(name);

//   if (dataStore[name]) {
//     console.log('getting stored data');
//     setLoading(false);
//     setData(dataStore[name].data);
//     console.log(dataStore);
//     return;
//   }

//   setLoading(true);
//   console.log('fetching data');
//   let url = 'https://server-nch7pipeyq-uc.a.run.app';
//   let testUrl = 'http://localhost:8080';
//   let currentUrl = url;

//   let fetchUrl = new URL(currentUrl),
//     params = { name: name, region: region };
//   Object.keys(params).forEach(key =>
//     fetchUrl.searchParams.append(key, params[key])
//   );

//   // fixes weird characters
//   fetchUrl.href = encodeURI(fetchUrl);

//   fetch(fetchUrl)
//     .then(response => {
//       return response.json();
//     })
//     .then(myJson => {
//       setLoading(false);

//       if (!dataStore[name]) {
//         setDataStore(dataStore => {
//           let newDataStore = { ...dataStore };
//           newDataStore[name] = {
//             name: name,
//             region: region,
//             data: myJson
//           };
//           return newDataStore;
//         });
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// }
