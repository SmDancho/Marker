export const useAvergeRaiting = <T extends number, J>(
  obj: { [key: string]: any } | J
): number => {
  const totalObj = obj as { [key: string]: any };
  const raiting: T = totalObj?.reduce(
    (acc: number, rating: { value: number }) => acc + rating.value,
    0
  );
  const length: T = totalObj?.length;
  const averge = raiting / length;
  return averge;
};
