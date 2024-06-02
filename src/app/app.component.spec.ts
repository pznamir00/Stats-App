import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { render } from "@testing-library/angular";
import { MockComponent, MockProvider } from "ng-mocks";
import { EventsLoaderService } from "./services/events-loader.service";
import { of } from "rxjs";
import { FiltersComponent } from "./filters/filters.component";
import { ChartComponent } from "./chart/chart.component";

describe("AppComponent", () => {
  it("loads events data on init", async () => {
    await setup();
    const eventsLoaderService = TestBed.inject(EventsLoaderService);
    expect(eventsLoaderService.loadEvents).toHaveBeenCalled();
  });
});

const setup = async () => {
  const fixture = await render(AppComponent, {
    providers: [
      MockProvider(EventsLoaderService, {
        loadEvents: jest.fn(() => of([])),
      }),
    ],
    declarations: [
      MockComponent(FiltersComponent),
      MockComponent(ChartComponent),
    ],
  });
  return { fixture };
};
