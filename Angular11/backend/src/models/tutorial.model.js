module.exports = mongoose => {
  const Tutorial = mongoose.model(
    "tutorial",
    mongoose.Schema(
      {
        title: String,
        description: String,
        images: [],
        published: Boolean
      },
      //{ timestamps: true }
    )
  );
  return Tutorial;
};