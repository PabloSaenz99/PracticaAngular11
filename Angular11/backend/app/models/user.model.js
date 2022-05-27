module.exports = mongoose => {
    const User = mongoose.model(
      "user",
      mongoose.Schema(
        {
          email: String,
          name: String,
          tutorials: Array
        },
        { timestamps: true }
      )
    );
    return User;
  };