export const shallowClone = <T>(value: T): T | undefined => {
  if (typeof value !== "object") {
    return;
  }

  return { ...value };
};

export const shallowMerge = <TSource1, TSource2, TSource3, TSource4>(
  ...values: [TSource1?, TSource2?, TSource3?, TSource4?]
) => {
  return values.reduce((prev, current) => {
    if (!current) {
      return prev;
    }

    return {
      ...prev,
      ...current,
    };
  }, {}) as TSource1 & TSource2 & TSource3 & TSource4;
};
