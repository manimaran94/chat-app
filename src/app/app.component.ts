import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public ELEMENT_DATA: Array<any> = [
    { name: 'User1', company: 'Company-A', bgColor:'#ff00ff'},
    { name: 'User2', company: 'Company-B', bgColor:'#ff0080' },
    { name: 'User3', company: 'Company-C', bgColor:'#8000ff' },
    { name: 'User4', company: 'Company-D', bgColor:'#bf00ff' },
    { name: 'User5', company: 'Company-E', bgColor:'#00ffbf' },
    { name: 'User6', company: 'Company-F', bgColor:'#80ff00' },
  ];
  public selection = new SelectionModel<any>(false);
  public selectedUser = new FormControl('');
  public messageText = new FormControl('');
  public messages = {};
  public displayedColumns: string[] = ['select', 'name', 'weight', 'chat'];
  public dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  ngOnInit() {

  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  public filterList() {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.data = this.dataSource.data.filter(
      (data) => data.name !== this.selectedUser.value
    )
  }
  public sendMessage() {
    if (this.messages[this.selectedUser.value + '-' + this.selection.selected[0].name]) {
      this.messages[this.selectedUser.value + '-' + this.selection.selected[0].name].push(
        {
          name: this.selectedUser.value,
          message: this.messageText.value
        }
      );
    } else if (this.messages[this.selection.selected[0].name + '-' + this.selectedUser.value]) {
      this.messages[this.selection.selected[0].name + '-' + this.selectedUser.value].push(
        {
          name: this.selectedUser.value,
          message: this.messageText.value
        });
    } else {
      this.messages[this.selectedUser.value + '-' + this.selection.selected[0].name] = [{
        name: this.selectedUser.value,
        message: this.messageText.value
      }];
    }
    this.messageText.setValue('');
  }
}
