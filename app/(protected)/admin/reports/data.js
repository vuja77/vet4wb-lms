import React from "react";
const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "NAME", uid: "user", sortable: true},
  {name: "Message", uid: "message", sortable: true},
  // {name: "STATUS", uid: "status", sortable: true},
  // {name: "EMAIL", uid: "email"},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Pending", uid: "pending"},
  {name: "Disabled", uid: "disabled"},
];



export {columns, statusOptions};