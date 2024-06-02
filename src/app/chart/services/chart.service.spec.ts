import { TestBed } from "@angular/core/testing";
import { ChartService } from "./chart.service";
import { MockProvider } from "ng-mocks";
import { EventRecord } from "src/app/types/event.model";

describe("ChartService", () => {
  describe("calculateChartData", () => {
    it("returns valid rows data", () => {
      const { service } = setup();
      const result = service.calculateChartData(
        [
          { ...getEvent(), platform: "android" },
          getEvent(),
          getEvent(),
          { ...getEvent(), platform: "unknown" },
        ],
        "platform",
      );

      expect(result).toEqual([
        { label: "android", data: [2, 0, 0] },
        { label: "ios", data: [4, 0, 0] },
        { label: "unknown", data: [2, 0, 0] },
      ]);
    });
  });
});

const setup = () => {
  TestBed.configureTestingModule({
    providers: [ChartService],
  });
  const service = TestBed.inject(ChartService);
  return { service };
};

const getEvent = (): EventRecord => ({
  count: 2,
  platform: "ios",
  version: "1.44",
  name: "start",
});
