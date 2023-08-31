const mongoose = require('mongoose');
// Load environment variables from .env file
require('dotenv').config();



//let Person;

/*const createAndSavePerson = (done) => {
  done(null /*, data);
};

const createManyPeople = (arrayOfPeople, done) => {
  done(null /*, data);
};

const findPeopleByName = (personName, done) => {
  done(null /*, data);
};

const findOneByFood = (food, done) => {
  done(null /*, data );
};

const findPersonById = (personId, done) => {
  done(null /*, data );
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data );
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data );
};

const removeById = (personId, done) => {
  done(null /*, data );
};
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data );
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data );
};*/

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

// Connect to the database using the secret from Replit Secrets
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

//.................................
//CRUD: CREATE MODEL
// Define the person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

// Create the Person model from the schema
const Person = mongoose.model('Person', personSchema);//I create the Person model using mongoose.model(), passing in the name 'Person' 

//we can then use the Person model to perform CRUD operations on our MongoDB database using Mongoose. For example, we can use methods like Person.create(), Person.find(), Person.findOne(), Person.updateOne(), and Person.deleteOne() to interact with the database based on the schema we've defined.

//...............................
//CREATE AND SAVE A RECORD OF A MODEL
const createAndSavePerson = (done) => {
  // Create a document instance using the Person model constructor
  const newPerson = new Person({
    name: 'John Doe', // Replace with the desired name
    age: 30,         // Replace with the desired age
    favoriteFoods: ['Pizza', 'Burger'] // Replace with the desired favorite foods
  });

  // Call the save() method on the document instance
  newPerson.save(function(err, savedPerson) {
    if (err) {
      done(err);
    } else {
      done(null, savedPerson);
    }
  });
};
//The save() method takes a callback function as its argument, following the Node.js convention.Inside the callback, we check for errors. If an error occurs during the save operation, we pass the error to the done callback. Otherwise, we pass the saved document (savedPerson) to the done callback to indicate success.
//....................................
//CREATE MANY RECORDS WITH MODEL.CREATE()
const createManyPeople = (arrayOfPeople, done) => {//arrayOfPeople This array contains objects representing people we want to create.

  // Use the Person model's create() method to insert multiple people
  Person.create(arrayOfPeople, function(err, createdPeople) {
    if (err) {
      done(err);
    } else {
      done(null, createdPeople);
    }
  });
};
//Now, you can call the createManyPeople function with an array of objects representing the people you want to create:
const arrayOfPeopleToCreate = [
  { name: 'A', age: 25, favoriteFoods: ['Sushi', 'Salad'] },
  { name: 'B', age: 32, favoriteFoods: ['Pizza', 'Burger'] }
];

createManyPeople(arrayOfPeopleToCreate, function(err, createdPeople) {
  if (err) {
    console.error('Error creating people:', err);
  } else {
    console.log('People created:', createdPeople);
  }
});
//.......................................
//USE model.find() TO SEARCH YOUR DATABASE
const findPeopleByName = (personName, done) => {
  // Use the Person model's find() method to search for people by name

  //The Person.find() method is used to search for documents in the collection that match the specified query. In this case, we're searching for documents where the name field matches personName.
  Person.find({ name: personName },
    function(err, foundPeople) {
      if (err) {
        done(err);
      } else {
        done(null, foundPeople);
      }
    });
};

const nameToSearch = 'A';

findPeopleByName(nameToSearch, function(err, foundPeople) {
  if (err) {
    console.error('Error finding people:', err);
  } else {
    console.log('People found:', foundPeople);
  }
});
//.......................................
//Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
  // Use the Person model's findOne() method to search for a person by favorite food
  Person.findOne({ favoriteFoods: food }, function(err, foundPerson) {
    if (err) {
      done(err);
    } else {
      done(null, foundPerson);
    }
  });
};

const foodToSearch = 'Pizza';

