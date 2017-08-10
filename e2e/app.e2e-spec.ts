import { Ang2SpotifyPage } from './app.po';

describe('ang2-spotify App', () => {
  let page: Ang2SpotifyPage;

  beforeEach(() => {
    page = new Ang2SpotifyPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
