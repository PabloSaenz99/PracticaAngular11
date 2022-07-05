module.exports = mongoose => {
  const User = mongoose.model(
    "user",
    mongoose.Schema(
      {
        email: String,
        name: String,
        nickName: String,
        hash: String,
        salt: String,
        birthday: mongoose.Date,
        ageAtCreation: Number,
        tutorials: [{type: mongoose.Types.ObjectId, ref: 'tutorial' }]
      },
      //{ timestamps: true }
    )
  );
  return User;
};