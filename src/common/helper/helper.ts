export const getFirstOfMonth = (): string => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month.toString().padStart(2, '0')}-01`;
};

export const decodeToken = (token: string): any => {
  return JSON.parse(Buffer.from(token, 'base64').toString());
};


export const DB_CONNECTION_STRING = "mongodb+srv://mm5806272:pZfxDx1aA2x8WU5Z@nazimcluster.wpcpxf4.mongodb.net/"