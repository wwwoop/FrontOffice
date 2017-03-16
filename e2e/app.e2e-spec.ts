import { WwwoopPage } from './app.po';

describe('wwwoop App', function() {
  let page: WwwoopPage;

  beforeEach(() => {
    page = new WwwoopPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
