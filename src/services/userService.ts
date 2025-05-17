import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterParams) => {
  const findUser = await userModel.findOne({ email: email });
  if (findUser) {
    return { data: "user already exist" , statusCode: 400};
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    firstName,
    lastName,
    email,
    password:hashedPassword,
  });
  await newUser.save();
  return {data : generateJWT({firstName,lastName}), statusCode : 200};
};

interface LoginParams {
  email: string;
  password: string;
}
export const login = async ({ email, password }: LoginParams) => {
  const findUser = await userModel.findOne({ email: email });
  if (!findUser) {
  return {data : "inncorect email or password", statusCode : 400};
  }

  const passwordMatch =await bcrypt.compare(password, findUser.password);
  if(passwordMatch) {
  return {data : generateJWT({email,firstName: findUser.firstName, lastName: findUser.lastName}), statusCode : 200};
  }
  return {data : "inncorect email or password", statusCode : 400};
};


const generateJWT =(data : any) => {
  // JWT generation logic here
  return jwt.sign(data,'iGgyU7ux87VjLyTPFtNiFQAxrfOV0zIJ');
}