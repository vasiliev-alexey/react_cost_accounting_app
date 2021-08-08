import { db } from './firebase';
import { TreeItem } from 'react-sortable-tree';
import { CATEGORY_COLLECTION, EXPENSE_COLLECTION } from './constants';
import { ExpenseType } from '../../types/domain';

export const setUserCategory = async (
  userId: string,
  categoryTree: { categoryTree: TreeItem[] }
): Promise<TreeItem[]> => {
  await db
    .collection(CATEGORY_COLLECTION)
    .doc(userId)
    .set(categoryTree, { merge: true });

  return categoryTree.categoryTree;
};

export const getUserCategory = async (userId: string): Promise<TreeItem[]> => {
  const snap = await db.collection(CATEGORY_COLLECTION).doc(userId).get();

  if (!snap.data()) {
    return [];
  }

  return snap.data()['categoryTree'] as TreeItem[];
};

export const setUserExpense = async (
  userId: string,
  expense: ExpenseType
): Promise<boolean> => {
  await db
    .collection(EXPENSE_COLLECTION)
    .doc(userId)
    .collection('expenses')
    .add(expense);

  return true;
};

export const getUserExpenseList = async (
  userId: string,
  beginDate: Date,
  endDate: Date
): Promise<ExpenseType[]> => {
  const doc = db
    .collection(EXPENSE_COLLECTION)
    .doc(userId)
    .collection('expenses');
  let query = doc.where('expenseDate', '>=', beginDate);
  query = query.where('expenseDate', '<=', endDate);
  const snapData = query.orderBy('expenseDate').get();

  const x = await snapData;

  console.log('getUserExpenseList:', endDate);

  const rez = x.docs.map((exp) => {
    return {
      ...exp.data(),
      expenseDate: exp.data().expenseDate.toDate(),
    } as ExpenseType;
  });

  return rez;
};
