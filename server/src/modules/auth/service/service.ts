// GoogleUserService.ts
import bcrypt from 'bcrypt';
import { Service } from 'typedi';
import { userModel } from '../schema/model';

@Service()
export class UserService {
   serializeUser = async (profile: any, done: any): Promise<void> => {
    try {
      console.log("........",profile)
      const existingUser = await userModel.findOne({ email: profile.email });
      console.log("+++",existingUser)
      if (existingUser) {
        done(null, existingUser);
      } else {
        const randomPass = await this.generateRandomPassword();
        console.log("random pass",randomPass);
        let hashPassword = await bcrypt.hash(randomPass, 10).catch(err => console.log(err));
        const newuser = new userModel({
          userName: profile.displayName,
          email: profile.email,
          password: hashPassword
        });

        await newuser.save();
        done(null, newuser);
      }
    } catch (error) {
      done(error); // Handle error in serialization
    }
  };

  async deserializeUser(user: any, done: any): Promise<void> {
    done(null, user);
  }
  async generateRandomPassword() {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[{]};:<>|,./?';
    let password = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }
}
