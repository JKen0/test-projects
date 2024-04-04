// Define the interface for grid data

export interface GridDataInterface {
  CourseCode: string;
  CourseName: string;
  Term: string;
  Grade: string;
  Units: number;
  Status: string;
  Description: string;
  Department: string;
  Career: string;
};

export type Order = 'asc' | 'desc';

export type GridLayoutTypes = "normal" | "term-grouping";

export interface DepartmentCount {
  department: string;
  count: number;
};

export interface CareerCount {
  career: string;
  count: number;
};

export type FilterOptionInterface = {
  careerOptions: CareerCount[];
  departmentOptions: DepartmentCount[];
};

export interface SelectedFilterInterface {
  gridLayoutFilter: GridLayoutTypes;
  careerFilter: string;
  departmentFilter: string[];
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof GridDataInterface;
  label: string;
  sortable: boolean;
}

export const headCells: readonly HeadCell[] = [
  {
    id: 'CourseCode',
    disablePadding: true,
    label: 'Course Code',
    sortable: true
  },
  {
    id: 'CourseName',
    disablePadding: false,
    label: 'Course Name',
    sortable: true
  },
  {
    id: 'Term',
    disablePadding: false,
    label: 'Term',
    sortable: true
  },
  {
    id: 'Grade',
    disablePadding: false,
    label: 'Grade',
    sortable: false
  },
  {
    id: 'Units',
    disablePadding: false,
    label: 'Units',
    sortable: false
  },
  {
    id: "Status",
    disablePadding: false,
    label: 'Status',
    sortable: false
  }
];