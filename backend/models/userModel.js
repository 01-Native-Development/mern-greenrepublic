import {model, Schema} from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema =  new Schema({
   username: {type: String, require: true, unique: false},
   email: {type: String, require: true, unique: true},
   password: {type: String, require: true},
   role: {
      type: String, default: 'user'
   },
   profileImage: {
      type: String,
      default: 'https://res.cloudinary.com/mdbdrrhm/image/upload/v1635086610/people/default-user_dmmlom.png'
   },
   bio: {type: String, maxlength: 200},
   profession: String,
   createdAt: {
      type: Date,
      default: Date.now
   }
});

/************************* hashing passwords *************************/
userSchema.pre('save', async function(next){
   const user =  this;
   if(!user.isModified('password')) return next();
   user.password = await bcrypt.hash(user.password, 10);
   next();
});

/************************* comparing passwords *************************/
userSchema.methods.comparePassword = function (candidatePassword) {
   return bcrypt.compare(candidatePassword, this.password);
};

const User = new model('User', userSchema);
export default User;