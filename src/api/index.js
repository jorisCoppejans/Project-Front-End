import axios from 'axios';

const baseUrl = `http://localhost:9000/api`;

export async function getAll(url) {
  const {
    data,
  } = await axios.get(`${baseUrl}/${url}`);

  return data.items;
}

export const save = async (url, { arg: body }) => {
  const { id, ...values } = body;
  await axios({
    method: id ? 'PUT' : 'POST',
    url: `${baseUrl}/${url}/${id ?? ''}`,
    data: values,
  });
};

export const updateById = async (url, { arg: body }) => {
  const { id, ...values } = body;
  await axios.put(`${baseUrl}/${url}/${id}`, values);
};

export const deleteById = async (url, { arg: id }) => {
  await axios.delete(`${baseUrl}/${url}/${id}`);
};