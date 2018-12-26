export enum TodoFilter {
  All = 0,
  ACTIVE,
  COMPLETED,
}

export const TODO_FILTER_TYPES = [
  TodoFilter.All,
  TodoFilter.ACTIVE,
  TodoFilter.COMPLETED,
];

export const TODO_FILTER_TITILES = {
  [TodoFilter.All]: 'All',
  [TodoFilter.ACTIVE]: 'Active',
  [TodoFilter.COMPLETED]: 'Completed',
};

export const TODO_FILTER_LOCATION_HASH = {
  [TodoFilter.All]: '#all',
  [TodoFilter.ACTIVE]: '#active',
  [TodoFilter.COMPLETED]: '#completed',
};
