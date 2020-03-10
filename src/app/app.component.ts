import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { Component, ViewChild, OnInit } from "@angular/core";
import { IHero } from "../app.interface";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  displayedColumns = ["id", "name", "fullName", "placeOfBirth", "publisher"];
  dataSource = new MatTableDataSource<IHero>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.httpClient
      .get("http://localhost:3000/heroes")
      .subscribe((heros: IHero[]) => {
        this.dataSource.data = heros;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
