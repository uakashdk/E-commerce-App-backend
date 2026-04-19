import Bcrypt from "bcrypt";

export const hashPassword = async (password) => {   
    const salt = await Bcrypt.genSalt(10);
    return await Bcrypt.hash(password, salt);
}

export const comparePassword = async (password, hashedPassword) => {
    return await Bcrypt.compare(password, hashedPassword);
}