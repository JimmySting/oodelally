import { requireSession } from "@clerk/nextjs/api";
import { addRating } from "../../../../lib/user";

async function handler(req, res) {
  const userId = req.session.userId;
  const {
    method,
    query: { snackId },
  } = req;

  switch (method) {
    case "PUT":
      // Payload in format of:
      // {
      //   value: <1-5 value>
      //   updated: <Date.now()>
      // }
      await addRating(userId, snackId, req.body);
      res.status(200).end();
      break;
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default requireSession(handler);
