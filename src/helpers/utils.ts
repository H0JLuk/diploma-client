export const fromArrayToObj = <Key extends string, Item extends Record<Key, string | number>>(arr: Item[], key: Key) =>
  arr.reduce((acc, next) => {
    acc[next[key]] = next;
    return acc;
  }, {} as Record<Item[Key], Item>);
