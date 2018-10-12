/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getAllUsers : async function(req, res){
  	let response = await User.find();
  	res.json({ data:response, totalUsers: response.count });
  },

  addUser : async function(req, res){
  	let identicalUser = await User.find({ email : req.body.email });

  	if(identicalUser.length <= 0){
	  	let user = await User.create(req.body).meta({fetch:true})
	  	if(user !== undefined){
	  		return res.json({message: 'User Created Successfully'})	
	    } else {
	  		return res.json({message: 'Something went wrong!'})	
	    }	
  	} else {
  		return res.json({message: 'User already exists !!'})	
  	}
  },

  updateUser: async function(req, res){
  	let reqUser = await User.findOne({id: req.body.user_id });

  	delete req.body.user_id;
  	if(reqUser) {
  		let updatedUser = await User.update({id:reqUser.id}).set(req.body).meta({fetch:true});

  		if(updatedUser) {
			return res.json({message: 'User updated Successfully !!'})	
  		} else {
  			return res.json({message: 'Something went wrong !!'})		
  		}
  	} else {
  		return res.json({message: 'No User found !!'})	
  	}
  },

  getProfile: async function(req, res){
    let reqUser = await User.findOne({id : req.headers.user_id});

    if(reqUser){
      return res.json({ data: reqUser, message: 'profile data sent successfully'})
    } else {
      res.json({ message: 'Soemething went wrong!!' })
    }

  }

};
	
