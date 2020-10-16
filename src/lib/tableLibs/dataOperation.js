import React from "react";
import JumpButton from "../../components/Contact/ContactList/components/PageWrapper/components/TableWrapper/components/EnhancedTable/components/JumpButton";
import getDate from "./getDate";

const LEAD_STATUS = {
  1: "New",
  2: "Open",
  3: "In progress",
  4: "Open deal",
  5: "Unqualified",
  6: "Attempted to contact",
  7: "Connected",
  8: "Bad timing",
};

const LEAD_STATUS_BACK = {
  "New": 1,
  "Open": 2,
  "In progress": 3,
  "Open deal": 4,
  "Unqualified": 5,
  "Attempted to contact": 6,
  "Connected": 7,
  "Bad timing": 8,
}

const addRowsFromCsv = (newData) => {
  // if (newData.length === 0) {
  //   return tableData;
  // }
  // let normalizedTable = normalizeData(tableData);
  // for (const item of newData) {
  //   normalizedTable.push(item);
  // }
  // tableData = wrapUpData(normalizedTable);
  // return tableData;
};

const editColumns = (newValue) => {
  // if (newValue && newValue.size !== 0) {
  //   let normalizedTable = normalizeData(tableData);
  //   const iterator = newValue.values();
  //   const dataToEdit = iterator.next().value;
  //   const index = iterator.next().value;
  //   const field = newValue.keys().next().value;
  //   for (const i of index) {
  //     let curRow = normalizedTable[i];
  //     Object.keys(curRow).forEach((key) => {
  //       if (key === field) {
  //         curRow[key] = dataToEdit;
  //       }
  //     });
  //   }
  //   tableData = wrapUpData(normalizedTable);
  // return tableData;
};

/* ====================================GET========================================== */
function wrapUpData(data) {
  return data.map((cur) => {
    return {
      name: <JumpButton id={cur.contactID} type={"contact"} name={cur.name} />,
      contactID: cur.contactID,
      companyID: cur.companyID,
      email: cur.email,
      phoneNumber: cur.phoneNumber,
      contactOwner: cur.contactOwner,
      associatedCompany: (
        <JumpButton
          id={cur.companyID}
          type={"company"}
          name={cur.associatedCompany}
        />
      ),
      lastActivityDate: cur.lastActivityDate,
      leadStatus: cur.leadStatus,
      createDate: cur.createDate,
    };
  });
}

const processData = (data) => {
  console.log("processData -> data", data)
  let newOwner;
  if (typeof data.contactOwner === "object") {
    newOwner = data.contactOwner.fullName;
  } else if (!data.contactOwner) {
    newOwner = "Unassigned";
  }
  return {
    name: data.fullName,
    contactID: data.id,
    companyID: data.company ? data.company.code : undefined,
    phoneNumber: data.phoneNo,
    email: data.email,
    contactOwner: newOwner ? newOwner : data.contactOwner,
    associatedCompany:
      typeof data.company === "object" ? data.company.name : data.company,
    lastActivityDate: LEAD_STATUS_BACK[data.lastActivityDate],
    leadStatus: data.leadStatus,
    createDate: data.createDate,
  };
};

const getTable = (data, tabID, userAccount) => {
  if (tabID === 1) {
    return wrapUpData(data);
  } else if (tabID === 2) {
    let mine = [];
    for (const item of data) {
      if (item.contactOwner === userAccount) {
        mine.push(item);
      }
    }
    return wrapUpData(mine);
  } else if (tabID === 3) {
    let unassigned = [];
    for (const item of data) {
      if (item.contactOwner === "Unassigned") {
        unassigned.push(item);
      }
    }
    return wrapUpData(unassigned);
  }
};

/* ====================================DELETE========================================== */
function remove(allData, selectedRow) {
  const names = [];
  for (const item of selectedRow) {
    names.push(item.name);
  }
  for (let i = 0; i < allData.length; ) {
    if (names.includes(allData[i].name)) {
      allData.splice(i, 1);
      continue;
    }
    i++;
  }
  return allData;
}

/* =====================================ADD============================================== */
function makeNewRow(newData) {
  newData.createDate = getDate();
  if (!newData.contactOwner) {
    newData.contactOwnerFirstName = "Unassigned";
    newData.contactOwnerLastName = undefined;
    delete newData.contactOwner;
  } else {
    let tempName = newData.contactOwner.split(" ");
    newData.contactOwnerFirstName = tempName[0];
    newData.contactOwnerLastName =
      tempName.length > 1 ? tempName[1] : undefined;
    delete newData.contactOwner;
  }
  if (newData.phoneNumber) {
    newData.phoneNo = newData.phoneNumber;
    delete newData.phoneNumber;
  }
  if (newData.associatedCompany) {
    newData.company = newData.associatedCompany;
    delete newData.associatedCompany;
  }
  if (newData.leadStatus) {
    newData.leadStatus = LEAD_STATUS[newData.leadStatus];
  }
  if (newData.company) {
    newData.companyName = newData.company;
    delete newData.company;
  }
  let tempName = newData.name.split(" ");
  newData.firstName = tempName[0];
  newData.lastName = tempName.length > 1 ? tempName[1] : undefined;
  delete newData.name;
  return newData;
}

export {
  addRowsFromCsv,
  editColumns,
  getTable,
  processData,
  remove,
  makeNewRow,
};
