module.exports = mongoose => {
    const User = mongoose.model(
      "user",
      mongoose.Schema(
        {
          email: String,
          name: String,
          tutorials: [{type: mongoose.Types.ObjectId, ref: 'tutorial' }]
        },
        //{ timestamps: true }
      )
    );
    return User;
  };