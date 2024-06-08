const SelectedBike = require('../model/selectedBike');
const Bike = require("../model/bike");
const User = require('../model/user');

module.exports = {
  submitSelectedBikes: async (req, res) => {
    const selectedBikes = req.body.selectedBikes;
    const username = req.body.username;

    const filteredSelectedBikes = selectedBikes.filter(bike => Object.keys(bike).length !== 0);

    const sanitizedSelectedBikes = filteredSelectedBikes.map(bike => {
      const { _id, ...sanitizedBike } = bike; 
      return sanitizedBike;
    });

    sanitizedSelectedBikes.forEach(newBike => {
      newBike.status = "Yet to start";
      newBike.progress = 0; 
      newBike.duration = 0; 
      newBike.created_at = Date.now();
      newBike.modified_at = Date.now();
    });

    try {
      const newDocument = new SelectedBike({
        username,
        productionCount: 0,
        selectedBikes: sanitizedSelectedBikes,
      });
      await newDocument.save();

      res.status(200).json({ message: 'Selected bikes submitted successfully' });
    } catch (error) {
      console.error("Error submitting selected bikes:", error);
      res.status(500).json({ error: 'Failed to submit selected bikes' });
    }
  },

  getSelectedBikes: async (req, res) => {
    const username = req.params.username;

    try {
      const selectedBikes = await SelectedBike.findOne({ username });

      if (!selectedBikes) {
        return res.status(404).json({ error: 'Selected bikes not found for this user' });
      }

      res.status(200).json(selectedBikes.selectedBikes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch selected bikes' });
    }
  },

  updateSelectedBike: async (req, res) => {
    const { username, bikeId } = req.params;
    const { status, startProgress, duration, bikeName } = req.body;

    try {
      const userBikes = await SelectedBike.findOne({ username });
      if (!userBikes) {
        return res.status(404).json({ error: 'Selected bikes not found for this user' });
      }

      const bikeToUpdate = userBikes.selectedBikes.find(bike => bike._id.toString() === bikeId);
      if (!bikeToUpdate) {
        return res.status(404).json({ error: 'Selected bike not found for this user' });
      }
      
      bikeToUpdate.status = status;
      bikeToUpdate.startProgress = Number(startProgress); 
      bikeToUpdate.duration = duration;
      bikeToUpdate.modified_at = new Date();
      bikeToUpdate.productionCount = 
      await userBikes.save();


      if (status === 'Completed') {
        const user = await User.findOne({ username });
        if (user) {
          user.productionCount = (user.productionCount || 0) + 1;
          await user.save();
        }
  
        userBikes.productionCount = (userBikes.productionCount || 0) + 1;
        await userBikes.save();
      }
  

      const currentDate = new Date();
      await Bike.findOneAndUpdate(
        { bikeName: bikeName },
        { $set: { status: "completed", modified_at: currentDate } }
      );

      res.status(200).json({ message: 'Selected bike updated successfully' });
    } catch (error) {
      console.error("Error updating selected bike:", error);
      res.status(500).json({ error: 'Failed to update selected bike' });
    }
  }
};
