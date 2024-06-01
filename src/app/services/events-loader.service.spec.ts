import { TestBed } from "@angular/core/testing";
import { EventsLoaderService } from "./events-loader.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";
import { MockProvider } from "ng-mocks";
import { of } from "rxjs";

describe("EventsLoaderService", () => {
  describe("loadEvents", () => {
    it("calls http.get", (done) => {
      const { service, get } = setup();
      service.loadEvents().subscribe(() => {
        expect(get).toHaveBeenCalledWith("assets/events-cds.json");
        done();
      });
    });

    it("returns data from http.get", (done) => {
      const { service, get } = setup();
      const mockedRecords = [
        { mockNumber: 1 },
        { mockNumber: 2 },
        { mockNumber: 3 },
      ];
      //@ts-ignore
      get.mockReturnValueOnce(of(mockedRecords));
      service.loadEvents().subscribe((data) => {
        expect(data).toEqual(mockedRecords);
        done();
      });
    });
  });
});

const setup = () => {
  const get = jest.fn(() => of([]));

  TestBed.configureTestingModule({
    //@ts-ignore
    providers: [EventsLoaderService, MockProvider(HttpClient, { get })],
  });

  const service = TestBed.inject(EventsLoaderService);
  return { service, get };
};
