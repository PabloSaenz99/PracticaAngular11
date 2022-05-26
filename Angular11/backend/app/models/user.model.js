module.exports = mongoose => {
    const User = mongoose.model(
      "user",
      mongoose.Schema(
        {
          name: String,
          email: String,
          tutorials: Array
        },
        { timestamps: true }
      )
    );
    return user;
  };