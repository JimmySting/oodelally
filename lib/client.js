import axios from "axios";

export async function requestAddSnack(snackId) {
  const res = await axios.put(`/api/user/snacks/${snackId}`);
  if (res.status != 200) {
    console.error(
      `Error adding snack for user -- Code: ${res.status}, Text: ${res.statusText}`
    );
  }
}

export async function requestRemoveSnack(snackId) {
  const res = await axios.delete(`/api/user/snacks/${snackId}`);
  if (res.status != 200) {
    console.error(
      `Error removing snack for user -- Code: ${res.status}, Text: ${res.statusText}`
    );
  }
}

export async function requestAddRating(snackId, rating) {
  const res = await axios.put(
    `/api/user/snacks/rating?snackId=${snackId}`,
    rating
  );
  if (res.status != 200) {
    console.error(
      `Error adding snack rating for user -- Code: ${res.status}, Text: ${res.statusText}`
    );
  }
}
