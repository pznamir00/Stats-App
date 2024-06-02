import { TestBed, inject } from "@angular/core/testing";
import { EventsService } from "./events.service";
import { EventRecord } from "../types/event.model";

describe("EventsService", () => {
  describe("countEventsFromArray", () => {
    it("sums counts of events", () => {
      const { service } = setup();
      const result = service.countEventsFromArray([
        getEvent(),
        { ...getEvent(), count: 3 },
        { ...getEvent(), count: 7 },
      ]);
      expect(result).toEqual(12);
    });
  });

  describe("groupEventsByDistinctName", () => {
    it("returns grouped object with distinct names", () => {
      const { service } = setup();
      const interaction1 = { ...getEvent(), name: "interaction" };
      const interaction2 = { ...getEvent(), name: "interaction" };
      const shopClick1 = { ...getEvent(), name: "shop_click" };
      const result = service.groupEventsByDistinctName([
        getEvent(),
        interaction1,
        interaction2,
        getEvent(),
        shopClick1,
      ]);

      expect(result).toEqual({
        start: [getEvent(), getEvent()],
        interaction: [interaction1, interaction2],
        shop_click: [shopClick1],
      });
    });
  });
});

const setup = () => {
  TestBed.configureTestingModule({
    providers: [EventsService],
  });
  const service = TestBed.inject(EventsService);
  return { service };
};

const getEvent = (): EventRecord => ({
  count: 2,
  platform: "ios",
  version: "1.44",
  name: "start",
});
