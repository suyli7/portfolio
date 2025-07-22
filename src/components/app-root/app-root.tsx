import { Component, h } from '@stencil/core';
import { Router } from '../../';
import { Route } from 'stencil-router-v2';
import { TextColor, TextSize, TextVariant } from '../../common/namespaces';
import { fetchApiData } from '../../common/api';
import { state, set } from '../../store';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: false,
})
export class AppRoot {

  async connectedCallback() {
    fetchApiData('prismic/about', (data) => { set('about', data) });
    fetchApiData('prismic/personal', (data) => { set('personal', data) });
    fetchApiData('prismic/favimgs', (data) => { set('favImgs', data) });
    fetchApiData('maplestory', (data) => { set('msData', data) });
    fetchApiData('books', (data) => { set('books', data) });
    fetchApiData('music', (data) => { set('lastPlayedSong', data) });
    fetchApiData('steam', (data) => { set('lastPlayedGames', data) });
  }

  render() {
    if (!state.about || !state.personal || !state.favImgs) {
      return (
        <main>
          <div class="loading-screen">
            <app-text color={TextColor.Main} variant={TextVariant.Accent} size={TextSize.Large}>
              Getting ready...
            </app-text>
          </div>
        </main>
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
