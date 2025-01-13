export const fetchApiData = async (endopint: string, cb?: (data: any) => void) => {
  fetch(`/api/${endopint}`)
    .then((res) => res.json())
    .then((data) => {
      cb?.(data);
    });
}