findOneByFood(foodToSearch, function(err, foundPerson) {
  if (err) {
    console.error('Error finding person:', err);
  } else {
    console.log('Person found:', foundPerson);
  }
});

//.......................................
//Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  // Use the Person model's findById() method to search for a person by _id

  //The Person.findById() method is used to search for a single document in the collection based on its _id field. The _id field in MongoDB is unique and automatically generated.
  Person.findById(personId, function(err, foundPerson) {
    if (err) {
      done(err);
    } else {
      done(null, foundPerson);
    }
  });
};

const idToSearch = '64ee751adfd9101f66779425'; // Replace with the actual _id value

findPersonById(idToSearch, function(err, foundPerson) {
  if (err) {
    console.error('Error finding person:', err);
  } else {
    console.log('Person found:', foundPerson);
  }
});

//.......................................
//Perform Classic Updates by Running Find, Edit, then Save
// ... (previous code)

const findEditThenSave = (personId, done) => {
  // Find a person by _id
  //Inside the callback of findById, we push "hamburger" to the favoriteFoods array of the found person.
  //Since the favoriteFoods array is not explicitly defined as [String] in the schema, we need to use markModified() to indicate that the array has been modified. This is important for Mongoose to properly track changes.

  Person.findById(personId, function(err, foundPerson) {
    if (err) {
      done(err);
    }
    else {
      // Add "hamburger" to the favoriteFoods array
      foundPerson.favoriteFoods.push("hamburger");

      // Mark the favoriteFoods array as edited
      foundPerson.markModified('favoriteFoods');

      // Save the updated person
      foundPerson.save(function(err, updatedPerson) {
        if (err) {
          done(err);
        } else {
          done(null, updatedPerson);
        }
      });
    }
  });
};

/*const idToEdit = '64efd9874ebc9b01ea3f9b05'; // Replace with the actual _id value

findEditThenSave(idToEdit, function(err, updatedPerson) {
  if (err) {
    console.error('Error updating person:', err);
  } else {
    console.log('Person updated:', updatedPerson);
  }
});*/
//............................................
//Perform New Updates on a Document Using model.findOneAndUpdate()


const findAndUpdate = (personName, done) => {
  // Find a person by name and update their age to 20
  Person.findOneAndUpdate(
    { name: personName },           // Search criteria
    { age: 20 },                    // Update values
    { new: true },                  // Options to return the updated document
    function(err, updatedPerson) {
      if (err) {
        done(err);
      } else {
        done(null, updatedPerson);
      }
    }
  );
};

const nameToUpdate = 'A';

findAndUpdate(nameToUpdate, function(err, updatedPerson) {
  if (err) {
    console.error('Error updating person:', err);
  } else {
    console.log('Person updated:', updatedPerson);
  }
});
//.......................................................
//Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
  // Delete one person by _id
  Person.findByIdAndRemove(personId, function(err, removedPerson) {
    if (err) {
      done(err);
    } else {
      done(null, removedPerson);
    }
  });
};

//...............................................
//Delete Many Documents with model.remove()
const removeManyPeople = (done) => {
  const nameToRemove = "Mary"; // Replace with the actual name(s) to remove

  // Delete all people whose name matches nameToRemove
  Person.remove({ name: nameToRemove }, function(err, result) {
    if (err) {
      done(err);
    } else {
      done(null, result);
    }
  });
};

//........................................................
//Chain Search Query Helpers to Narrow Search Results
const queryChain = (done) => {
  const foodToSearch = "burrito"; // Replace with the food you want to search for

  // Build up the query using chaining methods
  const query = Person.find({ favoriteFoods: foodToSearch })
    .sort('name')
    .limit(2)
    .select('-age')
    .exec(function(err, data) {
      if (err) {
        done(err);
      } else {
        done(null, data);
      }
    });
};
//You can modify the queryChain function to use query chaining to find people who like the food specified by the foodToSearch variable. You will then sort them by name, limit the results to two documents, and hide their age.
//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
