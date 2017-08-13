import { DemoUiPage } from './app.po';

describe('demo-ui App', function() {
  let page: DemoUiPage;

  beforeEach(() => {
    page = new DemoUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
