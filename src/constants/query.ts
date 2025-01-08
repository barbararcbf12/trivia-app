import type { QueryProps } from "../types/queryOptions";

export const AMOUNT_OPTIONS = [
  { value: '10', name: '10' },
  { value: '20', name: '20' },
  { value: '50', name: '50' },
];

export const DIFFICULTY_OPTIONS = [
  { value: 'easy', name: 'easy' },
  { value: 'medium', name: 'medium' },
  { value: 'hard', name: 'hard' },
];

export const TYPE_OPTIONS = [
  { value: 'multiple', name: 'multiple' },
  { value: 'boolean', name: 'boolean' },
];

export const INITIAL_QUERY_VALUE: QueryProps = { amount: '10', category: '17', type: '', difficulty: '' };