import { Product } from "../modals/Product.js";
import { Category } from "../modals/Category.js";
import { User } from "../modals/User.js";

// =========================
// ADMIN DASHBOARD
// =========================
export const adminDashboard = async (req, res) => {

    try {

        // TOTAL PRODUCTS
        const totalProducts =
            await Product.countDocuments();

        // TOTAL CATEGORIES
        const totalCategories =
            await Category.countDocuments();

        // TOTAL USERS
        const totalUsers =
            await User.countDocuments({
                isAdmin: false,
            });

        // LOW STOCK PRODUCTS
        const lowStockProducts =
            await Product.countDocuments({
                countInStock: {
                    $lte: 5,
                },
            });

        // LATEST PRODUCTS
        const latestProducts =
            await Product.find()
                .populate("category", "name")
                .sort({ createdAt: -1 })
                .limit(5);

        // TOTAL STOCK VALUE
        const products =
            await Product.find();

        const totalStockValue =
            products.reduce((acc, item) => {
                return (
                    acc +
                    item.price * item.countInStock
                );
            }, 0);

        // RESPONSE
        return res.status(200).json({
            success: true,

            stats: {
                totalProducts,
                totalCategories,
                totalUsers,
                lowStockProducts,
                totalStockValue,
            },

            latestProducts,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Dashboard API Error",
            error: error.message,
        });

    }
};

// =========================
// UPDATE PROFILE
// =========================
export const UpdateProfile = async (
    req,
    res
) => {

    try {

        const { name, password } = req.body;

        // FIND USER
        const user =
            await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // UPDATE NAME
        if (name) {
            user.name = name;
        }

        // UPDATE PASSWORD
        if (password) {
            user.password = password;
        }

        // UPDATE IMAGE
        if (req.file) {

            user.imageUrl =
                `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }

        // SAVE USER
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user,
        });

    } catch (error) {

        console.log("error=====>", error);

        return res.status(500).json({
            success: false,
            message:
                "Server Error while updating profile",
            error: error.message,
        });

    }
};


// =========================
// GET USER DETAILS
// =========================
// =========================
// GET LOGGED IN USER
// =========================
export const getUser = async (
    req,
    res
) => {

    try {

        console.log("SECRET:", process.env.JWT_SECRET);
        console.log("TOKEN:", token);

        // =========================
        // GET USER FROM TOKEN
        // =========================
        const user =
            await User.findById(
                req.user._id
            ).select("-password");

        // =========================
        // USER NOT FOUND
        // =========================
        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found",

            });

        }

        // =========================
        // RESPONSE
        // =========================
        return res.status(200).json({

            success: true,

            message:
                "User fetched successfully",

            user,

        });

    } catch (error) {

        console.log(
            "GET USER ERROR =>",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Server error while fetching user",

            error: error.message,

        });

    }
};