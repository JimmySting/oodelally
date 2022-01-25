import { ObjectId } from "mongodb";
import clientPromise from "./mongodb";

export async function getUser(userId) {
  const client = await clientPromise;
  const db = client.db();

  return await db.collection("users").findOne({ userId });
}

export async function getSnacksForUser(userId) {
  const client = await clientPromise;
  const db = client.db();

  const user = await getUser(userId);
  const objectIds = user.snackIds.map((snackId) => new ObjectId(snackId));
  return await db
    .collection("items")
    .find({ _id: { $in: objectIds } })
    .toArray();
}

export async function addSnacks(userId, snackIds) {
  const client = await clientPromise;
  const db = client.db();

  const filter = { userId };
  const options = { upsert: true };
  const update = { $addToSet: { snackIds: { $each: [...snackIds] } } };

  const result = await db
    .collection("users")
    .updateOne(filter, update, options);
}

export async function removeSnacks(userId, snackIds) {
  const client = await clientPromise;
  const db = client.db();

  const filter = { userId };
  const options = { upsert: true };
  const update = { $pull: { snackIds: { $in: [...snackIds] } } };

  const result = await db
    .collection("users")
    .updateOne(filter, update, options);
}

function _getAdjustedSnackRating(prevUserRating, newUserRating, snackRating) {
  const ratingDiff = newUserRating.value - prevUserRating.value;
  const currSnackRating = snackRating.value;
  const reviewCount = snackRating.reviewCount;
  return (reviewCount * currSnackRating + ratingDiff) / reviewCount;
}

function _getNewSnackRating(newUserRating, snackRating, newReviewCount) {
  return (
    (snackRating.value * snack.reviewCount + newUserRating.value) /
    newReviewCount
  );
}

export async function addRating(userId, snackId, rating) {
  const client = await clientPromise;
  const db = client.db();
  const users = db.collection("users");
  const items = db.collection("items");
  const userSnackRatingId = `ratings.${snackId}`;

  // Find if snack rating existed for user to use when
  // updating snack average value
  const prevUserRating = await users.findOne({ userId, 
    [userSnackRatingId]: { $exists: true },
  });

  const filter = { userId };
  const options = { upsert: true };
  const update = { $set: { [userSnackRatingId]: rating } };
  const result = await users.updateOne(filter, update, options);

  const snack = await items.findOne({ _id: new ObjectId(snackId) });

  let snackUpdate;
  if (prevUserRating) {
    // Re-adjust rating value but not incrementing review count
    const newSnackRating = _getAdjustedSnackRating(
      prevUserRating.ratings[snackId],
      rating,
      snack.rating
    );
    snackUpdate = { $set: { "rating.value": newSnackRating } };
  } else if (snack.rating) {
    // Snack has some ratings, but not from this user
    const newReviewCount = snack.rating.reviewCount + 1;
    const newSnackRating = _getNewSnackRating(
      rating,
      snack.rating,
      newReviewCount
    );
    snackUpdate = {
      $set: {
        rating: {
          value: newSnackRating,
          reviewCount: newReviewCount,
        },
      },
    };
  } else {
    // First rating for snack
    snackUpdate = {
      $set: {
        rating: {
          value: rating.value,
          reviewCount: 1,
        },
      },
    };
  }

  // Update snack entry
  await items.updateOne({ _id: new ObjectId(snackId) }, snackUpdate, options);
}
