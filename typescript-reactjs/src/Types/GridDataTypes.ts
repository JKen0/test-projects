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