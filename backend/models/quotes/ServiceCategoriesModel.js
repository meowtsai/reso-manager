import mongoose from "mongoose";

const ServiceCategorySchema = new mongoose.Schema({
  key: { type: Number, unique: true, index: true },
  cht: String,
  eng: String,
});

const ServiceCategory = mongoose.model(
  "ServiceCategory",
  ServiceCategorySchema
);

export default ServiceCategory;
