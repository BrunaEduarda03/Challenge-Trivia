import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TimerProvider from './context/timerProvider';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Settings from './pages/Setting';

export default function App() {
  return (
    <TimerProvider>
      <div className="App w-[100vw] h-[100vh] lg:h-[100%]">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/settings" component={ Settings } />
          <Route path="/game" component={ Game } />
          <Route path="/feedback" component={ Feedback } />
          <Route path="/ranking" component={ Ranking } />
        </Switch>
      </div>
    </TimerProvider>
  );
}
