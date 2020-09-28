import React, { Component } from "react";
// import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
// import { createMuiTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import SelectModal from "../SelectModal";
import tableIcons from "../../tableServices/getIcons";
import getColumns from "../../tableServices/getColumns";
import remove from "../../tableServices/removeSelected";
import exportCSV from "../../tableServices/exportCSV";
import exportPDF from "../../tableServices/exportPDF";
import updateRow from "../../tableServices/updateRow";

// 表格部分样式
const styles = (theme) => ({
  palette: {
    primary: {
      main: "#81C7D4",
    },
    secondary: {
      main: "#33A6B8",
    },
  },
});

class EnhancedTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      columns: getColumns(),
      selectedRow: null,
      // data: this.props.data,
    };
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (props.data !== state.data) {
  //     return {
  //       data: props.data,
  //     };
  //   }
  // }

  setData = (newData) => {
    // this.setState({ data: newData });
    // Pass new table to father component for database updating
    this.props.updateTable(newData);
  };

  removeRow = (evt, selectedRow) => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        let dataDelete = [...this.props.data];
        dataDelete = remove(dataDelete, selectedRow);
        this.setData([...dataDelete]);
        resolve();
      }, 500);
    });
  };

  showModal = (evt, selectedRow) => {
    this.setState({ visible: true });
  };

  changeVisible = (s) => {
    this.setState({ visible: s });
  };

  getDataAndIndex = (data) => {
    // Add the index of rows for editing
    if (data.size !== 0) {
      data.set("index", this.state.selectedRow);
    }
    this.props.getDataToEdit(data);
  };

  getSelectedRowIndex = (Rows) => {
    let index = [];
    for (const item of Rows) {
      index.push(item.tableData.id);
    }
    return index;
  };

  render() {
    console.log(this.props.data);
    return (
      <>
        {this.state.visible && (
          <SelectModal
            changeModalVisible={this.changeVisible}
            getDataToEdit={this.getDataAndIndex}
          ></SelectModal>
        )}
        <MaterialTable
          title={null}
          columns={this.state.columns}
          data={this.props.data}
          icons={tableIcons}
          onRowClick={(evt, selectedRow) => {}}
          onSelectionChange={(Rows) =>
            this.setState({ selectedRow: this.getSelectedRowIndex(Rows) })
          }
          actions={[
            {
              tooltip: "Remove all selected contact(s)",
              icon: tableIcons.Delete,
              onClick: this.removeRow,
            },
            {
              tooltip: "Edit contact(s)",
              icon: tableIcons.Edit,
              onClick: this.showModal,
            },
          ]}
          options={{
            selection: true,
            search: true,
            sorting: true,
            pageSize: 10,
            pageSizeOptions: [10, 30, 50],
            exportButton: true,
            exportCsv: exportCSV,
            exportPdf: exportPDF,
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                newData = updateRow(newData, true);
                setTimeout(() => {
                  this.setData([...this.props.data, newData]);
                  resolve();
                }, 500);
              }),
          }}
        />
      </>
    );
  }
}

export default withStyles(styles)(EnhancedTable);
