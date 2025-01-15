import { Component, h } from '@stencil/core';
import { Router } from '../../';
import { Route } from 'stencil-router-v2';
import { TextColor, TextSize, TextVariant } from '../../common/namespaces';
import { fetchApiData } from '../../common/api';
import state from '../../store';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: false,
})
export class AppRoot {

  async connectedCallback() {
    fetchApiData('prismic/about', (data) => { state.about = data });
    fetchApiData('prismic/personal', (data) => { state.personal = data });
    fetchApiData('maplestory', (data) => { state.msData = data });
    fetchApiData('music', (data) => { state.lastPlayedSong = data });
    fetchApiData('steam', (data) => { state.lastPlayedGames = data });
  }

  render() {
    if (!state.about) {
      return (
        <app-text color={TextColor.Main} variant={TextVariant.Accent} size={TextSize.Large}>
          Getting ready...
        </app-text>
      )
    }

    return (
      <main>
        <Router.Switch>
          <Route path="/">
            <app-home />
          </Route>
          <Route path="/unwind-zone">
            <unwind-zone />
          </Route>
          {/* <Route path="/case-study">
            <case-studies />
          </Route> */}
          {/* <Route
              path={match("/case-study/:id")}
              render={({ id }) => <app-case-study id={id} />}
            /> */}
        </Router.Switch>
      </main>
    );
  }
}
