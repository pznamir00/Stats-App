import { ChartComponent } from "./chart.component";
import { render, screen } from "@testing-library/angular";
import { EventRecord } from "../types/event.model";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("ChartComponent", () => {
  it("shows chart", async () => {
    await setup();
    const chart = screen.queryByTestId("chart");
    expect(chart).toBeTruthy();
  });

  it("calculates default data", async () => {
    const { fixture } = await setup();
    expect(fixture.fixture.componentInstance.data).toEqual([
      { data: [2, 2, 0], label: "ios" },
    ]);
  });

  it("updates data when inputs change", async () => {
    const { fixture } = await setup();
    fixture.change({ groupingProperty: "version" });
    expect(fixture.fixture.componentInstance.data).toEqual([
      { data: [2, 2, 0], label: "1.44" },
    ]);
  });
});

const setup = async () => {
  const fixture = await render(ChartComponent, {
    componentProperties: {
      eventsByDistinctNames: {
        start: [getEvent()],
        interaction: [getEvent()],
        shop_click: [],
      },
      groupingProperty: "platform",
    },
    schemas: [NO_ERRORS_SCHEMA],
  });

  return { fixture };
};

const getEvent = (): EventRecord => ({
  count: 2,
  platform: "ios",
  version: "1.44",
  name: "start",
});
