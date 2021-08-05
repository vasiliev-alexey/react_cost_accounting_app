import { db } from './firebase';
import { TreeItem } from 'react-sortable-tree';

// export const getUserData = async (): Promise<unknown> => {
//   console.log('wrrrrrrrrrrrrrrrrrrrrr');
//
//   const snap = await db.collection('users');
//   return await snap.get();
// };
//
// export const setUserData = async (data: { a: string }) => {
//   console.log('wwwwwwwwwwwwwwwwwwww');
//
//   await db.collection('users').doc().set({
//     userName: 'Jamie',
//     blackLivesMatter: true,
//   });
//   console.log('eeeeeeeeeeeeeee');
// };

export const setUserCategory = async (
  userId: string,
  categoryTree: { categoryTree: TreeItem[] }
): Promise<void> => {
  console.log('wwwwwwwwwwwwwwwwwwww');

  await db.collection('category').doc(userId).set(categoryTree);
  console.log('eeeeeeeeeeeeeee');
};

export const getUserCategory = async (userId: string): Promise<TreeItem[]> => {
  const snap = await db.collection('category').doc(userId).get();
  // return await snap.data();

  console.log('snap', snap.data());

  if (!snap.data()) {
    return [];
  }

  return snap.data()['categoryTree'] as TreeItem[];
};
