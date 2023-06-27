export const getKeyValueFromBuckets = buckets => {
  if (!buckets) return [];

  return buckets?.map(buck => {
    return { key: buck?.key, value: buck?.doc_count };
  });
};

export const getKeyValueSumFromBuckets = (buckets, eflBuckets?: boolean) => {
  if (!buckets?.length) return [];

  if (eflBuckets) {
    return buckets.map(buck => {
      return { key: buck?.key, value: buck?.eflActuals?.value };
    });
  }

  return buckets.map(buck => {
    return { key: buck?.key, value: buck?.doc_count };
  });
};
