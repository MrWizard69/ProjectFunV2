import { ProjectFunV2Page } from './app.po';

describe('project-fun-v2 App', () => {
  let page: ProjectFunV2Page;

  beforeEach(() => {
    page = new ProjectFunV2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
