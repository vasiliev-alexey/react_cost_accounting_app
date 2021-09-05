export interface ExpenseType {
  expenseId?: string;
  categoryId: string;
  description: string;
  expenseDate: number;
  amount: number;
  categoryName?: string;
}
