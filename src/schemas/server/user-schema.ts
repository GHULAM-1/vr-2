import mongoose, { Schema } from "mongoose";
//types
type userT = {
  userInfo: userInfoT;
  businessInfo: businessInfoT;
  myProducts: myProductsT[];
};
type userInfoT = {
  userEmail: string;
};
type businessInfoT = {
  businessName: string;
};
type myProductsT = {
  productName: string;
  productDesc: string;
  productPrice: string;
  productUrl: string;
  isVR: boolean;
};

// schemas

const userInfoSchema = new Schema<userInfoT>({
  userEmail: String,
});
const businessInfoSchema = new Schema<businessInfoT>({
  businessName: String,
});

const myProductsSchema = new Schema<myProductsT>({
  productName: String,
  productDesc: String,
  productPrice: String,
  productUrl: String,
  isVR: Boolean,
});

const userSchema = new Schema<userT>({
  userInfo: userInfoSchema,
  businessInfo:businessInfoSchema , 
  myProducts: [myProductsSchema],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
