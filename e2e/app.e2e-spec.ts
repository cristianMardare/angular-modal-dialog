import { TestModalDialogPage } from './app.po';

describe('test-modal-dialog App', () => {
  let page: TestModalDialogPage;

  beforeEach(() => {
    page = new TestModalDialogPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
