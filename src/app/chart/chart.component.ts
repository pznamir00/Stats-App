import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from "@angular/core";
import { EventRecord, EventRecordsByDistinctNames } from "../types/event.model";
import { ChartDataRow } from "./types/chart-data-row.model";
import { EventDistinctName } from "../types/event-distinct-name.enum";
import { ChartService } from "./services/chart.service";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChartService],
})
export class ChartComponent implements OnChanges {
  @Input() eventsByDistinctNames: EventRecordsByDistinctNames | null = null;
  @Input() groupingProperty: keyof EventRecord = "platform";
  data: ChartDataRow[] = [];
  labels = [
    EventDistinctName.START,
    EventDistinctName.INTERACTION,
    EventDistinctName.SHOP_CLICK,
  ];

  constructor(private _chartService: ChartService) {}

  ngOnChanges(): void {
    if (this.eventsByDistinctNames) {
      this.data = this._chartService.calculateDataFromEvents(
        this.eventsByDistinctNames,
        this.groupingProperty,
      );
    }
  }
}
