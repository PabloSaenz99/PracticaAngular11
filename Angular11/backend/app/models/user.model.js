module.exports = mongoose => {
    const User = mongoose.model(
      "user",
      mongoose.Schema(
        {
          email: String,
          name: String,
          birthday: mongoose.Date,
          tutorials: [{type: mongoose.Types.ObjectId, ref: 'tutorial' }]
        },
        //{ timestamps: true }
      )
    );
    return User;
  };