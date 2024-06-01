/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from "@angular/core/testing";
import { EventsService } from "./events.service";

describe("Service: Events", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsService],
    });
  });

  it("should ...", inject([EventsService], (service: EventsService) => {
    expect(service).toBeTruthy();
  }));
});
