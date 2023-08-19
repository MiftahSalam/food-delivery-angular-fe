import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Type } from 'src/app/core/model/type';
import { TypeService } from 'src/app/core/service/type.service';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent implements OnInit {
  types = [] as Type[]
  show = false
  currentType = {} as Type
  displayedColumns = ['name', 'price', 'update']
  dataSource = new MatTableDataSource<Type>
  filterInput = {} as HTMLInputElement
  @ViewChild(MatSort, { static: true }) typeSort = {} as MatSort
  public searchString = ""
  private successSub = new Subscription()

  constructor(
    private typeService: TypeService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private toastrService: ToastrService
  ) {
    iconRegistry.addSvgIcon('search', sanitizer.bypassSecurityTrustResourceUrl('assets/search.svg'))
  }

  ngOnInit(): void {
    this.successSub = this.typeService.updateSuccessEmitter.subscribe(data => {
      this.getTypes()
      this.toastrService.success("Successfully update a type", "Update type")
    })

    this.getTypes()

    this.successSub = this.typeService.addSuccessEmitter.subscribe(data => {
      this.getTypes()
      this.toastrService.success("Successfully added new type", "Add type")
    })
  }

  update(type: Type) {
    if (type) {
      this.show = true
      this.currentType = type
    }
  }

  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  giveFocus() {
    let filter = document.getElementById('filter')
    filter?.focus()
  }

  getTypes() {
    this.filterInput = document.getElementById('filterInput') as HTMLInputElement
    this.filterInput.value = ""
    this.typeService.getAllType().subscribe(data => {
      if (data !== null && data.length > 0) {
        this.types = data
        this.dataSource = new MatTableDataSource(this.types)
        this.dataSource.sort = this.typeSort
      } else {
        this.types = []
      }
    })
  }
}
