import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    // Extract the user id from the request parameters
    const { id } = req.params;
    // Find the user in the database using the provided user id
    const user = await User.findById(id);
    // Send the user data as a response with status 200 (OK)
    res.status(200).json(user);
  } catch (err) {
    // If any error occurs while fetching the user, send a 404 (Not Found) response with an error message
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    // Extract the user id from the request parameters
    const { id } = req.params;
    // Find the user in the database using the provided user id
    const user = await User.findById(id);

    // Fetch friends' data using their ids from the user's friends list
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // Format the friends' data to send in the response, including only required fields
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    // Send the formatted friends' data as a response with status 200 (OK)
    res.status(200).json(formattedFriends);
  } catch (err) {
    // If any error occurs while fetching user's friends, send a 404 (Not Found) response with an error message
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    // Extract the user id and friend id from the request parameters
    const { id, friendId } = req.params;
    // Find the user in the database using the provided user id
    const user = await User.findById(id);
    // Find the friend in the database using the provided friend id
    const friend = await User.findById(friendId);

    // Check if the friend is already in the user's friends list
    if (user.friends.includes(friendId)) {
      // If the friend is in the list, remove them from both user and friend's friends list
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      // If the friend is not in the list, add them to both user and friend's friends list
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    // Save the updated user and friend data to the database
    await user.save();
    await friend.save();

    // Fetch friends' data using their ids from the updated user's friends list
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // Format the friends' data to send in the response, including only required fields
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    // Send the formatted friends' data as a response with status 200 (OK)
    res.status(200).json(formattedFriends);
  } catch (err) {
    // If any error occurs during the friend update process, send a 404 (Not Found) response with an error message
    res.status(404).json({ message: err.message });
  }
};





/*    
1. getUser: This function fetches the user's data from the database based on the provided user id (extracted from request parameters) and sends the user data as a response with status 200 (OK). If the user is not found, it sends a 404 (Not Found) response with an error message.

2. getUserFriends: This function fetches the user's friends' data from the database based on the provided user id (extracted from request parameters). It retrieves friends' data using their ids from the user's friends list, formats the data to include only required fields, and sends the formatted friends' data as a response with status 200 (OK). If the user or any of the friends are not found, it sends a 404 (Not Found) response with an error message.

3. addRemoveFriend: This function handles the addition and removal of friends for a user. It extracts the user id and friend id from the request parameters, finds the user and friend in the database using the provided ids, and checks if the friend is already in the user's friends list. Based on this, it either adds or removes the friend from both the user's and friend's friends lists. It then saves the updated user and friend data to the database. Finally, it fetches the updated friends' data for the user, formats it, and sends it as a response with status 200 (OK). If any error occurs during the friend update process, it sends a 404 (Not Found) response with an error message.

*/