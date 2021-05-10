import React, { useEffect, useRef, useState } from 'react';
import logo from './Logo-Icon.svg';
import './App.css';
import { toJpeg } from 'html-to-image';
import {
  Redirect,
  Route,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';
import { Box } from './Box';
import { Ettiket } from './Ettiket';
import { EttiketLarge } from './EttiketLarge';
import { useHtmlToPng } from './useHtmlToPng';
import { BoxLarge } from './BoxLarge';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/box">
          <Box />
        </Route>
        <Route path="/etikett">
          <Ettiket />
        </Route>
        <Route path="/large">
          <EttiketLarge />
        </Route>
        <Route path="/boxlarge">
          <BoxLarge />
        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
  const [appRef, imageUrl, isLoading] = useHtmlToPng();

  if (!isLoading) {
    return (
      <Redirect
        push
        to={{
          pathname: '/box',
          state: { imageUrl: imageUrl },
        }}
      />
    );
  } else {
    return (
      <div ref={appRef} className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>HTML to PNG to 3D Texture</h1>
          <p>by @motcodes</p>
          <a
            className="App-link"
            href="https://github.com/motcodes/html-to-png"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github Repo
          </a>
        </header>
      </div>
    );
  }
}

export default App;
