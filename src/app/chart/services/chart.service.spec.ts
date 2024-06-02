import { TestBed } from "@angular/core/testing";
import { ChartService } from "./chart.service";
import { MockProvider } from "ng-mocks";
import { EventsService } from "src/app/services/events.service";
import { EventRecord } from "src/app/types/event.model";

describe("ChartService", () => {
  describe("calculateDataFromEvents", () => {
    it("calls countEventsFromArray 3 times", () => {
      const { service } = setup();
      const eventsService = TestBed.inject(EventsService);
      service.calculateChartDataFromEvents(
        {
          //@ts-ignore
          start: [{}, {}],
          //@ts-ignore
          interaction: [{}, {}],
          //@ts-ignore
          shop_click: [{}],
        },
        "version",
      );

      expect(eventsService.countEventsFromArray).toHaveBeenCalledTimes(3);
    });

    it("returns valid rows data", () => {
      const { service } = setup();
      const result = service.calculateChartDataFromEvents(
        {
          start: [getEvent(), getEvent()],
          interaction: [getEvent()],
          shop_click: [{ ...getEvent(), platform: "android" }, getEvent()],
        },
        "platform",
      );

      expect(result).toEqual([
        { label: "ios", data: [15, 15, 15] },
        { label: "android", data: [15, 15, 15] },
      ]);
    });

    it("returns valid rows data if data is empty", () => {
      const { service } = setup();
      const result = service.calculateChartDataFromEvents(
        {
          start: [getEvent(), getEvent()],
          interaction: [],
          shop_click: [],
        },
        "platform",
      );

      expect(result).toEqual([{ label: "ios", data: [15, 15, 15] }]);
    });
  });
});

const setup = () => {
  TestBed.configureTestingModule({
    providers: [
      ChartService,
      MockProvider(EventsService, {
        countEventsFromArray: jest.fn().mockReturnValue(15),
      }),
    ],
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
