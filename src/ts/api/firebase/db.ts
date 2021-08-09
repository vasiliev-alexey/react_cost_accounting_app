import { db } from './firebase';
import { TreeItem } from 'react-sortable-tree';
import { CATEGORY_COLLECTION, EXPENSE_COLLECTION } from './constants';
import { ExpenseType } from '../../types/domain';
import { Converter } from '../../ui/utils/converter';
import { nanoid } from 'nanoid';

function filCatList(
  topCat: string,
  items: TreeItem[],
  catPam: Map<string, string>
): void {
  items.forEach((c) => {
    catPam.set(c.id, topCat);

    if (c.children.length > 0) {
      filCatList(topCat, c.children as TreeItem[], catPam);
    }
  });
}

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
    .add({ ...expense, expenseId: nanoid(12) });

  return true;
};

export const getUserExpenseList = async (
  userId: string,
  beginDate: Date,
  endDate: Date
): Promise<ExpenseType[]> => {
  const categories = await getUserCategory(userId);

  const catMap = new Map<string, string>();

  categories.map((cat) => {
    const topCat = cat.title.toLocaleString();
    catMap.set(cat.id, topCat);

    if (cat.children.length > 0) {
      filCatList(topCat, cat.children as TreeItem[], catMap);
    }
  });

  const doc = db
    .collection(EXPENSE_COLLECTION)
    .doc(userId)
    .collection('expenses');

  let query = doc.where(
    'expenseDate',
    '>=',
    beginDate.setHours(0, 0, 0, 0) / 1000
  );
  query = query.where('expenseDate', '<=', Converter.date2Unix(endDate));
  const snapData = query.orderBy('expenseDate').get();

  try {
    const x = await snapData;

    const rez = x.docs.map((exp) => {
      return {
        ...exp.data(),
        categoryName: catMap.get(exp.data().categoryId),
      } as ExpenseType;
    });
    console.log('rez:', rez);
    return rez;
  } catch (e: unknown) {
    console.log('e :', e);
  }
};
