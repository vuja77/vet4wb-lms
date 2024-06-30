import React from "react";
const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "NAME", uid: "name", sortable: true},
  {name: "PROGRESS", uid: "progress", sortable: true},
  {name: "ROLE", uid: "role_id", sortable: true},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "EMAIL", uid: "email"},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "In progress", uid: "in_progress"},
  {name: "Passed", uid:"passed"},
];



export {columns, statusOptions};