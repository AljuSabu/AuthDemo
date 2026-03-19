import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxLength: [50, "Name should not exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true],
      minLength: [8, "Password should contain atleast 8 characters"],
      select: false,
    },
  },
  { timestamps: true },
);

//Encrypting password before saving
userSchema.pre("save", async function () {
  try {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    console.log("from schema", error);
  }
});

//Schema Methods
userSchema.methods = {
  comparePassword: async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  },
};

export default mongoose.model("User", userSchema);
