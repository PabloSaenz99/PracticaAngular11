module.exports = mongoose => {
  const Tutorial = mongoose.model(
    "tutorial",
    mongoose.Schema(
      {
        creatorUserID: {type: mongoose.Types.ObjectId, ref: 'user'},
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