const URL = 'http://localhost:8000';

interface Params {
  page?: number;
  pageSize?: number;
}

export const fetchInvoices = async (params?: Params) => {
  const page = params?.page || 1;
  const pageSize = params?.pageSize || 10;

  const response = await fetch(`${URL}/invoices?page=${page}&page_size=${pageSize}`);

  const data = await response.json();

  return data;
}

export const createInvoice = async (data: any) => {

  const response = await fetch(`${URL}/invoices`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}