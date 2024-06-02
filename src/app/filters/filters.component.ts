import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { EventRecord } from "../types/event.model";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  @Input() selectedGroupingProperty?: string;
  @Output() propertyChanged = new EventEmitter<keyof EventRecord>();
  availableGroupingProperties: (keyof EventRecord)[] = ["platform", "version"];

  onChange(event: Event) {
    const selectedProperty = (event.target as HTMLInputElement)
      .value as keyof EventRecord;

    this.propertyChanged.emit(selectedProperty);
  }
}
