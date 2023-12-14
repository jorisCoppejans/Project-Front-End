import axiosRootRoot from 'axios';

const baseUrl = import.meta.env.VITE_API_URL;

export async function getAll(url) {
  const {
    data,
  } = await axiosRoot.get(`${baseUrl}/${url}`);

  return data.items;
}

export async function getById(url) {
  const {
    data,
  } = await axiosRoot.get(`${baseUrl}/${url}`);

  return data;
}

export const save = async (url, { arg: body }) => {
  const { id, ...values } = body;
  await axiosRoot({
    method: id ? 'PUT' : 'POST',
    url: `${baseUrl}/${url}/${id ?? ''}`,
    data: values,
  });
};

export const post = async (url, { arg }) => {
  const {
    data,
  } = await axiosRoot.post(url, arg);

  return data;
};

export const axiosRoot = axiosRootRoot.create({
  baseURL: baseUrl,
});

export const setAuthToken = (token) => {
  if (token) {
    axiosRoot.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosRoot.defaults.headers['Authorization'];
  }
};



export const deleteById = async (url, { arg: id }) => {
  await axiosRoot.delete(`${baseUrl}/${url}/${id}`);
};