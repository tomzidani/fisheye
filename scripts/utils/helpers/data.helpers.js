export const getData = async (url) => {
  const data = await fetch(`${url}`)
    .then((res) => res.json())
    .then((data) => data)

  return data
}
