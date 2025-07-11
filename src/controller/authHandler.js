import { connectDB } from "@/lib/mongodb";
import { User } from '@/models/User'
import bcrypt from "bcryptjs" //argon2(hight secure app like banking), scrypt, bcrypt


//create new user
export const register = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        await connectDB();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPaswword = await bcrypt.hash(password, 12);
        const user = await User.create({ email, password: hashedPaswword });

        return res.status(201).json({ success: true, message: "User created", user });

    } catch (error) {
        return res.status({ error: error.message }, { status: 500 })
    }

}

export const login = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        await connectDB();

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid password" });

        return res.status(200).json({ success: true, message: "Login successful", user });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        await connectDB();

        const users = await User.find();

        return res.status(200).json({ success: true, users })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch users"
        })

    }

}


export const deleteUser = async (req, res, next) => {
    try {
        const id = req.query.id;

        console.log("id", id);


        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is required to delete user",
            });
        }
        await connectDB();
        const result = await User.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found or already deleted",
            });
        }

        return res.status(200).json({
            isDeleted: true,
            message: "User deleted successfully",
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: error.message,
        });
    }
}


export const updateUser = async (req, res) => {
    try {
        const id = req.query.id;
        const { email } = req.body;

        if (!email || !id) {
            return res.status(400).json({
                success: false,
                message: "Email and valid id are required",
            });
        }

        await connectDB();

        const user = await User.findOneAndUpdate({ _id: id }, { email }, {
            new: true,           // return updated document
            runValidators: true, // ensure schema validators are run
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            isUpdated: true,
            message: "User updated successfully",
            user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update user",
            error: error.message,
        });
    }
};

