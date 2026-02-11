export interface UserType {
  id: string;
  user_name: string;
  email: string;
  password: string;
  googleId: string;
  provider: string;
  plan: string;
  avatar_url: any;
  isActivated: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}
export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
