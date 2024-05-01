import { Request, Response } from 'express'
import {User,userValidate} from '../models/user.model'
import bcrypt from 'bcryptjs'
import { IUser } from '../types'

export const userApiInfo = (req: Request,res: Response)=> {
    res.json({
        'User Routes': {
            'Find User': {
              'url':'/user/:user-id',
              'method': 'GET'
            },
            'Get User List': {
              'url':'/user/list',
              'method': 'GET'
            },
            'Create User': {
              'url':'/user/create',
              'method': 'POST'
            },
            'Update User': {
              'url':'/user/update',
              'method': 'PUT'
            },
            'Delete User': {
              'url':'/user/delete',
              'method': 'DELETE'
            }
        }
      });
}
export const findUser = async (req:Request,res:Response) => {
  const user:IUser|null = await User.findById(req.params.id);

  if(!user){
    return res.status(404).json({code:404,message:'User Not Found'});
  }

  try {
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({code:500,message: 'Internal server error'});
  }
}
export const userList = async (req: Request, res: Response) => {
 
  try {
    const users = await User.find();
    res.status(200).json(users)
  } catch (error: any) {
    const err:string = error.message || "Server Internal error";
    res.status(500).json({'message': err});
  }

}
export const createUser = async (req: Request, res: Response) => {
    let user: IUser = req.body;

    const { error } = userValidate(user);

    if (error) {
      return res.status(400).json({ code: 400, message: error.details[0].message });
    }

  const existingEmail = await User.findOne({email: req.body.email});
  if(existingEmail){
    return res.status(400).json({ code:400, message: 'This email is already in use.' });
  }


    bcrypt.genSalt(10, async (err, salt) => {
      if (err) {
        console.error('Salt generation error:', err);
      }

      bcrypt.hash(user.password, salt, async (err, hash) => {
        if (err) {
          console.error('Hashing error:', err);
        }

        user.password = hash;
        const newUser = new User(user);

        try {
          await newUser.save();
          return res.status(201).json({code: 201,newUser:newUser});
        } catch (error) {
          console.error('User save error:', error);
          return res.status(500).json({ code: 500, message: 'Internal server error' });
        }
      });
    });
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    let user: IUser | null = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ code: 404, message: 'User not found' });
    }

    const { error } = userValidate(req.body);
    if (error) {
      return res.status(400).json({ code: 400, message: error.details[0].message });
    }

    bcrypt.genSalt(10, async (err, salt) => {
      if (err) {
        console.error('Salt generation error:', err);
        return res.status(500).json({ code: 500, message: 'Internal server error' });
      }

      bcrypt.hash(req.body.password, salt, async (err, hash) => {
        if (err) {
          console.error('Hashing error:', err);
          return res.status(500).json({ code: 500, message: 'Internal server error' });
        }

        req.body.password = hash;

        try {
          user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
          if (!user) {
            return res.status(404).json({ code: 404, message: 'User not found' });
          }
          return res.status(200).json({ code: 200, message: 'User updated successfully', updatedUser: user });
        } catch (error) {
          console.error('User update error:', error);
          return res.status(500).json({ code: 500, message: 'Internal server error' });
        }
      });
    });
  } catch (error) {
    console.error('Update user error:', error);
    return res.status(500).json({ code: 500, message: 'Internal server error' });
  }
};
export const deleteUser = async (req: Request, res: Response) => {

  try {
    const deleteUser:any = await User.deleteOne({_id: req.params.id});

  if(!deleteUser){
    return res.status(404).json({ code: 404, message: 'User not found' });
  }
  if(deleteUser.deletedCount === 1){
    return res.status(200).json({code: 200,message: 'User Deleted!',deleteUser: deleteUser});
  }

  } catch (error) {
    console.error('Delete user error:', error);
    return res.status(500).json({ code: 500, message: 'Internal server error' });
   
  }



}