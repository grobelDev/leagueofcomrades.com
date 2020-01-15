import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
// import GlobalStyle from "./GlobalStyle"
// import SwipeableTabs from "./SwipeableTabs"
import SummonerList from './SummonerList';
// import MusicDrawer from "./MusicDrawer"
// import PhotoGrid from "./PhotoGrid"
// import Notification from "./Notification"
import Header from './Header';

const routes = [
  { path: '/summoner-list', component: SummonerList, title: 'Summoner List' }
  // { path: "/music-drawer", component: MusicDrawer, title: "Music drawer" },
  // {
  //   path: "/swipeable-tabs",
  //   component: SwipeableTabs,
  //   title: "Swipeable Tabs"
  // },
  // { path: "/photo-grid", component: PhotoGrid, title: "Photo Grid" },
  // { path: "/notification", component: Notification, title: "Notification" }
];

function App() {
  const [emails, setEmails] = useState(null);
  const [data, setData] = useState(null);

  let url = 'https://server-nch7pipeyq-uc.a.run.app';
  let testUrl = 'http://localhost:8080';

  async function pingServer() {
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        setData(myJson);
      });
  }

  return (
    <div>
      <Router>
        <Switch>
          <Route
            path='/'
            exact
            render={() => {
              return (
                <div>
                  <Header />
                  <div className='mt-16'>
                    <SummonerList
                      data={!data ? pingServer() : data}
                    ></SummonerList>
                  </div>
                </div>
              );
            }}
          />
        </Switch>
      </Router>
    </div>
  );
}

// ARCHIVE:

// function App() {
//   return (
//     <div>
//       <Router>
//         <Switch>
//           <Route
//             path='/'
//             exact
//             render={() => {
//               return (
//                 <StyledNav>
//                   <h1>Touch-Driven Mobile UI</h1>
//                   <ul>
//                     {routes.map(r => (
//                       <li key={r.title}>
//                         <Link to={r.path}>{r.title}</Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </StyledNav>
//               );
//             }}
//           />
//           {routes.map(r => {
//             const Component = r.component;
//             return (
//               <div>
//                 <Route path={r.path} key={r.path}>
//                   <CustomHeader></CustomHeader>
//                   <div className='mt-16'>
//                     <Component exampleProp='17' />
//                   </div>
//                 </Route>
//               </div>
//             );
//           })}
//         </Switch>
//       </Router>
//     </div>
//   );
// }

// const StyledNav = styled.nav`
//   padding: 1.5rem;
//   li {
//     display: block;
//     margin-bottom: 1.5rem;
//     font-size: 1.1rem;
//   }
//   h1 {
//     font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
//       'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
//       'Helvetica Neue', sans-serif;
//     font-weight: bold;
//     margin-bottom: 1.5rem;
//     font-size: 1.5rem;
//   }
// `;

// const MessageWrapper = styled.div`
//   display: none;
//   padding-bottom: 1rem;
//   padding-left: 1rem;
//   padding-top: 1rem;
//   background: blue;
//   color: white;

//   @media (min-width: 768px) {
//     display: block;
//   }
// `;

// const MobileWarning = () => {
//   return <MessageWrapper>Currently only optimized for mobile!</MessageWrapper>;
// };

export default App;
