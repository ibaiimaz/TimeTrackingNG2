import { TimeTrackingNG2Page } from './app.po';

describe('time-tracking-ng2 App', function() {
  let page: TimeTrackingNG2Page;

  beforeEach(() => {
    page = new TimeTrackingNG2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
