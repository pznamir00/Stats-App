import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { ChartComponent } from "./chart/chart.component";
import { NgChartsModule } from "ng2-charts";

@NgModule({
  declarations: [AppComponent, ChartComponent],
  imports: [BrowserModule, HttpClientModule, NgChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
