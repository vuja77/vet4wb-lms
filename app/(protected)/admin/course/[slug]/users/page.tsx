"use client";
import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Card,
  CardBody,
  Image,
  Divider,
  user,
  Progress,
  CircularProgress,
} from "@nextui-org/react";
import { PlusIcon } from "@/app/components/icons/PlusIcon";
import { VerticalDotsIcon } from "@/app/components/icons/VerticalDotsIcon";
import { ChevronDownIcon } from "@/app/components/icons/ChevronDownIcon";
import { SearchIcon } from "@/app/components/icons/SearchIcon";
//@ts-ignore
import { columns, users, statusOptions } from "./data";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Checkbox,
  Link,
} from "@nextui-org/react";
import course from "@/lib/types";
import { Config } from "@/Config";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import AddUsers from "@/app/components/protected/add-users";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  disabled: "danger",
  pending: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "progress", "status", "actions"];

type User = (typeof users)[0];

export default function App({ params }: { params: any }) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);
  const [userss, setUsers] = React.useState([]);
  const [allusers, setAllUsers] = React.useState();
  const [course, setCourse] = React.useState<course>();

  async function getCourse() {
    await axios
      .get(Config.API_URL + "/course/" + params.slug, {
        headers: {
          Authorization:
            //@ts-ignore
            "Bearer " + getCookie("token"),
        },
      })
      .then((e) => {
        setCourse(e.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function changeStatus(id: number, status:string) {
    console.log(getCookie("token"));
    await axios
      .post(
        Config.API_URL + "/status/" + id,
        {
          status: status,
        },
        {
          headers: {
            Authorization:
              //@ts-ignore
              "Bearer " + getCookie("token"),
          },
        }
      )
      .then((e) => {
        router.refresh();
        getAllUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function deleteUsers(id: number) {
    console.log(getCookie("token"));
    await axios
      .post(
        Config.API_URL + "/delete-user/" + id,
        {
          user_id: id,
        },
        {
          headers: {
            Authorization:
              //@ts-ignore
              "Bearer " + getCookie("token"),
          },
        }
      )
      .then((e) => {
        router.refresh();
        getAllUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getAllUsers() {
    await axios
      .get(Config.API_URL + "/course-users/"+params.slug, {
        headers: {
          Authorization:
            //@ts-ignore
            "Bearer " + getCookie("token").value,
        },
      })
      .then((e) => {
        console.log(e.data);
        setUsers(e.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getAll() {
    await axios
      .get(Config.API_URL + "/all-users/", {
        headers: {
          Authorization:
            //@ts-ignore
            "Bearer " + getCookie("token").value,
        },
      })
      .then((e) => {
        console.log(e.data);
        setAllUsers(e.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getAllUsers();
   getAll()
    getCourse()
  }, []);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column: any) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...userss];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user: any) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    //@ts-ignore
    if (statusFilter === "" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user: any) =>
        Array.from(statusFilter).includes(user.status)
      );
    } else {
      // Konvertujemo statusFilter u array
      const selectedFilters = Array.from(statusFilter);
    
      filteredUsers = filteredUsers.filter((user: any) => {
        if (selectedFilters.includes("passed") && selectedFilters.includes("in_progress")) {
          // Ako su oba filtera selektovana, prikazujemo sve korisnike
          return true;
        } else if (selectedFilters.includes("passed")) {
          // Ako je selektovan "passed", prikazujemo korisnike sa progress 100
          return user.progress === 100;
        } else if (selectedFilters.includes("in_progress")) {
          // Ako je selektovan "in_progress", prikazujemo korisnike sa progress manjim od 100
          return user.progress < 100;
        } else {
          // Ako nijedan filter nije selektovan, ne filtriramo ništa (ili vraćamo sve korisnike)
          return true;
        }
      });
    }

    return filteredUsers;
  }, [userss, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src:
                user.photo && "https://moodle.edu4wb.com/storage/" + user.photo,
            }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
            <Dropdown>
              <DropdownTrigger>
                <Chip
                  className="capitalize cursor-pointer"
                  color={statusColorMap[user.status]}
                  size="sm"
                  variant="flat"

                >
                  {cellValue}
                </Chip>
              </DropdownTrigger>
              <DropdownMenu
               disallowEmptySelection
               closeOnSelect={false}
               selectedKeys={[user.status]}
               selectionMode="multiple"
              >
                <DropdownItem key={"active"} onAction={() => {changeStatus(user.id, "active")}}>Active</DropdownItem>
                <DropdownItem key={"pending"} onAction={() => {changeStatus(user.id, "pending")}}>Pending</DropdownItem>
                
                <DropdownItem onAction={() => {changeStatus(user.id, "disabled")}}>
                  Disable
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem onAction={() => deleteUsers(user.id)}>
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      case "progress":
        return (
            <CircularProgress
      aria-label="Loading..."
      size="lg"
      value={user.progress}
      color="primary"
      showValueLabel={true}
    />
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status: any) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column: any) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <AddUsers id={params.slug} data={allusers && allusers}></AddUsers> 
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {userss.length} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    userss.length,
    allusers,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-24 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <main className="pt-[100px] p-12 w-full  max-md:p-5 max-md:pt-[100px] min-w-[70%] self-center space-y-5">
      <Card>
        <CardBody className="flex flex-row gap-5">
          <Image
            src={"https://moodle.edu4wb.com/storage/" + course?.thumbnail}
            width={100}
          />
          <div>
            {/* @ts-ignore */}
            <small className="text-default-500" dangerouslySetInnerHTML={{__html: course?.teacher}}></small>
            <h4 className="font-bold text-medium line-clamp-2">
              {course?.name}
            </h4>
          </div>
        </CardBody>
      </Card>
      <div className="">
        <div className="space-y-1">
          <h4 className="text-3xl font-medium">Users</h4>
        </div>
        <Divider className="my-4" />
      </div>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column: any) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={sortedItems}>
          {(item: any) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </main>
  );
}
