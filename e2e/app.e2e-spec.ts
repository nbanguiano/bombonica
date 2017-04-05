import { BombonicaPage } from './app.po';

describe('bombonica App', () => {
  let page: BombonicaPage;

  beforeEach(() => {
    page = new BombonicaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
