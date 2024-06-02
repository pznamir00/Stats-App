import { fireEvent, render, screen } from "@testing-library/angular";
import { AppComponent } from "./app.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MockProvider } from "ng-mocks";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { NbCardModule } from "@nebular/theme";
import { FiltersComponent } from "./filters/filters.component";
import { ChartComponent } from "./chart/chart.component";

describe("AppComponent - Integration", () => {
  it("shows correct data in chart", async () => {
    await setup();
    const data = getDataFromChart();
    expect(data).toEqual([
      { data: [8, 1, 0], label: "android" },
      { data: [0, 0, 36], label: "ios" },
    ]);
  });

  it("updates data grouping by version on change property to version", async () => {
    await setup();
    const versionInput = screen.getByTestId("version-input");
    fireEvent.click(versionInput);
    const data = getDataFromChart();
    expect(data).toEqual([
      {
        data: [7, 0, 27],
        label: "1.0.0.swordupgradekillstickman.iec",
      },
      {
        data: [1, 1, 9],
        label: "1.0.0.swordupgradekillstickman.std",
      },
    ]);
  });
});

const setup = async (data = getData()) => {
  const fixture = await render(AppComponent, {
    providers: [
      //@ts-ignore
      MockProvider(HttpClient, {
        get: () => of(data),
      }),
    ],
    declarations: [FiltersComponent, ChartComponent],
    schemas: [NO_ERRORS_SCHEMA],
  });
  return { fixture };
};

const getDataFromChart = () => {
  const chart = screen.getByTestId("chart");
  return (chart as any).datasets;
};

const getData = () => [
  {
    name: "upgrade_to_shop",
    createdAt: "2023-10-19T00:00:00.000Z",
    platform: "ios",
    network: "mintegral",
    version: "1.0.0.swordupgradekillstickman.std",
    group: "baseline",
    timeSinceStart: 31,
    count: 58,
  },
  {
    name: "start",
    createdAt: "2024-01-14T00:00:00.000Z",
    platform: "android",
    network: "mintegral",
    version: "1.0.0.swordupgradekillstickman.iec",
    group: "baseline",
    timeSinceStart: 2,
    count: 7,
  },
  {
    name: "sword_upgrade_1",
    createdAt: "2023-10-19T00:00:00.000Z",
    platform: "ios",
    network: "mintegral",
    version: "1.0.0.swordupgradekillstickman.std",
    group: "baseline",
    timeSinceStart: 24,
    count: 2,
  },
  {
    name: "interaction",
    createdAt: "2023-10-30T00:00:00.000Z",
    platform: "android",
    network: "mintegral",
    version: "1.0.0.swordupgradekillstickman.std",
    group: "baseline",
    timeSinceStart: 6,
    count: 1,
  },
  {
    name: "shop_click",
    createdAt: "2023-10-19T00:00:00.000Z",
    platform: "ios",
    network: "mintegral",
    version: "1.0.0.swordupgradekillstickman.std",
    group: "baseline",
    timeSinceStart: 28,
    count: 9,
  },
  {
    name: "shop_click",
    createdAt: "2023-10-20T00:00:00.000Z",
    platform: "ios",
    network: "mintegral",
    version: "1.0.0.swordupgradekillstickman.iec",
    group: "baseline",
    timeSinceStart: 31,
    count: 27,
  },
  {
    name: "start",
    createdAt: "2024-01-11T00:00:00.000Z",
    platform: "android",
    network: "mintegral",
    version: "1.0.0.swordupgradekillstickman.std",
    group: "baseline",
    timeSinceStart: 12,
    count: 1,
  },
];
