import { Product } from "../modals/Product.js";

// ===============================
// CREATE PRODUCT
// ===============================
export const createProduct = async (req, res) => {
  try {
    // 1. Joi validation

    // 2. Check image
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Product image is required",
      });
    }

    // 3. Build image URL
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    // 4. Create product
    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      imageUrl,
    });

    // 5. Response
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    console.log("Create Product Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===============================
// GET ALL PRODUCTS
// ===============================
export const getAllProducts = async (req, res) => {
  try {

    // page and limit
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;

    // skip calculation
    const skip = (page - 1) * limit;

    // total products
    const totalProducts = await Product.countDocuments();

    // paginated products
    const products = await Product.find()
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      message: "Products retrieved successfully",

      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,

      products,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });

  }
};

// ===============================
// GET PRODUCT BY ID
// ===============================
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      product,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ===============================
// UPDATE PRODUCT
// ===============================
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.name = req.body.name ?? product.name;
    product.description = req.body.description ?? product.description;
    product.price = req.body.price ?? product.price;
    product.category = req.body.category ?? product.category;
    product.countInStock = req.body.countInStock ?? product.countInStock;

    // Optional image update
    if (req.file) {
      product.imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const updatedProduct = await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ===============================
// DELETE PRODUCT
// ===============================
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};