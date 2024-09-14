const mongoose = require("mongoose");
const schema = mongoose.Schema;

const employeeSchema = new schema({
  name: String,
  email: String,
  photo: String,
  mobile: String,
  dob: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
