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
    fetchApiData('metadata', (data) => { set('metadata', data) });
    fetchApiData('maplestory', (data) => { set('msData', data) });
    fetchApiData('books', (data) => { set('books', data) });
    fetchApiData('music', (data) => { set('lastPlayedSong', data) });
    fetchApiData('games', (data) => { set('lastPlayedGames', data) });
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
          <Route path="/mybase">
            <app-personal />
          </Route>
          <Route path={/.*/}>
            <div class="loading-screen">
              <app-text color={TextColor.Main} variant={TextVariant.Accent} size={TextSize.XXLarge}>
                ░▒▓█ 404: Light Not Found █▓▒░
              </app-text>
              <app-text color={TextColor.Main} variant={TextVariant.Body} size={TextSize.Large}>
                You’ve discovered a region of cyberspace with no webpage in sight. It might have drifted into a black hole, or never existed at all.
              </app-text>
              <a href="/">
                <app-button>
                  🛰️ Recalibrate to the Known Cosmos 🛰️
                </app-button>
              </a>
            </div>
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
